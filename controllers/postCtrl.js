// IMPORTATION
const post = require("../models/postModel");

const fs = require("fs");
const mysqlconnection = require("../db/db");
const { log } = require("console");

exports.createOne = (req, res) => {
  const userObject = JSON.parse(req.body.post);

  const { post_user_id, post_content, post_imageUrl } = userObject;

  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    const postData = new post(post_user_id, post_content, imageUrl);
    const values = [post_user_id, post_content, imageUrl];
    try {
      const query =
        "INSERT INTO `posts`(post_user_id, post_content, post_imageUrl) VALUES (?)";
      mysqlconnection.query(query, [values], (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(201).json({ results });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    const postData = new post(post_user_id, post_content);
    const values = [post_user_id, post_content];
    try {
      const query =
        "INSERT INTO `posts`(post_user_id, post_content) VALUES (?)";
      mysqlconnection.query(query, [values], (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(201).json({ results });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};

exports.readAll = (req, res) => {
  try {
    const query = "SELECT * FROM `posts` WHERE ?";
    mysqlconnection.query(query, ["1"], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.status(200).json({ results });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.readOne = (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM `posts` WHERE `post_id` = ?";
    mysqlconnection.query(query, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.status(200).json({ results });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateOne = async (req, res) => {
  try {
    // ERREUR : MulterError: Unexpected field
    const id = req.params.id;

    const query = "SELECT * FROM `posts` WHERE `post_id` = ?";

    mysqlconnection.query(query, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        if (req.query.user_id == results[0].post_user_id) {
          if (req.file) {
            const filename = results[0].post_imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, (error) => {
              if (error) throw error;
            });
          }
          const newPost = req.file
            ? {
                ...JSON.parse(req.body.post),
                post_imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`,
              }
            : { ...JSON.parse(req.body.post) };

          const { post_content, post_imageUrl } = newPost;

          const querySql = req.file
            ? ` UPDATE posts SET post_content = ?, post_imageUrl = ? WHERE post_id = ? `
            : ` UPDATE posts SET post_content = ? WHERE post_id = ? `;

          const values = req.file
            ? [post_content, post_imageUrl, id]
            : [post_content, id];

          mysqlconnection.query(querySql, values, (error) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              res.status(201).json({ message: "Post updated" });
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

exports.deleteOne = (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM `posts` WHERE `post_id` = ?";

    mysqlconnection.query(query, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        if (results == 0) {
          return res.status(404).json({ message: "Nothing to delete" });
        }
        if (req.query.user_id == results[0].post_user_id) {
          if (results[0].post_imageUrl != null) {
            const filename = results[0].post_imageUrl.split("/images/")[1];

            fs.unlink(`images/${filename}`, (error) => {
              if (error) throw error;
            });
          }

          const querySql = `DELETE FROM posts WHERE post_id = ?`;
          const values = [id];
          mysqlconnection.query(querySql, values, (error) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              res.status(200).json({ message: "post deleted" });
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
