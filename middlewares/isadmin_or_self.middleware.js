const isAdminOrSelf = async (req, res, next) => {
  const userIdRoute = +req.params.id;
  const userIdRequest = +req.user.id;
  if (req.user.is_admin || userIdRoute === userIdRequest) {
    return next();
  }

  return res.status(401).json({ message: 'forbidden' });
};

module.exports = isAdminOrSelf;
