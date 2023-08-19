const genId = require("uuid");
const path = require("path");
module.exports = class FileService {
    static saveFile(file) {
        const fileName = genId.v4() + '.jpeg';
        const pathFile = path.resolve('imgs', fileName);
        file.mv(pathFile);
        return fileName;
    };
};