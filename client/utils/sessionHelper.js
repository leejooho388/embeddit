// var isLoggedIn = function(req) {
//   return req.session ? !!req.session.user : false;
// };

// exports.checkUser = (req, res, next) => {
//   if (!isLoggedIn(req)) {
//     req.session.error = 'You must be logged in to use this feature';
//     res.status(401).end();
//   } else {
//     next();
//   }
// };

// exports.createSession = (req, res, newUser) => {
//   return req.session.regenerate(() => {
//     req.session.user = newUser;
//     res.redirect('/');
//   });
// };

// exports.logOut = (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/');
//   });
// };