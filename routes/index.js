// création du router
const router = require("express").Router(); // <--- on appelle directement Router
const api = require("./api");
const Tweet = require("../database/models/tweet.model");

// la création d'un tweet est une API car on envoie de la data et on redirige, on ne retourne pas une page HTML
// connection à l'API
router.use("/api", api);

// définir les routes
router.get("/tweet/new", (req, res) => {
  res.render("tweets/tweet-form");
});

router.get("/", (req, res) => {
  Tweet.find({})
      .exec()
      .then( tweets => res.render("tweets/tweet-list", { tweets }))
})

// exporter le router
module.exports = router;
