// pour aider à la gestion des fichiers avec des requêtes http vers l'api
const multer = require("multer");
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/mp4": "mp4"
}

// on crée un objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images") // pas d'erreur et nom du dossier
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//const uuid = require('uuid');
//const uniqueId = uuid.v4();

module.exports = multer({ storage }).single("image"); // que des fichiers uniques et ce sont des images