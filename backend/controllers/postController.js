const dbfile = require('../config/db');
const sqlRequests = require('../models/postModel');
const fs = require("fs");
const { Console } = require('console');

exports.createPost = (req, res, next) => {
    const postBodyText = req.body.text;
    const postUserId = req.params.id;
    const postBodyImage = req.uniqueFileName;

    // variable = condition ? si oui : sinon
    let postImage = postBodyImage == '' || postBodyImage == undefined || postBodyImage == null
        ? null
        : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postBodyText, postImage, postUserId
        ];

        dbfile.db.query(sqlRequests.sqlCreatePost, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de créer ce post " + err });
            };
            res.status(200).json({ message: "Post créé" })
        })
    })
}

exports.updatePost = (req, res, next) => {
    const postBodyText = req.body.text;
    const postUserId = req.params.id;
    const postBodyImage = req.uniqueFileName;
    const postId = req.params.postId;

    let postImage = postBodyImage == '' || postBodyImage == undefined || postBodyImage == null
        ? null
        : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postBodyText, postImage, postUserId, postId
        ];

        dbfile.db.query(sqlRequests.sqlUpdatePost, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de mettre à jour ce post " + err });
            };
            res.status(200).json({ message: "Post mis à jour" })
        })
    })
};

exports.deletePost = (req, res, next) => {
    let postId = req.params.postId;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let params = [
            postId
        ];

        let imageToDelete;
        dbfile.db.query(sqlRequests.sqlGetOneForDelete, params, async function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de trouver le post à supprimer " + err });
            };
            let imageToDelete = JSON.stringify(result[0].image);
            return imageToDelete;
        });

        if (imageToDelete) {
            const filename = imageToDelete.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) throw err;
                console.log(`images/${filename} was deleted`);
            })
        }

        dbfile.db.query(sqlRequests.sqlDeletePost, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de supprimer ce post " + err });
            };
            res.status(200).json({ message: "Post supprimé" })
        })
    })
};

exports.getAllPosts = (req, res, next) => {
    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        dbfile.db.query(sqlRequests.sqlGetAllPosts, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible d'afficher tous les posts" });
            };
            res.status(200).json({ result })
        })
    })
};

exports.getOnePost = (req, res, next) => {
    const postId = req.params.postId;

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
                return res.status(401).json({ message: "Impossible d'afficher le post demandé" });
            };
            res.status(200).json({ result });
        })
    })

};

exports.ratingPost = (req, res, next) => {
    let likes = req.body.likesdislikes; // 1 ou -1
    let userId = req.params.id;
    let postId = req.params.postId;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");

        let parameters = [
            postId, userId, likes
        ];
        switch (likes) {
            case 1:
                dbfile.db.query(sqlRequests.sqlLikesDislikes, parameters, function(err, results) {
                    if (err) {
                        return res.status(401).json({ message: "Impossible de liker le post" });
                    } else if(results[0] === undefined){
                        dbfile.db.query(sqlRequests.sqlCreatingLike, parameters, function (err, results) {
                            if (err) {
                                return res.status(401).json({ message: "Impossible de liker le post" });
                            };
                            res.status(200).json({ results });
                        })
                    } else if(results[0].value === 1){
                        dbfile.db.query(sqlRequests.sqlDeletingLike, parameters, function (err, results) {
                            if (err) {
                                return res.status(401).json({ message: "Impossible de supprimer le like du post" });
                            };
                            res.status(200).json({ results });
                        })
                    }
                })
                break;
            case -1:
                dbfile.db.query(sqlRequests.sqlLikesDislikes, parameters, function(err, results) {
                    if (err) {
                        return res.status(401).json({ message: "Impossible de disliker le post" });
                    } else if(results[0] === undefined){
                        dbfile.db.query(sqlRequests.sqlCreatingLike, parameters, function (err, results) {
                            if (err) {
                                return res.status(401).json({ message: "Impossible de disliker le post" });
                            };
                            res.status(200).json({ results });
                        })
                    } else if(results[0].value === -1){
                        dbfile.db.query(sqlRequests.sqlDeletingLike, parameters, function (err, results) {
                            if (err) {
                                return res.status(401).json({ message: "Impossible de supprimer le dislike du post" });
                            };
                            res.status(200).json({ results });
                        })
                    }
                })
                break;
        }
    });
}