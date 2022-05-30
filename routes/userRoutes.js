// IMPORT D'EXPRESS
const express = require("express");

// IMPORT DU MIDDLEWARE D'AUTHENTIFICATION
const auth = require("../middleware/auth");

// IMPORT DES MIDDLEWARES
//const password = require("../middleware/password");

//const controleEmail = require("../middleware/controleEmail");

// IMPORT DU CONTROLLER USER.JS
const userCtrl = require("../controllers/userCtrl");

const { sign } = require("jsonwebtoken");

// IMPORT DU ROUTER()
const router = express.Router();

// ENDPOINT

router.post("/signup", userCtrl.signup);

router.post("/login", userCtrl.login);

router.delete("/delete/:id", auth, userCtrl.deleteOne);

// EXPORT DU MODULE
module.exports = router;
