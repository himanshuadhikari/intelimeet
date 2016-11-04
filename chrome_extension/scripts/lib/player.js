(function(window, document, undefined, factory) {
    window["ChantersPlayer"] = factory();

})(window, document, undefined, function() {
    var animationFlag = false,
        context,
        analyser,
        source,
        ctx;

    var ChantersPlayer = function(mediaObject) {
        this.audio = mediaObject.audio;
        this.video = mediaObject.video;
        this.canvas = mediaObject.canvas;
        this.audio.volume = .0;

        context = new AudioContext(),
            analyser = context.createAnalyser(),
            source = context.createMediaElementSource(this.audio),
            source.connect(analyser),
            analyser.connect(context.destination);
    }



    ChantersPlayer.prototype.visualizer = function() {
        ctx = this.canvas.getContext('2d');
        analyser.connect(context.destination);
        animationFlag = true;
        this.frameLooper();
        var bufferLength = analyser.frequencyBinCount;
    }

    ChantersPlayer.prototype.frameLooper = function() {
        if (animationFlag) {
            window.requestAnimationFrame(this.frameLooper.bind(this));
            fbc_array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(fbc_array);
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
            // light blue
            grd.addColorStop(0, '#E20604');
            // dark blue
            grd.addColorStop(.20, '#FDF629');
            grd.addColorStop(.40, '#4AF14E');
            grd.addColorStop(.60, '#08D8EC');
            grd.addColorStop(.80, '#3231F0');
            grd.addColorStop(1, '#9426A3');
            ctx.fillStyle = grd;
            var bars = 100;
            for (var i = 0; i < bars; i++) {
                bar_x = i * 3;
                bar_width = 2;
                bar_height = -(fbc_array[i] / 3);
                // experiment.style.transform = "scale(" + -bar_height / 10 + ")";
                ctx.fillRect(bar_x, this.canvas.height, bar_width, bar_height);
            }
        }
    }

    ChantersPlayer.prototype.getAudioDuration = function(file, callback) {
        var audio = new Audio();
        var _URL = window.URL || window.webkitURL;
        audio.src = _URL.createObjectURL(file);
        audio.load();
        audio.play();
        audio.volume = .0;


        audio.oncanplaythrough = function() {

            var min = Math.floor(audio.duration / 60);
            var sec = Math.floor(audio.duration % 60);
            if (sec < 10) {
                sec = '0' + sec;
            }
            if (min < 60) {
                min = '0' + min;
            }
            audio.pause();
            callback(min + " : " + sec);

        }.bind(this);
    }

    return ChantersPlayer;
});
