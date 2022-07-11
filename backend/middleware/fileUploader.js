const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images") // pas d'erreur et nom du dossier
    },
    filename: (req, file, callback) => {
        const uniqueId = uuid.v4();
        const name = file.originalname.split(" ").join("_");
        const uniqueFileName = uniqueId + '_' + name;
        req.uniqueFileName = uniqueFileName;
        callback(null, uniqueFileName);
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