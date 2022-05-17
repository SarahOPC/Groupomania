// middleware va vérifier le token envoyé par l'appli frontend avec sa requête
// pour vérifier qu'il s'agit d'un token valable
// et que si un user id est envoyé avec la requête, il corresponde bien avec celui encodé dans le token

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        // on récupère le userId alors retrouvé dans l'objet Js récupéré
        const userId = decodedToken.userId;
        // on attribut le userId à l'objet requête
        req.auth = {userId: userId};
        if(req.body.userId && req.body.userId !== userId) {
            throw "403: unauthorized request";
        } else {
            next();
        }

    } catch(error) {
        res.status(401).json({error: error | "Requête non authentifiée"});
    }
};