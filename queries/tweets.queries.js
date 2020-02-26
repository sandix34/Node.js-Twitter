const Tweet = require('../database/models/tweet.model');

exports.getTweets = () => {
  return Tweet.find({}).exec();
}

exports.createTweet = (tweet) => {
  const newTweet = new Tweet(tweet);
  return newTweet.save();
}

exports.deleteTweet = (tweetId) => {
  return Tweet.findByIdAndDelete(tweetId).exec();
}

exports.getTweet = (tweetId) => {
  return Tweet.findOne({_id: tweetId}).exec();
}

exports.updateTweet = (tweetId, tweet) => {
  return Tweet.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true });
}

// chercher tous les tweets dont les auteurs on pour _id l'un de ceux contenus dans le tableau
// passer dans le tableau tous les _id des utilisateurs suivis par l'utilisateur courant ainsi que son _id
exports.getCurrentUserTweetsWithFollowing = (user) => {
  return Tweet.find({ author: { $in: [ ...user.following, user._id ] }}).populate('author').exec();
}

// chercher tous les tweets ayant pour auteur l'utilisateur dont l'_id est passé en argument
exports.getUserTweetsFormAuthorId = (authorId) => {
  return Tweet.find({ author: authorId }).populate('author').exec();
}