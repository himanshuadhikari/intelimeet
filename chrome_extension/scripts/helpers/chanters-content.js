 Chanters("chanters-content", {
     domReady: function() {
         console.log("hello from content portions");
     },
     mode: "Day Mode",
     mode_: function() {
         if (this.mode === "Day Mode")
             this.$.view.classList.remove("dark-div");
         if (this.mode === "Night Mode")
             this.$.view.classList.add("dark-div");
     }
 });
