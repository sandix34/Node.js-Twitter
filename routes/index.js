// création du router
const router = require("express").Router(); // <--- on appelle directement Router
const tweets = require('./tweets.routes');
const users = require('./users.routes');

router.use("/tweets", tweets);
router.get('/', (req, res) => {
  res.redirect('/tweets');
})

router.use('/users', users);
router.use('./auth', auth);

module.exports = router;
