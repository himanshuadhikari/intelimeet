Chanters("chanters-header", {
    mode: "Day Mode",
    onReady: function createList(event) {
        // var that = this;
        // setTimeout(function() {
        //     that.mode = "Night Mode";
        // }, 2000);
    },
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
    inheritParent: true
});
