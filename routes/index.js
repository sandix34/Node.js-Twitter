// création du router
const router = require("express").Router(); // <--- on appelle directement Router
const api = require("./api");
const Tweet = require("../database/models/tweet.model");

// connecter l'api
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
