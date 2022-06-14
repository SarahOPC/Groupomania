const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");

router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

router.get('/:id/profil', userControllers.getProfil);
router.put('/:id/profil/firstName', userControllers.updateProfilFirstName);
router.put('/:id/profil/lastName', userControllers.updateProfilLastName);
router.put('/:id/profil/service', userControllers.updateProfilService);
router.put('/:id/profil/avatar', userControllers.updateProfilAvatar);
router.put('/:id/profil/password', userControllers.updateProfilPassword);
router.delete('/:id/profil', userControllers.deleteProfil);


module.exports = router;