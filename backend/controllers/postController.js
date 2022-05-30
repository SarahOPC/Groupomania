const dbfile = require('../config/db');
const sqlRequests = require('../models/postModels');
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const postObjectText = postObject.text;
    const postObjectUserId = postObject.user_id;
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    const postObjectImage = postObject.imageUrl;
    
    dbfile.db.connect(async function (err) {
        if (err) {
            console.log("Impossible de se connecter à la base de données");
        };
        console.log("Connecté à la base de données");
        
        let params = [
            postObjectText, postObjectImage, postObjectUserId
        ];

        dbfile.db.query(sqlRequests.sqlCreatePost, params, function(err, result) {
            if(err) {
                return res.status(401).json({ message : "Impossible de créer ce post :(" });
            };
            res.status(200).json({ message : "Post créée" })
        })
    })


    /*  Récupérer le contenu de la requête
        Assigner chaque élément à la bonne colonne dans la BDD
        Si image, changer son nom
        Initier les likes et dislikes à 0
        Sauvegarder dans la base de données 
        Afficher le post   
    */

};

exports.updatePost = (req, res, next) => {
    /*
        Récupérer le contenu de la requête
        Est-ce qu'il y a une image ou pas :
        Si oui, changer son nom sinon traitement classique
        Récupérer l'id du post en question
        Supprimer l'ancien contenu
        Ajouter le nouveau contenu
        L'afficher
        Sauvegarder dans la base de données
    */

};

exports.deletePost = (req, res, next) => {
    /*
        Retrouver le bon post grâce à son id
        Vérifier que le post appartient au user ou que user = admin
        Si image, la supprimer en même temps
        Le supprimer de la base de données
    */
};

exports.getAllPosts = (req, res, next) => {
    /*
        Chercher tous les posts et leur contenu (texte, image, user) dans la BDD
        Les afficher
    */

};

exports.getOnePost = (req, res, next) => {
    /*
        Chercher le bon post avec le bon id
        L'afficher
    */

};

exports.ratingPost = (req, res, next) => {
    /*
        Chercher le contenu de la requête
        Vérifier que le post existe (id)
        Mettre à jour le post dans la base de données avec les likes, dislikes, unlikes, undislikes
        L'afficher
    */

};