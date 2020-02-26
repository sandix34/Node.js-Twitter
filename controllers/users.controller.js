const { createUser, findUserPerUsername, searchUsersPerUsername } = require('../queries/users.queries');
const { getUserTweetsFromAuthorId } = require('../queries/tweets.queries');
const path = require("path");
const multer  = require('multer')
// configuration de multer
const upload = multer({ storage: multer.diskStorage({ // sauvegarderles images sur le disque du serveur
  destination: (req, file, cb) => {
    cb(null, path.join( __dirname, '../public/images/avatars')) // dossier où stocker les images
  },
  filename: (req, file, cb) => {
    cb(null, `${ Date.now() }-${ file.originalname }`); // nom de fichier unique
  }
}) })


exports.userList = async (req, res, next) => {
  try {
    const search = req.query.search;
    const users = await searchUsersPerUsername(search);
    res.render('includes/search-menu', { users });
  } catch(e) {
    next(e);
  }
}

// récupérer tous les tweets d'un utilisateur en utilisant son usernam
exports.userProfile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findUserPerUsername(username);
    const tweets = await getUserTweetsFromAuthorId(user._id);
    res.render('tweets/tweet', { 
      tweets, 
      isAuthenticated: req.isAuthenticated(), 
      currentUser: req.user, 
      user, 
      editable: false 
    });
  } catch(e) {
    next(e);
  }
}

// permet d'envoyer le formulaire d'inscription à l'utilisateur
exports.signupForm = (req, res, next) => {
  res.render('users/user-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}

// permet de créer un nouvel utilisateur dans la base de donnée
exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect('/');
  } catch(e) {
    res.render('users/user-form', { errors: [ e.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
}

exports.uploadImage = [ 
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      // enregistrer l'image sur l'utilisateur en utilisant une propriété avatar
      const user = req.user;
      user.avatar = `/images/avatars/${ req.file.filename }`;
      await user.save();
      res.redirect('/');
    } catch(e) {
      next(e);
    }
  }
]
