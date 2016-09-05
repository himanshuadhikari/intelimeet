Chanters("chanters-background", {
    domReady: function() {
        this.previourURL = this.src;
    },
    chantersBackground: function(event) {
        event.target.nextElementSibling.click();
        var target = document.querySelector("#imagelist");
        var supportedFormats = ['jpg', 'jpeg', 'png'];

        event.target.nextElementSibling.onchange = function(event) {
            this.list_ = event.target.files;

            for (var i = 0; i < this.list_.length; i++) {
                var file = this.list_[i],
                    format = file.name.split(" ").pop();

                if (!file && supportedFormats.indexOf(format) === -1)
                    return;

                (function(i) {
                    var li = document.createElement('li'),
                        _URL = window.URL || window.webkitURL,
                        blobURL = _URL.createObjectURL(file);

                    li.innerHTML = "<img class='wall-img-thumbs' src='" + blobURL + "' />";
                    li.classList.add("box-shadow-inset");
                    li.onclick = this.selectWallpaper;
                    li.file = file;
                    target.appendChild(li);
                }.bind(this))(i);
            }

        }.bind(this);
    },
    imagelist: [],
    selectWallpaper: function(event) {
        var target = event.target.parentNode,
            file = target.file,
            blobURL = event.target.src;

        if (!file)
            return;

        if (target.classList.contains("active")) {
            target.classList.remove("active");
            var index = target.index;
            this.imagelist.splice(index, 1);
            this.src = this.previourURL;
        } else {
            target.classList.add("active");
            target.index = this.imagelist.length;
            this.imagelist.push(blobURL);
            this.src = blobURL;
        }

    }
});
