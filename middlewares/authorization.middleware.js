const authorization = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not Authorized.' });
  }

  console.log('authorization.middleware::PASSED');

  next();
};

module.exports = authorization;
