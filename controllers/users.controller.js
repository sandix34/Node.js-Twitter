const { createUser } = require('../queries/users.queries');

// permet d'envoyer le formulaire d'inscription à l'utilisateur
exports.signupForm = (req, res, next) => {
  res.render('users/user-form', { errors: null });
}

// permet de créer un nouvel utilisateur dans la base de donnée
exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect('/');
  } catch(e) {
    res.render('users/user-form', { errors: [ e.message ] });
  }
}