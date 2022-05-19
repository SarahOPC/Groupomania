const dbfile = require('../config/db');
const sqlRequests = require('../models/userModels');

const bcrypt = require('bcrypt');
// permet de créer des tokens d'identification et de les vérifier
const jwt = require('jsonwebtoken');

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
    let requestUserMail = JSON.stringify(req.body.email);
    let requestUserPassword = JSON.stringify(req.body.password);
    let params = [
        requestUserMail
    ]
    let databasePassword = dbfile.db.query(sqlRequests.sqlFindUserPassword, params).toString();
    console.log(databasePassword);
    let databaseId = dbfile.db.query(sqlRequests.sqlFindUserId, params).toString();
    console.log(databaseId);

    dbfile.db.query(sqlRequests.sqlFindUserMail, params, function (err, result) {
        if(err) {
            return res.status(401).json({ error : "Utilisateur non trouvé"});
        };
        
        bcrypt.compare(requestUserPassword, databasePassword)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({error : "Mot de passe non valide"});
            };
            res.status(200).json({
                userId : databaseId,
                token : jwt.sign(
                    {userId : databaseId},
                    `${process.env.TOKEN}`,
                    {expiresIn: "24h"}
                )
            });
        }).catch(err => { 
            console.log("boom: " + err);
            return res.status(401).json({error : "requestUserPassword=" + requestUserPassword + " databasePassword=" + databasePassword});
        })
    })
};
