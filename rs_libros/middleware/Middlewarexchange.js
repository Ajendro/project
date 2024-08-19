const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  console.log('Token recibido:', token);

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    console.log('Usuario autenticado:', req.user.username);
    next();
  } catch (err) {
    console.error('Error en la autenticación:', err);
    res.status(403).json({ error: 'Token inválido' });
  }
};
