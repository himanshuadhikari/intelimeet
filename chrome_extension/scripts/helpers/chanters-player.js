Chanters("chanters-player", {
    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    "title": "title",
    "duration": "duration",
    "fileSize": "file size",
    onReady: function() {
        if (localStorage.currentSong) {
            var song = JSON.parse(localStorage.currentSong);
            this.$.wall.style.display = "block";
            this.src = song.imageUrl;
            this.title = song.title.replace(/%20/g, " ");
            this.duration = song.duration;
            this.fileSize = song.fileSize;
            this.$.audioPlayer.visibility = "visible"
        } else {


            this.showNotification("Welcome to Chanters...", "showWelcomeMessage");
            this.audioPlayer = this.$.audioPlayer.$.audio;
            this.seek = this.$.audioPlayer.$.seek;

            this.player = new ChantersPlayer({
                audio: this.$.audioPlayer,
                canvas: this.$.analyser,
                seek: this.seek
            });
        }
    },
    imageList: [],
    imageList_: function(files) {
        this.createList(files);
    },
    createList: function createList(files) {
        if (localStorage.currentSong) {
            return;
        }

        var that = this;
        var count = 0;


        (function nextIteration(file) {
            var extension = file.name.split(".").pop();
            if (extension.toLowerCase() !== "mp3") {

                if (count < files.length - 1) {
                    count++;
                    nextIteration(files[count]);
                }
            } else
                jsmediatags.read(file, {
                    onSuccess: function(tag) {
                        var li = Chanters.createElement("li");
                        var dataUrl;
                        var div = Chanters.createElement("div");
                        var img = Chanters.createElement("img");
                        if (tag.tags.picture) {
                            var image = tag.tags.picture;

                            var base64String = "";
                            for (var i = 0; i < image.data.length; i++) {
                                base64String += String.fromCharCode(image.data[i]);
                            }
                            dataUrl = "data:" + image.format + ";base64," + window.btoa(base64String);
                            img.src = dataUrl;
                        } else {
                            img.src = "/images/music-icon.png";
                        }
                        div.appendChild(img);
                        li.appendChild(div);
                        file.album = tag.tags.album;
                        file.artist = tag.tags.artist;
                        file.year = tag.tags.year;



                        var songDuration = Chanters.createElement("span");
                        that.player.getAudioDuration(file, function(time) {
                            file.duration = time;
                            songDuration.innerHTML = time;
                            li.appendChild(songDuration);
                            songDuration.classList.add("time");


                            var songName = Chanters.createElement("a");
                            songName.innerHTML = file.title = tag.tags.title || file.name;
                            file.imageUrl = img.src;

                            songName.onclick = function() {
                                that.play(file);
                            }

                            var artist = Chanters.createElement("span");
                            artist.innerHTML = tag.tags.artist || "N/A";
                            artist.classList.add("artist");

                            li.appendChild(songName);
                            li.appendChild(artist);

                            that.$.songList.appendChild(li);

                            if (count < files.length - 1) {
                                count++;
                                nextIteration(files[count]);
                            }
                        });
                    },
                    onError: function(error) {
                        count++;
                        nextIteration(files[count]);
                        console.log(error, file);
                    }
                });


        })(files[count]);
        that.$.songList.style.display = "block";
    },
    play: function(file) {
        var _URL = window.URL || window.webkitURL;


        this.audioPlayer.src = _URL.createObjectURL(file);
        this.audioPlayer.load();
        this.audioPlayer.play();
        this.audioPlayer.volume = 0.7;
        this.$.audioPlayer.totaltime = file.duration;

        this.seek.max = this.audioPlayer.duration;

        this.saveTabInformation(file);
        this.player.visualizer();
        this.$.audioPlayer.poster = file.imageUrl === location.origin + "/images/music-icon.png" ? "/images/bg-default.jpg" : file.imageUrl;
        this.$.audioPlayer.title = file.title;

        this.$.audioPlayer.album = file.album;
        this.$.audioPlayer.artist = file.artist;
        this.$.audioPlayer.year = file.year;

        this.showNotification("Now Playing, " + file.title, "showNotification", file.imageUrl);
        this.$.audioPlayer.setTheme();
        this.$.audioPlayer.visibility = "visible";
    },
    saveTabInformation: function(file) {
        var currentSong = {
            title: file.name,
            duration: file.duration,
            size: file.size,
            imageUrl: file.imageUrl
        }

        localStorage.currentSong = JSON.stringify(currentSong);
    },
    showNotification: function(message, whichNotification, imgSrc) {
        this.$.notification[whichNotification](message, imgSrc);
        this.$.notification.show();
    }
});
