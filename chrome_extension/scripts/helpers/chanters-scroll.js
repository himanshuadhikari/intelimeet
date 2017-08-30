 Chanters("chanters-scroll", {
     onReady: function() {
         this.callback = this.trackMouseMovement.bind(this);
     },
     startScroll: function(event) {
         event.target.addEventListener('mousemove', this.callback);
     },
     trackMouseMovement: function(event) {
         this.$.thumb.parentNode.style.top = event.pageY - 10 + "px";
         // this.parent.scrollTop = event.pageY - 10;
         // this.parent.offsetHeight
     },
     stopScroll: function(event) {
         event.target.removeEventListener('mousemove', this.callback);
     },
     inheritParent: true
 });
