(function(window, fileSystem) {
    window.fs = fileSystem();
    new fs();
})(window, function() {
    var type,
        size,
        fs;

    function fileSystem() {
        util.requestQuota();
    }

    var util = {};

    util.requestQuota = function() {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.webkitStorageInfo.requestQuota(PERSISTENT, 5 * 1024 * 1024, util.requestFileSystem, errorHandler);
    }

    util.requestFileSystem = function(grantedBytes) {
        window.requestFileSystem(PERSISTENT, grantedBytes, function(fileSystem) {
            fs = fileSystem.root;
        }, errorHandler)
    }
    util.toArray = function(list) {
        return Array.prototype.slice.call(list || [], 0);
    }






    function errorHandler(e) {
        console.log(e);
    }



    fileSystem.prototype.readFile = function(fileName, callback) {
        fs.getFile(fileName, {}, function(fileEntry) {
            fileEntry.file(function(file) {
                // var reader = new FileReader();

                // reader.onloadend = function(e) {
                //     var txtArea = document.createElement('textarea');
                //     txtArea.value = this.result;
                //     document.body.appendChild(txtArea);
                // };

                // reader.readAsText(file);
            })
        }, errorHandler);


    }

    fileSystem.prototype.readDirectory = function(fileName, callback) {
        var dirReader = fs.createReader();
        var entries = [];

        var readEntries = function() {
            dirReader.readEntries(function(results) {
                if (!results.length) {
                    console.log(entries);
                    // listResults(entries.sort());
                } else {
                    entries = entries.concat(util.toArray(results));
                    readEntries();
                }
            }, errorHandler);
        };

        readEntries();

    }

    fileSystem.prototype.writeFile = function(fileName, callback) {
        var file = path;
        var error;
        if (callback)
            callback(error, file)
    }
    return fileSystem;
})