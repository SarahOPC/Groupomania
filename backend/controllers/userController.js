const bcrypt = require('bcrypt');
// permet de créer des tokens d'identification et de les vérifier
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message : "Utilisateur créé"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));

};

exports.login = (req, res, next) => {
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
