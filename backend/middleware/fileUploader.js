const multer = require('multer');
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
};
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images") // (null = pas d'erreur) et nom du dossier
    },
    filename: (req, file, callback) => {
        const uniqueId = uuid.v4();
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, uniqueId + '_' + name);
    }
});
const upload = multer({storage}).single("image");

module.exports = {
    saveFile: function(req, res, next) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              res.send('Error with multer: ' + err);
            } else if (err) {
                res.send('Unknown error: ' + err);
            } else {
                // Everything went fine.
                next();
            }
          })
    }
}