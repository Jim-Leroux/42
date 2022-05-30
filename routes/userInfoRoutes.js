// IMPORT D'EXPRESS
const express = require("express");

// IMPORT DES CONTROLLERS
const userInfoCtrl = require("../controllers/userInfoCtrl");

// IMPORT DU MIDDLEWARE D'AUTHENTIFICATION
const auth = require("../middleware/auth");

// IMPORT DU MIDDLEWARE MULTER
const multer = require("../middleware/multer");

// FONCTION ROUTER
const router = express.Router();

// ENDPOINT
router.post("/", auth, multer, userInfoCtrl.createUserInfo);
router.get("/", auth, multer, userInfoCtrl.readAllUserInfo);
router.get("/:id", auth, multer, userInfoCtrl.readOneUserInfo);
router.put("/:id", auth, multer, userInfoCtrl.updateOneUserInfo);
router.delete("/:id", auth, multer, userInfoCtrl.deleteOneUserInfo);

module.exports = router;
