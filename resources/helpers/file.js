const fs = require("fs");
const crypto = require("crypto");

var file = {
    store : async function(dataURL, path, extension) {
        const promise = new Promise((resolve, reject) => {
            // https://stackoverflow.com/a/43488020
            const data = dataURL.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(data, "base64");
            const storePath = path + "/" + crypto.randomUUID() + "." + extension;
    
            fs.writeFile(storePath, buffer, function(error, results) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(storePath);
                }
            });
        });

        try {
            return await promise;
        }
        catch {
            return null;
        }
    },
};

module.exports = { file };