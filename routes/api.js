// création du router
const router = require("express").Router(); // <--- on appelle directement Router
// Importer les routes de l' API relatives aux tweets
const tweets = require('./api.tweets');

router.use('/tweets', tweets);

// exporter le router
module.exports = router;