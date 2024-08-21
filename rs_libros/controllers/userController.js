const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { username, correo, contrasenia } = req.body;

    // Verificar si el username o el correo ya existen
    const existingUser = await User.findOne({ $or: [{ username }, { correo }] });
    if (existingUser) {
      return res.status(400).json({ error: 'The username or email already exists, please try another one' });
    }

    // Cifrar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasenia, salt);

    // Crear un nuevo usuario con la contraseña cifrada
    const newUser = new User({
      ...req.body,
      contrasenia: hashedPassword
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por su ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  try {
    const { contrasenia } = req.body;

    if (contrasenia) {
      // Cifrar la nueva contraseña antes de actualizar
      const salt = await bcrypt.genSalt(10);
      req.body.contrasenia = await bcrypt.hash(contrasenia, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
