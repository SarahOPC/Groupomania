const dbfile = require('../config/db');
const sqlRequests = require('../models/commentModel');
require('dotenv').config();

exports.createComment = (req, res, next) => {
    let post_Id = req.params.postId;
    let userId = req.params.id;
    let commentText = req.body.text;
    let postId = parseInt(post_Id);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données createComment");

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
    let comment_Id = req.params.commentId;
    let commentId = parseInt(comment_Id);
    let userId = req.params.id;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données deleteComment");

        let params = [
            commentId
        ];

        if(userId !== req.auth.userId && userId !== process.env.ROLE_ADMIN) {
            console.log("Vous n'êtes pas autorisé à effectuer cette action");
            return res.status(400).json({error: new Error("Requête non autorisée")}); // Pas le bon user ou pas l'admin
        }

        dbfile.db.query(sqlRequests.sqlDeleteComment, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de supprimer ce commentaire :( " + err });
            };
            res.status(200).json({ message: "Commentaire supprimé" })
        })
    });
};

exports.getAllComments = (req, res, next) => {
    let post_Id = req.params.postId;
    let postId = parseInt(post_Id);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données getAllComments");

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