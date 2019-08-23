// création du router
const router = require('express').Router();

// définir une route
router.get('/', (req, res) => {
    res.render('home');
})

// exporter le router
module.exports = router;