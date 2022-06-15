const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

router.get('/:id/profil', auth, userControllers.getProfil);
router.put('/:id/profil/firstName', auth, userControllers.updateProfilFirstName);
router.put('/:id/profil/lastName', auth, userControllers.updateProfilLastName);
router.put('/:id/profil/service', auth, userControllers.updateProfilService);
router.put('/:id/profil/avatar', auth, multer, userControllers.updateProfilAvatar);
router.put('/:id/profil/password', auth, userControllers.updateProfilPassword);
router.delete('/:id/profil', auth, userControllers.deleteProfil);


module.exports = router;