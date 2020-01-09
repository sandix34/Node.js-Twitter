// récupérer mongoose
const mongoose = require('mongoose');
// récupérer schema directement depuis mongoose 
const schema = mongoose.Schema;

// création du schema
const tweetSchema = schema({
  content: { type: String, maxlength: 140, minlength: 1, required: true }
});
// création du model
const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;