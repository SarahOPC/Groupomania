const dbfile = require('../config/db');
const sqlRequests = require('../models/commentModel');

exports.createComment = (req, res, next) => {
    let post_Id = req.params.id;
    let userId = req.body.user_id;
    let commentText = req.body.text;
    let postId = parseInt(post_Id);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            commentText, userId, postId
        ];

        dbfile.db.query(sqlRequests.sqlCreateComment, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de créer ce commentaire :( " + err });
            };
            res.status(200).json({ message: "Commentaire créé" })
        })
    });
};

exports.deleteComment = (req, res, next) => {
    let comment_Id = req.params.id;
    let commentId = parseInt(comment_Id);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            commentId
        ];

        dbfile.db.query(sqlRequests.sqlDeleteComment, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de supprimer ce commentaire :( " + err });
            };
            res.status(200).json({ message: "Commentaire supprimé" })
        })
    });
};

exports.getAllComments = (req, res, next) => {
    let post_Id = req.params.id;
    let postId = parseInt(post_Id);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postId
        ];

        dbfile.db.query(sqlRequests.sqlGetAllComments, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible d'afficher tous les commentaires de ce post :( " + err });
            };
            res.status(200).json({ result })
        })
    });
};