Chanters("chanters-background", {
    backgroundImg: localStorage.getItem("backgroundImgUrl") || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    zIndex: "z-index-center",
    zIndex_: function(event) {
        event.target.zIndex = event.target.zIndex === "z-index-center" ? "z-index-center" : "z-index-top";
        this.zIndex = event.target.zIndex;
    },
    onReady: function() {

        var that = this;

        ! function getImageScroll() {
            if (localStorage.getItem("heightToScroll") || localStorage.getItem("widthToScroll")) {
                that.$.background.style.top = localStorage.getItem("heightToScroll") || "0";
                that.$.background.style.left = localStorage.getItem("widthToScroll") || "0";
            }
        }();

        window.onload = function() {
            var heightToScroll = window.outerHeight - that.$.background.height;
            var widthToScroll = window.outerWidth - that.$.background.width;

            console.log(heightToScroll, widthToScroll);

            $(that.$.background).draggable({ containment: [widthToScroll, heightToScroll, 0, 0], scroll: false, cursor: "pointer" });

            // if (localStorage.backgroundImgUrl)
            //     that.backgroundImg = localStorage.getItem("backgroundImgUrl");
        }

        window.onbeforeunload = function() {
            localStorage.setItem("heightToScroll", getComputedStyle(that.$.background).top);
            localStorage.setItem("widthToScroll", getComputedStyle(that.$.background).left);
        }
    },
    imageList: [],
    imageList_: function(list) {
        this.imageList = list;
        var _URL = window.URL || window.webkitURL,
            blobURL = this.getBlobUrl(this.imageList[0]);

        this.backgroundImg = blobURL;

        function saveImage() {
            var reader = new FileReader();
            reader.onload = function(e) {
                localStorage.backgroundImgUrl = reader.result; //stores the image to localStorage
            }

            reader.readAsDataURL(list[0]);
        }

        saveImage();

    },
    getBlobUrl: function(file) {
        var _URL = window.URL || window.webkitURL,
            blobURL = _URL.createObjectURL(file);
        return blobURL;
    }
});
