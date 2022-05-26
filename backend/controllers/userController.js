const dbfile = require('../config/db');
const sqlRequests = require('../models/userModels');

const bcrypt = require('bcrypt');
// permet de créer des tokens d'identification et de les vérifier
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const { db } = require('../../../../Projet6/HotTakes_raguin_sarah/backend/Raguin_Sarah_1_CodeApi_032022/models/sauce');

exports.signup = (req, res, next) => {
    let requestUserMail = JSON.stringify(req.body.email);
    let requestUserPassword = JSON.stringify(req.body.password);
    let hashedPassword = bcrypt.hash(requestUserPassword, 10);

    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de donnée");
        };
        console.log("Connecté à la base de donnée");

        let params = [
            requestUserMail,
            await hashedPassword];

        dbfile.db.query(sqlRequests.sqlInsertUser, params, function (err, result) {
            if (err) {
                return res.status(401).json({ error: "Utilisateur déjà existant" });
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
        if(err) {
            console.log("Impossible de se connecter à la base de données");
        } else {
            console.log("Connecté à la base de données");

            dbfile.db.query(sqlRequests.sqlFindUserMail, params, async function(err, result) {
                if(err) {
                    return res.status(401).json({ error : "Utilisateur non existant"});
                } else {
                    await bcrypt.compare(requestUserPassword, result[0].password)
                    .then(valid => {
                        if(!valid) {
                            res.status(401).json({ message: "Utilisateur trouvé mais mot de passe non valide" });
                        } else {
                            res.status(200).json({
                                userId: result[0].id,
                                token: jwt.sign(
                                    { userId: result[0].id },
                                    `${process.env.TOKEN}`,
                                    { expiresIn: "24h" }
                                )
                            })
                            res.status(200).json({ message: "Utilisateur trouvé et mot de passe valide" });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
                }
            })
        }
    });
}
