// création du router
const router = require("express").Router(); // <--- on appelle directement Router

// définir une route
router.get("/", (req, res) => {
  res.render("tweets/tweet-list");
});

// exporter le router
module.exports = router;
