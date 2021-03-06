// IMPORT D'EXPRESS
const express = require("express");

// IMPORT DE CORS
const cors = require("cors");

// IMPORT DE DOTENV
const dotenv = require("dotenv").config({ path: "./.env" });

// IMPORT DES ROUTES
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

// IMPORT DE CONNEXION BASE DE DONNÉES
const mysql = require("./db/db.js");

// IMPORT DE PATH
const path = require("path");

// CRÉATION DE L'APPLICATION EXPRESS
const app = express();

// GESTION DES PROBLÈMES CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// CONVERSION DU BODY EN OBJET JSON
app.use(express.json());

// ROUTE D'AUTHENTIFICATION
app.use("/api/auth", userRoutes);

// ROUTES POST
app.use("/api/post", postRoutes);

// ROUTES COMMENT
app.use("/api/comment", commentRoutes);

// ACCÈS AUX IMAGES
app.use("/images", express.static(path.join(__dirname, "images")));

// EXPORT DE APP.JS
module.exports = app;
