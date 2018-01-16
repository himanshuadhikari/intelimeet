Chanters("chanters-player", {
    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    "title": "title",
    "duration": "duration",
    "fileSize": "file size",
    "previous": null,
    supportedExtension: ['mp3', 'mp4', 'mkv'],
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
                canvas: this.$.audioPlayer.$.analyser,
                seek: this.seek,
                onend: this.onend.bind(this),
                video: this.$.videoPlayer
            });
        }
    },
    onend: function(currentSong) {
        this.play(currentSong.file, currentSong);
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
        // this.saveToLocal(files);

        (function nextIteration(file) {
            var playerFlag = that.getMode(file);
            // var fileSystem = new fs();
            if (!playerFlag) {

                if (count < files.length - 1) {
                    count++;
                    nextIteration(files[count]);
                }
            } else
                jsmediatags.read(file, {
                    onSuccess: function(tag) {
                        createList(tag, file, nextIteration);
                    },
                    onError: function(error) {
                        count++;
                        console.log(error, file);
                        createList({}, file, nextIteration);
                    }
                });


        })(files[count]);
        that.$.songList.style.display = "block";


        function createList(tag, file, nextIteration) {
            var li = Chanters.createElement("li");
            var dataUrl;
            var div = Chanters.createElement("div");
            var img = Chanters.createElement("img");
            if (tag && tag.tags && tag.tags.picture) {
                var image = tag.tags.picture;

                var base64String = "";
                for (var i = 0; i < image.data.length; i++) {
                    base64String += String.fromCharCode(image.data[i]);
                }
                dataUrl = "data:" + image.format + ";base64," + window.btoa(base64String);
                img.src = dataUrl;

                file.album = tag.tags.album;
                file.artist = tag.tags.artist;
                file.year = tag.tags.year;
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
                songName.innerHTML = file.title = tag && tag.tags && tag.tags.title || file.name;
                file.imageUrl = img.src;

                li.onclick = function() {
                    that.play(file, li);
                }

                var artist = Chanters.createElement("span");
                artist.innerHTML = tag && tag.tags && tag.tags.artist || "N/A";
                artist.classList.add("artist");

                li.appendChild(songName);
                li.appendChild(artist);
                li.file = file;

                that.$.songList.appendChild(li);
                // console.log(file);
                // fs.writeFile(file, 'Hello content!', function(err) {
                //     if (err) throw err;
                //     console.log('Saved!');
                // });

                if (count < files.length - 1) {
                    count++;
                    nextIteration(files[count]);
                }
            });
        }
    },
    play: function(file, li) {
        this.getMode(file);

        communicate(file.title);
        this.player.play(file, li, this.player.videoMode);
        this.$.audioPlayer.totaltime = file.duration;
        this.seek.max = this.audioPlayer.duration;

        this.saveTabInformation(file);

        this.$.audioPlayer.poster = file.imageUrl === location.origin + "/images/music-icon.png" ? "/images/bg-default.jpg" : file.imageUrl;
        this.$.audioPlayer.title = file.title;

        this.$.audioPlayer.album = file.album;
        this.$.audioPlayer.artist = file.artist;
        this.$.audioPlayer.year = file.year;

        this.showNotification("Now Playing, " + file.title, "showNotification", file.imageUrl);
        this.$.audioPlayer.setTheme();
        if (this.player.videoMode) {
            this.$.videoPlayer.visibility = "show";
            this.$.audioPlayer.visibility = "hidden";
        } else {
            this.$.audioPlayer.visibility = "visible";
            this.$.videoPlayer.visibility = "hide";
        }
    },
    getMode: function(file) {
        var extension = file.name.split(".").pop();
        var playerFlag = this.supportedExtension.indexOf(extension) !== -1 ? true : false;
        extension.toLowerCase() !== "mp3" ? this.player.videoMode = true : this.player.videoMode = false;

        return playerFlag;
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
        this.$.notification.reverse = false;
        this.$.notification[whichNotification](message, imgSrc);
        this.$.notification.show();
    },
    nextSong: function() {
        console.log("nextSong")
    },
    previousSong: function() {
        console.log("previousSong")
    },
    saveToLocal: function(files) {},
    playPause: function(isPlaying) {
        this.player.EditAnimationFlag(isPlaying);
    }
});