Chanters("chanters-header", {
    _Mode: function() {
        console.log(this);
    },
    mode: "Day Mode",
    onReady: function createList(event) {
        console.log("onReady called", this);
    },
    startTime: "00::00",
    endTime: "04::20"
});
