// création du router
const router = require("express").Router(); // <--- on appelle directement Router
// Import du model Mongoose pour pouvoir créer un nouveau Document Mongoose à chaque requête POST sur la route /api/tweets
const Tweet = require('../database/models/tweet.model');

router.post('/', (req, res) => {
  // récupérer le body grâce au midleware urlencoded
  const body = req.body;
  // créer le tweet
  const newTweet = new Tweet(body);
  // save() le Document dans la base de données MongoDB et Mongoose retourne une promesse
  newTweet.save()
          // sauvegarde réussie on redirige
          .then( newTweet => res.redirect('/'))
          .catch( err => {
            // mofifie l'objet Mongoose pour obtenir un tableau et pourvoir itérer dans le template
            const errors = Object.keys(err.errors).map( key => err.errors[key].message );
            // réaffiche twweet-form en passant le tableau d'erreurs
            res.status(400).render('tweets/tweet-form', { errors });
          })
});

// exporter le router
module.exports = router;