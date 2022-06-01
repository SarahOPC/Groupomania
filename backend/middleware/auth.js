// Vérification du token envoyé avec la requête /r user

const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        console.log(decodedToken);
        // Vérification du token avec la clé secrète
        // Récupération du userId dans l'objet Js récupéré
        const userId = decodedToken.userId;
        // Attribution du userId à l'objet requête
        req.auth = { userId: userId };
        // si userId dans la requête, comparaison avec celui récupéré du token
        if (req.body.user_id && req.body.user_id !== userId) { 
            throw "403: unauthorized request";
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: "Requête non authentifiée : " + error.message });
    }
};
