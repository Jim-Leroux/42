// IMPORT DU PACKAGE HTTP DE NODE.JS
const http = require("http");

// IMPORT DES VARIABLES D'ENVIRONNEMENTS
const dotenv = require("dotenv");
dotenv.config();

// IMPORT DE L'APPLICATION APP.JS
const app = require("./app");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// PARAMÈTRAGE DU PORT AVEC LA MÉTHODE SET DE EXPRESS
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

// GESTION DES ERREURS
const errorHandler = (error) => {
  // MÉTHODE SYSCALL NODE.JS
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// LA MÉTHODE createServer() PREND EN ARGUMENT
// LA FONCTION EST APPELÉ À CHAQUE REQUÊTE REÇU PAR LE SERVEUR
// LES FONCTIONS SONT DANS L'APP.JS
const server = http.createServer(app);

// EN CAS D'ERREUR REDIRIGE SUR errorHandler
// SINON ON PASSE EN LISTENING
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// LE SERVEUR ÉCOUTE LES REQUÊTES SUR LE PORT
server.listen(port);
