// IMPORT D'EXPRESS
const express = require("express");

// IMPORT DES CONTROLLERS
const postCtrl = require("../controllers/postCtrl");

// IMPORT DU MIDDLEWARE D'AUTHENTIFICATION
const auth = require("../middleware/auth");

// IMPORT DU MIDDLEWARE MULTER
const multer = require("../middleware/multer");

// FONCTION ROUTER
const router = express.Router();

// ENDPOINT

router.post("/", auth.auth, multer, postCtrl.createOne);
router.get("/", multer, postCtrl.readAll);
router.get("/:id", auth.auth, multer, postCtrl.readOne);
router.put("/:id", auth.auth, multer, postCtrl.updateOne);
router.delete("/:id", auth.auth, multer, postCtrl.deleteOne);
//router.post("/:id/like", auth.auth, like.likeUserInfo);

module.exports = router;
