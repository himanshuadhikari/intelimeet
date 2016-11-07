 Chanters("chanters-content", {
     onReady: function() {
         this.loadTemplate();

         if (localStorage.mode) {
             this.mode_(localStorage.mode);
         }
     },
     mode: "Day Mode",
     visibility: "show",
     mode_: function(newValue) {
         this.mode = newValue;
         if (this.mode === "Day Mode")
             this.$.view.classList.remove("dark-div");
         if (this.mode === "Night Mode")
             this.$.view.classList.add("dark-div");

         localStorage.mode = this.mode;
     },
     loadTemplate: function(cb, localPage) {
         var apiURL = "http://localhost:4444/static/views/";
         if (!this.template)
             return;

         var chromeAppUrl = "views/";
         var templateUrl = chromeAppUrl + this.template;

         var link = document.createElement("link");
         link.rel = "import";
         link.href = templateUrl;

         document.head.appendChild(link);

         var webComponent = document.createElement(this.template.split(".html")[0]);
         this.appendChild(webComponent);
         if (cb)
             cb();
     },
     template_: function(newValue) {
         if (newValue)
             this.template = newValue;
         var flag = false;
         if (this.mode !== "Night Mode") {
             this.mode_("Night Mode");
             this.visibility = "hide";
             flag = true;
         }

         this.loadTemplate(function() {
             setTimeout(function() {
                 if (this.mode !== "Night Mode" || flag) {
                     this.mode_("Day Mode");
                     this.visibility = "show";
                 }
             }.bind(this), 2000);
         }.bind(this));
     }

 });
