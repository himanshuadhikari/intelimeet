Chanters("directory-structure", {
    noFiles: 'hide',
    hasFiles: 'hide',
    music: ["mp3"],
    video: ["mp4", "mkv", "avi"],
    image: ["jpg", "jpeg", "png"],
    visibilityVideo: 'hide',
    visibilityImage: 'hide',
    currentFolder: {},
    onReady: function() {
        this.getRootFolder();
    },
    getFileType: function(fileName) {
        var extension = fileName.split(".").pop().toLowerCase();

        if (this.music.indexOf(extension) !== -1)
            return "fa fa-music";

        if (this.video.indexOf(extension) !== -1)
            return "fa fa-file-video-o";

        if (this.image.indexOf(extension) !== -1)
            return "fa fa-picture-o";

        if (extension === "txt")
            return "fa fa-file";
    },
    getRootFolder: function(event, currentFolder) {
        fs.readDirectory({
            folder: currentFolder || "root",
            onSuccess: function(folders) {
                if (!folders) return;

                if (!folders.length) this.$.fileStructure.innerHTML = "";

                if (!folders.length) {
                    this.noFiles = 'show';
                    this.hasFiles = 'hide';
                }

                if (folders.length) {
                    this.noFiles = 'hide';
                    this.hasFiles = 'show';
                    this.$.fileStructure.innerHTML = "";
                    this.createTree(folders, this.$.fileStructure);
                }
            }.bind(this),
            onError: function(error) {
                console.log(error);
            }
        })
    },
    createFolder: function(event, folderObject) {
        var folderPath = prompt("Please enter folder path");
        if (!folderPath || folderPath && !folderPath.trim().length)
            return;

        var that = this;
        fs.createFolder(folderPath, folderObject, function(currentFolder) {
            that.getRootFolder(undefined, that.currentFolder);
        });
    },
    createTree: function(folders, target) {
        var that = this;
        folders.forEach(function(folder) {
            if (folder.isFile)
                folder.fileType = that.getFileType(folder.name);


            var li = document.createElement('li');
            li.classList.add("list");
            var a = document.createElement('a');

            if (folder.isDirectory)
                var i = '<i class="fa fa-folder" aria-hidden="true"></i><i class="fa fa-trash-o delete" aria-hidden="true"></i>';
            else
                var i = '<i class="' + folder.fileType + '" aria-hidden="true"></i><i class="fa fa-trash-o delete" aria-hidden="true"></i>';


            a.innerHTML = i;
            a.onclick = that.getFolder.bind(that);

            if (folder.fileType === "fa fa-picture-o") {
                var img = document.createElement("img");
                img.src = folder.toURL();
                a.appendChild(img)
            }

            a.folder = folder;
            a.href = "";
            a.title = folder.fullPath;

            var btnDelete = a.querySelector(".delete");
            btnDelete.folder = folder;
            btnDelete.onclick = that.deleteFolder.bind(that);


            var em = document.createElement("em");
            em.textContent = folder.name;


            a.appendChild(em);

            li.appendChild(a);
            target.appendChild(li);
            if (img)
                resizeImage.call(this, img, li);
        });


        function resizeImage(element, li) {
            var heightToScroll = li.outerHeight - element.height;
            var widthToScroll = li.outerWidth - element.width;
            $(element).draggable({ containment: [widthToScroll, heightToScroll, 0, 0], scroll: false, cursor: "pointer" });
        }
    },
    getFolder: function(event) {
        event.preventDefault();
        var folder = event.currentTarget.folder;

        if (folder.isFile) {
            this.executeFile(folder);
        } else {
            this.curhrentFolder = folder;
            fs.readDirectory({
                folder: folder,
                onSuccess: function(folders) {
                    if (!folders) return;

                    if (!folders.length) {
                        this.noFiles = 'show';
                        this.hasFiles = 'hide';
                    }

                    if (folders.length) {
                        this.noFiles = 'hide';
                        this.hasFiles = 'show';
                        this.$.fileStructure.innerHTML = "";
                        this.createTree(folders, this.$.fileStructure);
                    }
                }.bind(this),
                onError: function(error) {
                    console.log(error);
                }
            })
        }
    },
    addFiles: function(event) {
        this.$.fileupload.click();
        var that = this;
        this.$.fileupload.onchange = function(event) {
            fs.saveFile({
                folder: this.currentFolder,
                files: this.files,
                onSuccess: function() {
                    that.getRootFolder();
                },
                onError: function() {

                }
            })
        };
    },
    deleteFolder: function(event) {
        event.stopPropagation();
        event.preventDefault();
        var folder = event.currentTarget.folder;
        var message = folder.isDirectory ? "Empty all items from " + folder.name + "? \n All items in the " + folder.name + " will be permanently deleted." :
            "Are you sure you want to permanently delete " + folder.name + "? \nIf you delete an item, it will be permanently lost.";
        var userConfimation = confirm(message);
        if (userConfimation) {
            var that = this;

            if (folder.isDirectory)
                fs.removeRecursively(folder.fullPath, function() {
                    that.getRootFolder();
                });

            if (folder.isFile)
                fs.deleteFile({
                    file: folder,
                    onSuccess: function() {
                        that.getRootFolder();
                    }
                });
        }
    },
    executeFile: function(file) {
        var fileType = this.getFileType(file.name)
        switch (fileType) {
            case "fa fa-music":
                this.playAudio(file);
                break;
            case "fa fa-file-video-o":
                this.playVideo(file);
                break;
            case "fa fa-picture-o":
                this.setImage(file);
                break;
        }
    },
    playAudio: function(file) {
        this.$.video.pause();
        this.$.audio.src = file.toURL();
        this.$.audio.load();
        this.$.audio.play();
        this.visibilityVideo = "hide";
    },
    playVideo: function(file) {
        this.$.audio.pause();
        this.$.video.src = file.toURL();
        this.$.video.load();
        this.$.video.play();
        this.visibilityImage = "hide";
        this.visibilityVideo = "show";
    },
    setImage: function(file) {
        this.visibilityImage = "show";
        this.visibilityVideo = "hide";
        this.$.img.src = file.toURL();
    }
});