// IMPORT D'EXPRESS
const express = require("express");

// IMPORT DU MIDDLEWARE MULTER
const multer = require("../middleware/multer");

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

router.get("/logout", userCtrl.logout);

router.get("/", auth.auth, multer, userCtrl.readAllUser);

router.get("/:id", auth.auth, multer, userCtrl.readOneUser);

router.put("/:id", auth.auth, multer, userCtrl.updateOneUser);

router.delete("/:id", auth.auth, multer, userCtrl.deleteOneUser);

router.get("/jwtid", userCtrl.jwtid);

// EXPORT DU MODULE
module.exports = router;
