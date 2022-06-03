/*// IMPORT DE CRYPTO-JS
const cryptojs = require("crypto-js");

// IMPORT DES VARIABLES D'ENVIRONNEMENTS
const dotenv = require("dotenv");
dotenv.config();*/

class User {
  constructor(firstname, name, email, password) {
    this.user_firstname = firstname;
    this.user_name = name;
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
