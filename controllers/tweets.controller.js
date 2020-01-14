const { getTweets, createTweet, deleteTweet } = require('../queries/tweets.queries');

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets();
    res.render("tweets/tweet", { tweets });
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
    await createTweet(body);
    res.redirect('/tweets')
  } catch(e) {
    // mofifie l'objet Mongoose pour obtenir un tableau et pourvoir itérer dans le template
    const errors = Object.keys(e.errors).map( key => e.errors[key].message );
    // réaffiche twweet-form en passant le tableau d'erreurs
    res.status(400).render('tweets/tweet-form', { errors });
  }
}

exports.tweetDelete = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    await deleteTweet(tweetId);
    const tweets = await getTweets();
    res.render('tweets/tweet-list', { tweets })
  } catch(e) {
    next(e);
  }
}