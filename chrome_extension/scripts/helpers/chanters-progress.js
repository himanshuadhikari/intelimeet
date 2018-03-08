Chanters("chanters-progress", {
    progress: 0,
    items: [{
        index: 0,
        message: "Preparing your playlist...",
        class: "current"
    }, {
        index: 1,
        message: "Loading Player...",
        class: ""
    }, {
        index: 2,
        message: "Enjoy your music...",
        class: ""
    }],
    progressLeft: "10%",
    onReady: function() {

        if (window.innerWidth > 1900)
            this.progressLeft = "7%";

        setTimeout(function() {
            this.showNotification("eskjdflsflsdfsd", "showNotification");
        }.bind(this));
    },
    initProgress: function() {
        this.items.forEach(function(item, index) {
            if (parseInt(this.current) > index)
                item.class = "complete";

            if (parseInt(this.current) === index)
                item.class = "current";

        }.bind(this));
    },
    resizeMessage: function() {
        window.onresize = function() {
            if (window.innerWidth > 1900)
                this.progressLeft = "7%";
            else
                this.progressLeft = "10%";
        }.bind(this)
    },
    showNotification: function(message, whichNotification, imgSrc) {
        this.$.notification.reverse = false;
        this.$.notification[whichNotification](message, imgSrc);
        this.$.notification.show();
    }
});