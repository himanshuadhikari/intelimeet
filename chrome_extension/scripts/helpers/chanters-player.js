Chanters("chanters-player", {
    imageList: [],
    imageList_: function(files) {
        this.createList(files);
    },
    createList: function createList(files) {
        var that = this;
        var count = 0;
        for (var i = 0; i < files.length; i++) {
            (function(file) {

                jsmediatags.read(file, {
                    onSuccess: function(tag) {
                        var li = Chanters.createElement("li");

                        if (tag.tags.picture) {
                            var img = Chanters.createElement("img");
                            var image = tag.tags.picture;

                            var base64String = "";
                            for (var i = 0; i < image.data.length; i++) {
                                base64String += String.fromCharCode(image.data[i]);
                            }
                            var dataUrl = "data:" + image.format + ";base64," + window.btoa(base64String);
                            img.src = dataUrl;
                            li.appendChild(img);
                        }

                        var a = Chanters.createElement("a");
                        a.innerHTML = tag.tags.title || file.name;
                        li.appendChild(a);

                        that.$.songList.appendChild(li);
                    },
                    onError: function(error) {
                        count++;
                        console.log(error, file);
                    }
                });

            })(files[i]);
        }
        that.$.songList.style.display = "block";
    }
});
