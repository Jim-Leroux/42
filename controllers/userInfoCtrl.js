// IMPORT DU MODEL
const userInfo = require("../models/userInfoModel");

const fs = require("fs");
const mysqlconnection = require("../db/db");
const { log } = require("console");
const { json } = require("express/lib/response");

exports.readAllUserInfo = async (req, res) => {
  try {
    const userInfo = await mysqlconnection.query(
      "SELECT * FROM `userInfo` WHERE ?",
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
exports.readOneUserInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await mysqlconnection.query(
      "SELECT * FROM `userInfo` WHERE `userInfo_id` = ?",
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

exports.updateOneUserInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await mysqlconnection.query(
      "SELECT * FROM userInfo WHERE userInfo_id = ?",
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          if (req.query.user_id == results[0].userInfo_user_id) {
            if (req.file) {
              const filename =
                results[0].userInfo_User_picture.split("/images/")[1];

              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
              });
            }

            const newUserObject = req.file
              ? {
                  ...JSON.parse(req.body.userInfo),
                  userInfo_User_picture: `${req.protocol}://${req.get(
                    "host"
                  )}/images/${req.file.filename}`,
                }
              : { ...JSON.parse(req.body.userInfo) };

            const {
              userInfo_user_id,
              userInfo_user_firstname,
              userInfo_user_name,
              userInfo_user_email,
              userInfo_User_picture,
            } = newUserObject;

            const querySql = req.file
              ? ` UPDATE userInfo SET 
            userInfo_user_firstname = ?,
            userInfo_user_name = ?,
            userInfo_user_email = ?,
            userInfo_User_picture = ?
            WHERE userInfo_id = ? `
              : ` UPDATE userInfo SET 
            userInfo_user_firstname = ?,
            userInfo_user_name = ?,
            userInfo_user_email = ?
            WHERE userInfo_id = ? `;

            const values = req.file
              ? [
                  userInfo_user_firstname,
                  userInfo_user_name,
                  userInfo_user_email,
                  userInfo_User_picture,
                  id,
                ]
              : [
                  userInfo_user_firstname,
                  userInfo_user_name,
                  userInfo_user_email,
                  id,
                ];

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

exports.deleteOneUserInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const userInfo = await mysqlconnection.query(
      "SELECT * FROM userInfo WHERE userInfo_id = ?",
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
