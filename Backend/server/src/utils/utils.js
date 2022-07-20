const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFile(filename, JSON.stringify(content,null, 3), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    writeDataToFile,
    getPostData
}