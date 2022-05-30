// IMPORT DES VARIABLES D'ENVIRONNEMENTS
const dotenv = require("dotenv");
dotenv.config();

// IMPORT DE MYSQL
const mysql = require("mysql");

// PARAMÈTRES DE CONNEXION
const mysqlconnection = mysql.createConnection({
  hoste: "localhost",
  database: "groupomania",
  user: "root",
  password: "password",
});

// CONNEXION A LA BASE DE DONNÉES
mysqlconnection.connect((error) => {
  if (error) {
    console.log(`error: ${error}`);
  } else {
    console.log("Connected to DB !");
    console.log(`Connected as id ${mysqlconnection.threadId}`);
  }
});

module.exports = mysqlconnection;
