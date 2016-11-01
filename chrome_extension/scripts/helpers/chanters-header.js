Chanters("chanters-header", {
    mode: "Day Mode",
    onReady: function createList(event) {
        var that = this;
        setTimeout(function() {
            that.mode = "night";
        }, 2000);
    }
});
