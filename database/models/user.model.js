const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  avatar: { type: String, default: '/images/default-profile.svg' },
  // following est u tableau contenant les _id des utilisateurs suivis
  following: { type: [schema.Types.ObjectId], ref: 'user' }
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