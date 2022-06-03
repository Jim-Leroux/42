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

const fs = require("fs");

// FONCTION SIGN UP
exports.signup = (req, res, next) => {
  const { firstname, name, email, password } = req.body;

  const user = new User(firstname, name, email, password);

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User(firstname, name, email, hash);
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
          return res
            .status(200)
            .json({ error: "Email or password is not valid" });
        }

        bcrypt
          .compare(req.body.password, results[0].user_password)
          .then((passwordControl) => {
            if (!passwordControl) {
              return res
                .status(200)
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
  res.status(200).json({ message: "disconected" });
};

exports.readAllUser = async (req, res) => {
  try {
    const userInfo = await mysqlconnection.query(
      "SELECT * FROM `user` WHERE ?",
      ["1"],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.readOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await mysqlconnection.query(
      "SELECT * FROM `user` WHERE `user_id` = ?",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await mysqlconnection.query(
      "SELECT * FROM user WHERE user_id = ?",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          if (req.params.id == results[0].user_id) {
            if (req.file) {
              const filename = results[0].user_picture.split("/images/")[1];

              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
              });
            }
            const newUserObject = req.file
              ? {
                  ...JSON.parse(req.body.user),
                  user_picture: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                  }`,
                }
              : { ...JSON.parse(req.body.user) };

            const {
              user_firstname,
              user_name,
              user_email,
              user_password,
              user_picture,
            } = newUserObject;

            const querySql = req.file
              ? ` UPDATE user SET 
            user_firstname = ?,
            user_name = ?,
            user_email = ?,
            user_password = ?,
            user_picture = ?
            WHERE user_id = ? `
              : ` UPDATE user SET 
            user_firstname = ?,
            user_name = ?,
            user_email = ?,
            user_password = ?
            WHERE user_id = ? `;

            const values = req.file
              ? [
                  user_firstname,
                  user_name,
                  user_email,
                  user_password,
                  user_picture,
                  id,
                ]
              : [user_firstname, user_name, user_email, user_password, id];

            mysqlconnection.query(querySql, values, (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(201).json({ message: "User updated", results });
              }
            });
          } else {
            res.status(403).json({ message: "Unauthorized" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.jwtid = (req, res) => {
  const token = req.headers.cookie.split("=")[1];

  if (token) {
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY}`);

    const userId = decodedToken.user_id;

    res.status(200).json(userId);
  } else {
    res.status(500).json({ message: "Error server" });
  }
};

// FONCTION DELETE ACCOUNT
exports.deleteOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await mysqlconnection.query(
      "SELECT * FROM user WHERE user_id = ?",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          console.log(results);
          if (results == 0) {
            return res.status(404).json({ message: "Nothing to delete" });
          }
          if (req.params.id == results[0].user_id) {
            const filename = results[0].user_picture.split("/images/")[1];

            fs.unlink(`images/${filename}`, (error) => {
              if (error) throw error;
            });
            const querySql = `DELETE FROM user WHERE user_id = ?`;
            const values = [id];
            mysqlconnection.query(querySql, values, (error, results) => {
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
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};
