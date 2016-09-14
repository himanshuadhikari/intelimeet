Chanters("chanters-header", {
    changeMode: function() {
        this.user.name = "Super Hero";
        this.roles[1] = "No Work";
    },
    myclass: "white",
    mode: "Day Mode",
    onReady: function createList(event) {
        var that = this;
        setTimeout(function() {
            that.mode = "night";
        }, 2000);
    },
    startTime: "00::00",
    endTime: "04::20",
    user: {
        name: "Himanshu Adhikari",
        designation: "Software Engineer"
    },
    roles: [{ "role": "Admin" }, "Engineer"]
});
