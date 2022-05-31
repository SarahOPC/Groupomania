const dbfile = require('../config/db');
const sqlRequests = require('../models/postModels');
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const postBodyText = req.body.text;
    const postBodyUserId = req.body.user_id;
    const postBodyImage = req.body.imageUrl;

    // variable = condition ? si oui : sinon
    let postImage = postBodyImage != '' 
        ? `${req.protocol}://${req.get("host")}/images/${postBodyImage}`
        : null;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postBodyText, postImage, postBodyUserId
        ];
        
        dbfile.db.query(sqlRequests.sqlCreatePost, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de créer ce post :(" });
            };
            res.status(200).json({ message: "Post créée" })
        })
    
    })
}

exports.updatePost = (req, res, next) => {
    const postBodyText = req.body.text;
    const postBodyUserId = req.body.user_id;
    const postBodyImage = req.body.imageUrl;
    const postId = req.params.id;

    let postImage = postBodyImage != ''
        ? `${req.protocol}://${req.get("host")}/images/${postBodyImage}`
        : null;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postBodyText, postImage, postBodyUserId, postId
        ];

        dbfile.db.query(sqlRequests.sqlUpdatePost, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de mettre à jour ce post :(" });
            };
            res.status(200).json({ message: "Post mis à jour" })
        })
    })
};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postId
        ];

        dbfile.db.query(sqlRequests.sqlDeletePost, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de supprimer ce post :(" });
            };
            res.status(200).json({ message: "Post supprimé" })
        })
    })
//-----------------------------------------image-----------------------------------------------------------
};

exports.getAllPosts = (req, res, next) => {
    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        dbfile.db.query(sqlRequests.sqlGetAllPosts, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible d'afficher tous les posts' :(" });
            };
            res.status(200).json({ result })
        })
    })
};

exports.getOnePost = (req, res, next) => {
    const postId = req.params.id;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postId
        ];

        dbfile.db.query(sqlRequests.sqlGetOnePost, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible d'afficher le post demandé' :(" });
            };
            res.status(200).json({ result });
        })
    })

};

exports.ratingPost = (req, res, next) => {
    /*
        Chercher le contenu de la requête
        Vérifier que le post existe (id)
        Mettre à jour le post dans la base de données avec les likes, dislikes, unlikes, undislikes
        L'afficher
    */

};