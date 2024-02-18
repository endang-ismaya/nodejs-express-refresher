const isAdmin = async (req, res, next) => {
  if (!req.user.is_admin) {
    res.status(401).json({ message: 'forbidden' });
    return;
  }

  next();
};

module.exports = isAdmin;
