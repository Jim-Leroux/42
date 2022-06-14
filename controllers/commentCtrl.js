// IMPORTATION
const comment = require("../models/commentModel");

const fs = require("fs");
const mysqlconnection = require("../db/db");
const { log } = require("console");

exports.createOne = (req, res) => {
  const commentObject = req.body.comment;

  const { comment_user_id, comment_post_id, comment_content } = commentObject;

  const commentData = new comment(
    comment_user_id,
    comment_post_id,
    comment_content
  );
  const values = [comment_user_id, comment_post_id, comment_content];
  try {
    const query =
      "INSERT INTO `comments`(comment_user_id, comment_post_id, comment_content) VALUES (?)";
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
};

exports.readAll = (req, res) => {
  try {
    const query = "SELECT * FROM `comments` WHERE ?";
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
    const query = "SELECT * FROM `comments` WHERE `comment_id` = ?";
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
    const id = req.params.id;

    const query = "SELECT * FROM `comments` WHERE `comment_id` = ?";

    console.log(id);

    mysqlconnection.query(query, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        if (req.query.user_id == results[0].comment_user_id) {
          const newComment = req.body.comment;

          const { comment_content } = newComment;

          const querySql = ` UPDATE comments SET comment_content = ? WHERE comment_id = ? `;

          const values = [comment_content, id];

          mysqlconnection.query(querySql, values, (error) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              res.status(201).json({ message: "Comment updated" });
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
    const query = "SELECT * FROM `comments` WHERE `comment_id` = ?";

    mysqlconnection.query(query, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        if (results == 0) {
          return res.status(404).json({ message: "Nothing to delete" });
        }
        if (req.query.user_id == results[0].comment_user_id) {
          const querySql = `DELETE FROM comments WHERE comment_id = ?`;
          const values = [id];
          mysqlconnection.query(querySql, values, (error) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              res.status(200).json({ message: "comment deleted" });
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
