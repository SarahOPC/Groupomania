// pour aider à la gestion des fichiers avec des requêtes http vers l'api
const multer = require("multer");
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
}

// génération d'id unique grâce aux uuid v4
const uuid = require('uuid');

// on crée un objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "backend\\images") // pas d'erreur et nom du dossier
    },
    filename: (req, file, callback) => {
        const uniqueId = uuid.v4();
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, uniqueId + '_' + name);
    }
});

module.exports = multer({storage}).single("image"); // que des fichiers uniques et ce sont des images