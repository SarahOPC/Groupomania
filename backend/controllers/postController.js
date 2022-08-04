const dbfile = require('../config/db');
const sqlRequests = require('../models/postModel');
const fs = require("fs");
require('dotenv').config();

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
        console.log("Connecté à la base de données createPost");

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
    const postUserId = parseInt(req.params.id);
    const postBodyImage = req.uniqueFileName;
    const postId = req.params.postId;

    let parameter = [
        postUserId
    ];

    dbfile.db.query(sqlRequests.sqlGetRole, parameter, async function (err, results) {
        let determinedRole = results[0].role;

        let params = [
            postId
        ];

        dbfile.db.query(sqlRequests.sqlGetUserIdFromTablePosts, params, async function (err, resultat) {
            let userIdFromPosts = resultat[0].userId;

            if (userIdFromPosts !== req.auth.userId && determinedRole !== process.env.ROLE_ADMIN) {
                console.log("Vous n'êtes pas autorisé à effectuer cette action");
                return res.status(401).json({ message: "Requête non autorisée" }); // Pas le bon user et pas l'admin
            } else {
                let postImage = postBodyImage == '' || postBodyImage == undefined || postBodyImage == null
                    ? null
                    : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

                dbfile.db.connect(async function (err) {
                    if (err) {
                        console.log("Impossible de se connecter à la base de données");
                    };
                    console.log("Connecté à la base de données updatePost");

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
            }
        })
    })
};

exports.deletePost = (req, res, next) => {
    let postId = parseInt(req.params.postId);
    let userId = parseInt(req.params.id);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données deletePost");

        let parameter = [
            userId
        ];

        dbfile.db.query(sqlRequests.sqlGetRole, parameter, async function (err, results) {
            let determinedRole = results[0].role;

            let params = [
                postId
            ];

            dbfile.db.query(sqlRequests.sqlGetUserIdFromTablePosts, params, async function (err, resultat) {
                let userIdFromPosts = resultat[0].userId;

                if (userIdFromPosts !== req.auth.userId && determinedRole !== process.env.ROLE_ADMIN) {
                    console.log("Vous n'êtes pas autorisé à effectuer cette action");
                    return res.status(401).json({ message: "Requête non autorisée" }); // Pas le bon user et pas l'admin
                }

                dbfile.db.query(sqlRequests.sqlGetOneForDelete, params, function (err, result) {
                    if (err) {
                        return res.status(401).json({ message: "Impossible de trouver le post à supprimer " + err });
                    }

                    if (result[0] && result[0] !== null && result[0].image !== null) {
                        let imageToDelete = result[0].image;
                        const filename = imageToDelete.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            dbfile.db.query(sqlRequests.sqlDeletePost, params, function (err, result) {
                                if (err) {
                                    return res.status(401).json({ message: "Impossible de supprimer ce post " + err });
                                };
                                res.status(200).json({ message: "Post supprimé" })
                            })
                        })
                    } else {
                        dbfile.db.query(sqlRequests.sqlDeletePost, params, function (err, result) {
                            if (err) {
                                return res.status(401).json({ message: "Impossible de supprimer ce post " + err });
                            };
                            res.status(200).json({ message: "Post supprimé" })
                        })
                    }
                })
            })
        });
    })
};

exports.getAllPosts = (req, res, next) => {
    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données getAllPosts");

        dbfile.db.query(sqlRequests.sqlGetAllPosts, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible d'afficher tous les posts" });
            };
            res.status(200).json({ result });
        })
    })
};

exports.getOnePost = (req, res, next) => {
    const postId = req.params.postId;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données getOnePost");

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
    let likes = req.body.likesdislikes; // 1 ou -1 ou 0
    let userId = req.params.id;
    let postId = req.params.postId;

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données ratingPost");

        let parameters = [
            postId, userId, likes
        ];

        dbfile.db.query(sqlRequests.sqlGetRating, parameters, async function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible d'évaluer ce post" });
            } else if (likes == 1 && result[0] === null || likes == 1 && result[0] === undefined || likes == -1 && result[0] === null || likes == -1 && result[0] === undefined) {
                dbfile.db.query(sqlRequests.sqlCreatingLike, parameters, async function (err, results) {
                    if (err) {
                        return res.status(401).json({ message: "Impossible de liker le post" });
                    };
                    res.status(200).json({ results });
                })
            } else if (likes == 0 && result[0].value === 1 || likes == 0 && result[0].value === -1 ) {
                dbfile.db.query(sqlRequests.sqlDeletingLike, parameters, async function (err, results) {
                    if (err) {
                        return res.status(401).json({ message: "Impossible de supprimer le like du post" });
                    };
                    res.status(200).json({ results });
                })
            } else {
                return res.status(400).json({ message: "Une erreur s'est produite dans l'enregistrement de votre évaluation" });
            }
        })
    })
};
