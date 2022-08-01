// Vérification du token envoyé avec la requête /r user

const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        const userId = decodedToken.userId;
        // on attribut le userId à l'objet requête
        req.auth = { userId: userId };
        
        if(!req.params.id) {
            throw "403: Missing user";
        } else {
            paramsId = parseInt(req.params.id);
            // si j'ai un userId dans la requête, je le compare avec celui récupéré du token
            if (paramsId !== userId) { // si j'ai un userId dans la requête et qu'il est différent de celui du token
                throw "403: unauthorized request";
            }

            next(); // sinon, on peut executer les autres middlewares en jeu
        }

    } catch (error) {
        res.status(401).json({ error: "Requête non authentifiée: " + error.message });
    }
};