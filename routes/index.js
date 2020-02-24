// création du router
const router = require("express").Router(); // <--- on appelle directement Router
const tweets = require('./tweets.routes');
const users = require('./users.routes');
const auth = require('./auth.routes');
const { ensureAuthenticated } = require('../config/guards.config');

router.use("/tweets", ensureAuthenticated, tweets);
router.use('/users', users);
router.use('/auth', auth);

router.get('/', (req, res) => {
  res.redirect('/tweets');
})


module.exports = router;
