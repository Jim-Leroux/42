// IMPORT D'EXPRESS
const express = require("express");

// IMPORT DES ROUTES
const userRoutes = require("./routes/userRoutes");
const userInfoRoutes = require("./routes/userInfoRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

// IMPORT DE CONNEXION BASE DE DONNÉES
const mysql = require("./db/db.js");

// IMPORT DE PATH
const path = require("path");

// CRÉATION DE L'APPLICATION EXPRESS
const app = express();

// GESTION DES PROBLÈMES CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// CONVERSION DU BODY EN OBJET JSON
app.use(express.json());

// ROUTE D'AUTHENTIFICATION
app.use("/api/auth", userRoutes);

// ROUTE USER INFO
app.use("/api/userInfo", userInfoRoutes);

// ROUTES POST
app.use("/api/post", postRoutes);

// ROUTES COMMENT
app.use("/api/comment", commentRoutes);

// ACCÈS AUX IMAGES
app.use("/images", express.static(path.join(__dirname, "images")));

// EXPORT DE APP.JS
module.exports = app;
