const Tweet = require('../database/models/tweet.model');

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await Tweet.find({}).exec();
    res.render("tweets/tweet-list", { tweets });
  } catch(e) {
    next(e);
  }
}

exports.tweetNew = (req, res, next) => {
  res.render("tweets/tweet-form");
}

exports.tweetCreate = async (req, res, next) => {
  try {
    // récupérer le body grâce au midleware urlencoded
    const body = req.body;
    // créer le tweet
    const newTweet = new Tweet(body);
    // save() le Document dans la base de données MongoDB et Mongoose retourne une promesse
    await newTweet.save()
    res.redirect('/')
  } catch(e) {
    // mofifie l'objet Mongoose pour obtenir un tableau et pourvoir itérer dans le template
    const errors = Object.keys(e.errors).map( key => e.errors[key].message );
    // réaffiche twweet-form en passant le tableau d'erreurs
    res.status(400).render('tweets/tweet-form', { errors });
  }
}
