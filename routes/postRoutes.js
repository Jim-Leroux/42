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

router.post("/", auth, multer, postCtrl.createOne);
router.get("/", multer, postCtrl.readAll);
router.get("/:id", auth, multer, postCtrl.readOne);
router.put("/:id", auth, multer, postCtrl.updateOne);
router.delete("/:id", auth, multer, postCtrl.deleteOne);
//router.post("/:id/like", auth, like.likeUserInfo);

module.exports = router;
