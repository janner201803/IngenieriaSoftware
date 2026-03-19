const authorize = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    if (!rolesPermitidos.includes(req.session.user.rol)) {
      return res.status(403).json({ error: 'No tienes permisos' });
    }
    next();
  };
};

module.exports = authorize;