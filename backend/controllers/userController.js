const dbfile = require('../config/db');

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
        console.log("Connected!");

        const sqlInsertUser = `INSERT INTO users (mail, password) VALUES ('${requestUserMail}', '${await hashedPassword}')`;
        dbfile.db.query(sqlInsertUser, function (err, result) {
            if (err) {
                console.log("Utilisateur déjà existant");
            };
                //{throw err(res.status(400).json({err}))};
            res.status(201).json({message : "Utilisateur créé"})});
            
    });
};







/* exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(401).json({ error : "Utilisateur non trouvé"});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error : "Mot de Passe non valide"});
                }
                res.status(200).json({
                    // si comparaison est bonne, on valide la connexion et on renvoit un id et un token
                    userId: user._id,
                    token: jwt.sign(
                        // les données à encoder ie le payload
                        {userId: user._id}, // pour être sur que la requête corresponde à ce user id
                        // clé secrète pour l'encodage
                        `${process.env.TOKEN}`,
                        // durée de validité du token
                        {expiresIn: "24h"}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));

};
 */
