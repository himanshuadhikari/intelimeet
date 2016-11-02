Chanters("chanters-menu", {
    inheritParent: true,
    itemClick: function(event, itemName) {
        if (this.callback)
            this.parent[this.callback](event, itemName);
    }
});
