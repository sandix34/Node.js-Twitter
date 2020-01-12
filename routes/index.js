// création du router
const router = require("express").Router(); // <--- on appelle directement Router
const api = require('./api');

// connecter l'api
router.use('/api', api);

// définir les routes
router.get("/tweet/new", (req, res) => {
  res.render("tweets/tweet-form");
});

router.get("/", (req, res) => {
  res.render("tweets/tweet-list");
});

// exporter le router
module.exports = router;
