const dbfile = require('../config/db');
const sqlRequests = require('../models/userModels');

const bcrypt = require('bcrypt');
// permet de créer des tokens d'identification et de les vérifier
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

exports.signup = (req, res, next) => {
    let requestUserMail = JSON.stringify(req.body.email);
    let requestUserPassword = JSON.stringify(req.body.password);
    let hashedPassword = bcrypt.hash(requestUserPassword, 10);
    
    dbfile.db.connect(async function(err) {
        if(err) {
            console.log("Impossible de se connecter à la base de donnée");
        };
        console.log("Connecté à la base de donnée");

        let params = [
            requestUserMail,
            await hashedPassword];

        dbfile.db.query(sqlRequests.sqlInsertUser, params, function (err, result) {
            if (err) {
                return res.status(401).json({ error : "Utilisateur déjà existant"});
            };
            res.status(201).json({message : "Utilisateur créé"})});
            
    });
};

exports.login = (req, res, next) => {
    let requestUserMail = req.body.email;
    let requestUserPassword = req.body.password;
    let params = [ requestUserMail ];
    
    dbfile.db.connect(async function(err) {
        if(err) {
            console.log("Impossible de se connecter à la base de donnée");
        };
        console.log("Connecté à la base de donnée");

        dbfile.db.query(sqlRequests.sqlFindUserMail, params, function (err, result, fields) {
            if (err) {
                return res.status(401).json({ error : "Utilisateur non existant"});
            };
            res.status(201).json({message : "Utilisateur trouvé " + result[0].password})
        });
    })

    /*
    .findOne({requestUserMail: dbfile.db.query(sqlRequests.sqlFindUserMail, params, function (err, result) {
        if(err) {
            return res.status(401).json({ error : "Utilisateur non trouvé"});
        }
    })})
    .then(user => {
        let databasePassword = dbfile.db.query(sqlRequests.sqlFindUserPassword, params, function (err, result, fields) {
            if (err) {
                return res.status(401).json({ error : "Email non trouvé"});
            }
            console.log(result);
            res.status(200).json({message : fields.password});
        });
    
        let databaseId = dbfile.db.query(sqlRequests.sqlFindUserId, params, function (err, result, fields) {
            if (err) {
                return res.status(401).json({ error : "id non trouvé"});
            };
                console.log(result);
                res.status(200).json({message : fields.id});
        });

        bcrypt.compare(requestUserPassword, user.databasePassword)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error : "Mot de Passe non valide"});
                }
                res.status(200).json({
                    userId: user.databaseId,
                    token: jwt.sign(
                        {userId: user.databaseId},
                        `${process.env.TOKEN}`,
                        {expiresIn: "24h"}
                    )
                });
            })
        })
        .catch(error => res.status(500).json({error}));
        */
};