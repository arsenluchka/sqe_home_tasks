const fs = require("fs");
const path = require('path')

module.exports = function checkExistsWithTimeout(filePath, timeout) {
    return new Promise(function (resolve, reject) {

        let timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });

        let dir = path.dirname(filePath);
        let basename = path.basename(filePath);
        let watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
}

