// IMPORT DES PACKAGES
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const dotenv = require("dotenv");
const mysqlconnection = require("../db/db.js");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);

    const userId = decodedToken.user_id;

    if (req.body.user_id && req.body.user_id != userId) {
      throw "Invalid User ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: " Authentification failed ",
      error: error,
    });
  }
};

exports.checkUser = (req, res, next) => {
  const token = res.cookie.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = mysqlconnection.query(
          "SELECT * FROM `user` WHERE `user_id` = ?",
          [decodedToken.user_id],
          (error, results) => {
            if (error) {
              res.json({ error });
            } else {
              res.locals.user = user;
              console.log(user);
              next();
            }
          }
        );
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
