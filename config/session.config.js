const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const dotenv = require ('dotenv'); 
dotenv.config ();
const secret = process.env.SESSION_SECRET

app.use(session({
  secret: secret,
  // ne pas sauvegarder la session dans le store
  resave: false,
  // ne pas sauvegarder les sessions vides dans le store
  saveUninitialized: false,
  cookie: {
    // cookie disponible côté navigateur
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 14 // 14 jours
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    // ttl = maxAge
    ttl: 60 *60 * 24 * 14
  })
}));