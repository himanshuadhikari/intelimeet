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
        } else
            this.player = new ChantersPlayer({
                audio: this.$.audio,
                canvas: this.$.analyser
            });
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
        // for (var i = 0; i < files.length; i++) {
        (function nextIteration(file) {

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



                    var songDuration = Chanters.createElement("span");
                    that.player.getAudioDuration(file, function(time) {
                        file.duration = time;
                        songDuration.innerHTML = time;
                        li.appendChild(songDuration);
                        songDuration.classList.add("time");


                        var songName = Chanters.createElement("a");
                        songName.innerHTML = tag.tags.title || file.name;
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
                    console.log(error, file);
                }
            });

        })(files[count]);
        // }
        that.$.songList.style.display = "block";
    },
    play: function(file) {
        var _URL = window.URL || window.webkitURL;

        this.$.audio.src = _URL.createObjectURL(file);
        this.$.audio.load();
        this.$.audio.play();
        this.$.audio.volume = 0.7;
        this.saveTabInformation(file);

        this.player.visualizer();
    },
    saveTabInformation: function(file) {
        var currentSong = {
            title: file.name,
            duration: file.duration,
            size: file.size,
            imageUrl: file.imageUrl
        }

        localStorage.currentSong = JSON.stringify(currentSong);
    }
});
