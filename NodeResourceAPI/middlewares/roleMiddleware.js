exports.checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).send('Permission denied');
      }
      next();
    };
  };
  