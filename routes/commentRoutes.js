// IMPORT D'EXPRESS
const express = require("express");

// IMPORT DES CONTROLLERS
const commentCtrl = require("../controllers/commentCtrl");

// IMPORT DU MIDDLEWARE D'AUTHENTIFICATION
const auth = require("../middleware/auth");

// FONCTION ROUTER
const router = express.Router();

// ENDPOINT

router.post("/", auth.auth, commentCtrl.createOne);
router.get("/", auth.auth, commentCtrl.readAll);
router.get("/:id", auth.auth, commentCtrl.readOne);
router.put("/:id", auth.auth, commentCtrl.updateOne);
router.delete("/:id", auth.auth, commentCtrl.deleteOne);
//router.post("/:id/like", auth, like.likeUserInfo);

module.exports = router;
