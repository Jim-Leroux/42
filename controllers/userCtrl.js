// IMPORT DE BCRYPT
const bcrypt = require("bcrypt");

// IMPORT DES VARIABLES D'ENVIRONNEMENTS
const dotenv = require("dotenv");
dotenv.config();

// IMPORT DE JSONWEBTOKEN
const jwt = require("jsonwebtoken");

const User = require("../models/userModel.js");

// IMPORT CONNEXION MYSQL
const mysqlconnection = require("../db/db.js");
//const { response } = require("express");

// FONCTION SIGN UP
exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  const user = new User(email, password);

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User(email, hash);
      mysqlconnection.query("INSERT INTO user SET ?", user, (error) => {
        if (error) {
          res.json({ error });
        } else {
          res.json({ message: "User created !" });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// FONCTION LOGIN
exports.login = (req, res, next) => {
  const email = req.body.email;

  mysqlconnection.query(
    "SELECT * FROM user WHERE user_email = ? ",
    email,
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        if (results == 0) {
          return res.status(404).json({ error: "User not found !" });
        }

        bcrypt
          .compare(req.body.password, results[0].user_password)
          .then((passwordControl) => {
            if (!passwordControl) {
              return res
                .status(401)
                .json({ error: "Email or password is not valid" });
            }

            const token = jwt.sign(
              { user_id: results[0].user_id },
              `${process.env.JWT_KEY}`,
              { expiresIn: "24h" }
            );
            res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });

            res.status(200).json({
              user_id: results[0].user_id,
              token,
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};

exports.logout = (req, res) => {
  console.log("coucou");
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

// FONCTION DELETE ACCOUNT
exports.deleteOne = (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM `user` WHERE `user_id` = ?";

    mysqlconnection.query(query, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        if (results == 0) {
          return res.status(404).json({ message: "Nothing to delete" });
        }
        if (req.query.user_id == results[0].user_id) {
          const querySql = `DELETE FROM user WHERE user_id = ?`;
          const values = [id];
          mysqlconnection.query(querySql, values, (error) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              res.status(200).json({ message: "User deleted" });
            }
          });
        } else {
          res.status(403).json({ message: "Unauthorized" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
