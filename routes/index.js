// création du router
const router = require("express").Router(); // <--- on appelle directement Router
const tweets = require("./tweets");

router.use("/tweets", tweets);
router.get('/', (req, res) => {
  res.redirect('/tweets');
})

module.exports = router;
