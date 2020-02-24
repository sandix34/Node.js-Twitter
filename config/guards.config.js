
// vérifie que l'utilisateur est bien connecté
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/signin/form');
  }
}