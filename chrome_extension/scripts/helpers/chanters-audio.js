Chanters("chanters-audio", {
    imgSrc: "/images/music-icon.png",
    onReady: function() {
        $(this.$.audio).draggable({
            containment: "parent"
        });
    },
    show: function() {
        this.delay("visible");
    },
    hide: function() {
        this.delay("hidden");
    },
    delay: function(mode) {
        var visibility;
        if (mode && typeof mode === "string")
            visibility = mode;
        else
            visibility = this.visibility === "visible" ? "hidden" : "visible";

        setTimeout(function() {
            this.visibility = visibility;
        }.bind(this));
    }
});
