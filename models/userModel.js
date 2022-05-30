/*// IMPORT DE CRYPTO-JS
const cryptojs = require("crypto-js");

// IMPORT DES VARIABLES D'ENVIRONNEMENTS
const dotenv = require("dotenv");
dotenv.config();*/

class User {
  constructor(email, password) {
    this.user_email = email;
    this.user_password = password;
  }

  /*emailCrypt() {
    const cryptedEmail = cryptojs
      .HmacSHA256(this.user_email, `${process.env.EMAILCRYPT}`)
      .toString();
    return cryptedEmail();
  }*/
}

module.exports = User;
