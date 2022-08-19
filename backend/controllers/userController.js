const dbfile = require('../config/db');
const sqlRequests = require('../models/userModel');
const fs = require("fs");

const bcrypt = require('bcryptjs');
// permet de créer des tokens d'identification et de les vérifier
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    let requestUserMail = req.body.email;
    let requestUserPassword = req.body.password;
    let hashedPassword = bcrypt.hash(requestUserPassword, 10);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données signup");

        let params = [
            requestUserMail,
            await hashedPassword];

        dbfile.db.query(sqlRequests.sqlInsertUser, params, function (err, result) {
            if (err) {
                return res.status(401).json({ error: err });
            };
            res.status(201).json({ message: "Utilisateur créé" })
        });

    });
};

exports.login = (req, res, next) => {
    let requestUserMail = req.body.email;
    let requestUserPassword = req.body.password;
    let params = [requestUserMail];


    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données login");

            dbfile.db.query(sqlRequests.sqlFindUserMail, params, async function (err, result) {
                if (err) {
                    return res.status(401).json({ message: "Une erreur s'est produite" });
                } else if(result[0] == null) {
                    return res.status(200).json({
                        userId: -1
                    });
                } else {
                    await bcrypt.compare(requestUserPassword, result[0].password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({ message: "Utilisateur trouvé mais mot de passe non valide" });
                            } else {
                                res.status(200).json({
                                    userId: result[0].id,
                                    userRole: result[0].role,
                                    access_token: jwt.sign(
                                        { userId: result[0].id },
                                        `${process.env.ACCESS_TOKEN_SECRET}`,
                                        { expiresIn: "12h" },
                                    ),
                                    message: "Utilisateur trouvé et mot de passe valide"
                                })
                            }
                        })
                }
            })
        }
    })
};

exports.isUserRegistered = (req, res, next) => {
    let email = req.params.email;
    let params = [ email ];

    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données login");
        
            dbfile.db.query(sqlRequests.sqlFindUserMail, params, async function(err, result) {
                if (err) {
                    return res.status(401).json({ message: "Une erreur s'est produite" });
                } else {
                    if(await result[0] == null) {
                    return res.status(200).json({
                        userId: -1
                    })
                    } else {
                        return res.status(201).json({
                            userId: result[0].id
                        })
                    }
                }  
            })
        }
    })
};

// -------------------------------------- Profil --------------------------------------------------

exports.getProfil = (req, res, next) => {
    let user_Id = req.params.id;
    let userId = parseInt(user_Id);

    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données getProfil");
        }

        let params = [
            userId
        ];

        dbfile.db.query(sqlRequests.sqlGetProfil, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible d'afficher le profil :( " + err });
            };
            res.status(200).json({ result })
        })
    })
};

exports.updateProfilFirstName = (req, res, next) => {
    let user_Id = req.params.id;
    let userId = parseInt(user_Id);
    let firstName = req.body.firstName;

    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données updateFirstName");
        }

        let params = [
            firstName, userId
        ];

        dbfile.db.query(sqlRequests.sqlUpdateProfilFirstName, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de mettre à jour le prénom :( " + err });
            };
            res.status(200).json({ result })
        })
    })
};

exports.updateProfilLastName = (req, res, next) => {
    let user_Id = req.params.id;
    let userId = parseInt(user_Id);
    let lastName = req.body.lastName;

    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données updateLastName");
        }

        let params = [
            lastName, userId
        ];

        dbfile.db.query(sqlRequests.sqlUpdateProfilLastName, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de mettre à jour le nom :( " + err });
            };
            res.status(200).json({ result })
        })
    })
};

exports.updateProfilService = (req, res, next) => {
    let user_Id = req.params.id;
    let userId = parseInt(user_Id);
    let service = req.body.service;

    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données service");
        }

        let params = [
            service, userId
        ];

        dbfile.db.query(sqlRequests.sqlUpdateProfilService, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de mettre à jour le service :( " + err });
            };
            res.status(200).json({ result })
        })
    })
};
exports.updateProfilAvatar = (req, res, next) => {
    let user_Id = req.params.id;
    let userId = parseInt(user_Id);
    let uniqueFileName = req.uniqueFileName;
    let avatar = `${req.protocol}://${req.get("host")}/images/${uniqueFileName}`;

    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données avatar");
        }

        let params = [
            avatar, userId
        ];

        dbfile.db.query(sqlRequests.sqlUpdateProfilAvatar, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de mettre à jour l'avatar :( " + err });
            };
            res.status(200).json({ result })
        })
    })
};

exports.updateProfilPassword = (req, res, next) => {
    let user_Id = req.params.id;
    let userId = parseInt(user_Id);
    let newUserPassword = req.body.password;
    let newhashedPassword = bcrypt.hash(newUserPassword, 10);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données mdp");
        }

        let params = [
            await newhashedPassword, userId
        ];

        dbfile.db.query(sqlRequests.sqlUpdateProfilPassword, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de mettre à jour le mot de passe :( " + err });
            };
            res.status(200).json({ result })
        })
    })
};

exports.deleteProfil = (req, res, next) => {
    let user_Id = req.params.id;
    let userId = parseInt(user_Id);

    dbfile.db.connect(function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données deleteProfil");
        }

        let params = [
            userId
        ];

        dbfile.db.query(sqlRequests.sqlDeleteProfil, params, function (err, result) {
            if (err) {
                return res.status(401).json({ message: "Impossible de supprimer le profil :( " + err });
            };
            res.status(200).json({ result })
        })
    })
};