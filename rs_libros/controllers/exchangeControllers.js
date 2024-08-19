// En controllers/exchangeControllers.js
const Exchange = require('../models/exchangeModels');
const User = require('../models/userModel');
const Book = require('../models/bookModels');

const createExchange = async (req, res) => {
  try {
    const { title, owner, loanDate, returnDate } = req.body;

    // Verificación de campos requeridos
    if (!title || !owner || !loanDate || !returnDate) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Creación del nuevo intercambio
    const newExchange = new Exchange({
      title,
      owner,
      loanDate,
      returnDate,
      requester: req.user._id, // Asignación del usuario autenticado como requester
    });

    // Guardado del intercambio en la base de datos
    await newExchange.save();

    // Respuesta exitosa
    res.status(201).json(newExchange);
  } catch (error) {
    // Manejo de errores
    console.error('Error al crear el intercambio:', error);
    res.status(500).json({ message: 'Error al crear el intercambio', error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find()
      .populate('requester', 'username')
      .populate('owner', 'username')
      .populate('book', 'title');
    res.status(200).json(exchanges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExchange = async (req, res) => {
  try {
    const { id } = req.params; // Cambiar de req.body a req.params
    const exchange = await Exchange.findById(id)
      .populate('requester', 'username')
      .populate('owner', 'username')
      .populate('book', 'title');
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExchange = async (req, res) => {
  try {
    const { id } = req.params; // Cambiar de req.body a req.params
    const { requester, owner, book } = req.body;

    // Validar que todos los campos necesarios están presentes
    if (!requester || !owner || !book) {
      return res.status(400).json({ error: 'Requester, owner, and book fields are required.' });
    }

    const exchange = await Exchange.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExchange = async (req, res) => {
  try {
    const { id } = req.params; // Cambiar de req.body a req.params
    const exchange = await Exchange.findByIdAndDelete(id);
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json({ message: 'Exchange deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createExchange,
  getUserProfile,
  getAllExchanges,
  getExchange,
  updateExchange,
  deleteExchange
};
