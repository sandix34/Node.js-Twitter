const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
  username: { type: String, required: true },
  local: {
    email: { type: String, required: true },
    password: { type: String, required: true }
  }
});

// hasher le mot de passe
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
}

// comparer les hash des mots de passe
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password)
}

const User = mongoose.model('user', userSchema);

module.exports = User;