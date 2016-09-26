Chanters("chanters-header", {
    name: "rajan",
    changeMode: function() {
        this.color = "blue";
        this.mode = false;
        // this.fontSize = 50;
        this.orders[0].name = "Raman";
        this.orders[1].name = "Ashish";
    },
    myclass: "white",
    mode: "Day Mode",
    color: "red",
    fontSize: 23,
    onReady: function createList(event) {
        var that = this;
        setTimeout(function() {
            that.mode = "night";
        }, 2000);
    },
    startTime: "00::00",
    endTime: "04::20",
    darkDiv: "dark-div",
    user: {
        name: "Himanshu Adhikari",
        designation: "Software Engineer"
    },
    roles: [{ "role": "Admin" }, "Engineer"],
    bars: ['bar1', 'bar2', 'bar3', 'bar4'],
    orders: [{
        name: "himanshu",
        age: 30,
        temp: [{
            key: "one",
            innerarr: [{
                "one": 1
            }, {
                "one": 2
            }, {
                "one": 3
            }, {
                "one": 4
            }]
        }, {
            key: "two",
            innerarr: [{
                "one": 5
            }, {
                "one": 6
            }]
        }, {
            key: "three",
            innerarr: [{
                "one": 7
            }, {
                "one": 8
            }]
        }]
    }, {
        name: "vivek",
        age: 28,
        temp: [{
            key: "four"
        }, {
            key: "five"
        }]
    }],
    hello: function() {

        alert("rajan");
        this.name = "himanshu";
    }
});
