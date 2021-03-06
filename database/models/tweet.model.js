// récupérer mongoose
const mongoose = require('mongoose');
// récupérer schema directement depuis mongoose 
const schema = mongoose.Schema;

// création du schema
const tweetSchema = schema({
  content: { 
    type: String, 
    maxlength: [140, 'Tweet trop long' ], 
    minlength: [1, 'Tweet trop court'], 
    required: [true, 'Champ requis'] 
  },
  // créer une référence à l'utilisateur autour du tweet
  author: { type: schema.Types.ObjectId, ref: 'user', required: true }
});

// création du model
const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;