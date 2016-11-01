Chanters("chanters-background", {
    backgroundImg: "background image",
    onReady: function() {
        this.backgroundImg = "../images/5740fe48-d74e-4d95-8ec7-8c1f738cabc0.jpg";

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
            $(that.$.background).draggable({ containment: [widthToScroll, heightToScroll, 0, 0], scroll: false, cursor: "pointer" });
        }

        window.onbeforeunload = function() {
            localStorage.setItem("heightToScroll", getComputedStyle(that.$.background).top);
            localStorage.setItem("widthToScroll", getComputedStyle(that.$.background).left);
        }
    },
    imageList: [],
    imageList_: function(list) {
        var _URL = window.URL || window.webkitURL,
            blobURL = _URL.createObjectURL(list[0]);

        this.$.background.src = blobURL;
    }
});
