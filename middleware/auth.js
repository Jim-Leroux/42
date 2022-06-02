// IMPORT DES PACKAGES
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

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
  const token = req.cookie.jwt;
};
