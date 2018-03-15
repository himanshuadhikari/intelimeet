Chanters("chanters-audio", {
    title: "N/A",
    artist: "N/A",
    album: "N/A",
    year: "N/A",
    theme: "light",
    inheritParent: true,
    onReady: function() {
        $(this.$.audioContainer).draggable({
            containment: "parent"
        });
        // this.setTheme();
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
    },
    setTheme: function() {
        Chanters.getImageBrightness(this.poster, function(brightness) {
            if (brightness > 100)
                this.theme = "dark";
            else
                this.theme = "light";
        }.bind(this));
    },
    play: function() {
        this.$.audio.paused ? this.$.audio.play() : this.$.audio.pause();
        var host = this.getRootNode().host;

        if (host && host.playPause)
            host.playPause(!this.$.audio.paused);
    }
});