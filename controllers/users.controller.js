const { createUser } = require('../queries/users.queries');
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
