// middleware va vérifier le token envoyé par l'appli frontend avec sa requête
// pour vérifier qu'il s'agit d'un token valable
// et que si un user id est envoyé avec la requête, il corresponde bien avec celui encodé dans le token

const jwt = require("jsonwebtoken");
require("dotenv").config();
