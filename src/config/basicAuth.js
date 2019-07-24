const auth = require('basic-auth');
const compare = require('tsscmp');

// local modules - custom error
const AppError = require('utils/error');

const check = (name, pass) => {
  let valid = true;

  // Simple method to prevent short-circut and use timing-safe compare
  valid = compare(name, process.env.AUTH_USER) && valid;
  valid = compare(pass, process.env.AUTH_PASSWORD) && valid;

  return valid;
};

const authMiddleware = (req, res, next) => {
  const credentials = auth(req);

  if (!credentials || !check(credentials.name, credentials.pass)) {
    return next(new AppError('AuthError', 401, 'Authorization required', true));
  }

  return next();
};


module.exports = authMiddleware;
