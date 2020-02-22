// récupère le package Express
const express = require("express");
// logger morgan
const morgan = require("morgan");
// path
const path = require("path");
// route index
const index = require("./routes");
// base de donnée
require("./database");
// gestionnaire d'erreurs de développement uniquement
const errorHandler = require("errorhandler");

// création de app à partir de la fonction express
const app = express();
// pour l'utiliser dans config
exports.app = app;
// configuration de la session
require('./config/session.config');

// variable d'environnement PORT ou port par défaut 3000 si pas défini
const port = process.env.PORT || 3000;

// définir le folder pour les vues
app.set("views", path.join(__dirname, "views"));
// spécifier le view engine pour ne pas avoir à taper l'extension à chaque utilisation
app.set("view engine", "pug");

// ----- définir les midelwares -------

// récupérer le logger morgan
app.use(morgan("short"));
// récupérer des statiques
app.use(express.static(path.join(__dirname, "public")));
// récupérer les datas via la méthode POST
app.use(express.json());
// récupérer la data sous un autre format que JSON
app.use(express.urlencoded({ extended: true }));
// point d'entrée des routes
app.use(index);

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    const code = err.code || 500
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message
    })
  })
}

// écouter un port
app.listen(port);