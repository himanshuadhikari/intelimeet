Chanters("chanters-header", {
    mode: "Day Mode",
    visibility: "hidden",
    changeBackground: function(event) {
        event.target.nextElementSibling.click();
        var that = this;
        event.target.nextElementSibling.onchange = function(event) {
            var imageList = event.target.files;

            that.parent.communicate({
                element: "chanters-background",
                effectedProperty: "imageList",
                newValue: imageList
            });
        };
    },
    changeMode: function() {
        this.mode = this.mode === "Day Mode" ? "Night Mode" : "Day Mode";

        this.parent.communicate({
            element: "chanters-content",
            effectedProperty: "mode",
            newValue: this.mode
        });
    },
    inheritParent: true,
    openSettings: function() {
        if (this.visibility === "hidden")
            this.visibility = "visible";
        else
            this.visibility = "hidden";

    },
    menuItemClicked: function(event, item) {
        if (item && this[item])
            this[item](event);
    },
    resizeBackground: function(event) {
        this.parent.communicate({
            element: "chanters-background",
            effectedProperty: "zIndex",
            newValue: event
        });
    }
});
