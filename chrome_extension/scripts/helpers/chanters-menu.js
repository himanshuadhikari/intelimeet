Chanters("chanters-menu", {
    inheritParent: true,
    onReady: function() {
        if (localStorage.mode && localStorage.mode === "Night Mode") {
            this.activeMenuItem(this.$.menu.children[3], "true");
            this.$.menu.children[3].mode = "Night Mode";
        } else {
            this.$.menu.children[3].mode = "Day Mode";
        }
    },
    itemClick: function(event, itemName, isActive) {
        if (this.callback)
            this.parent[this.callback](event, itemName);

        this.activeMenuItem(event.currentTarget, isActive);
    },
    visibility_: function(event) {
        this.setPosition(event);
        this.visibility = this.visibility === "hide" ? "show" : "hide";
    },
    activeMenuItem: function(target, isActive) {
        if (isActive === "true")
            target.classList.contains("active-left") === true ? target.classList.remove("active-left") : target.classList.add("active-left");
    },
    hideMenu: function(event) {
        if (event.target.nodeName === "UL" && this.visibility === "show") {
            this.visibility = "hide";
            this.$.submenu.style.display = "none";
        }
    },
    clearCache: function(event) {
        this.$.fileupload.value = "";
        delete localStorage.currentSong;
        document.querySelector("chanters-player").remove();
        document.querySelector("chanters-content").appendChild(Chanters.createElement("chanters-player"));
    },
    setPosition: function(e) {
        this.$.menu.style.left = e.pageX + "px";
        this.$.menu.style.top = e.pageY - 70 + "px";
    },
    showSubMenu: function(e) {
        this.$.submenu.style.display = "block";
    },
    hideSubMenu: function() {
        this.$.submenu.style.display = "none";
    }
});