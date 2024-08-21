const Exchange = require('../models/exchangeModels');
const User = require('../models/userModel');
const Book = require('../models/bookModels');

// Crear un nuevo intercambio
const createExchange = async (req, res) => {
  try {
    const { owner, book, loanDate, returnDate, returnCondition, title, requester } = req.body;

    // Verificación de campos requeridos
    if (!owner || !book || !loanDate || !returnDate || !title) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Creación del nuevo intercambio
    const newExchange = new Exchange({
      title,
      owner,
      book,
      loanDate,
      returnDate,
      returnCondition,
      requester // Asignación del usuario autenticado como requester
    });

    // Guardado del intercambio en la base de datos
    await newExchange.save();

    // Respuesta exitosa
    res.status(201).json(newExchange);
  } catch (error) {
    // Manejo de errores
    console.error('Error al crear el intercambio:', error); // Imprimir error en el servidor
    res.status(500).json({ message: 'Error al crear el intercambio', error: error.message }); // Proveer mensaje de error
  }
};


// Obtener el perfil del usuario
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los intercambios
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

// Obtener un intercambio por ID
const getExchange = async (req, res) => {
  try {
    const { id } = req.params;
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

// Actualizar un intercambio
const updateExchange = async (req, res) => {
  try {
    const { id } = req.params;
    const { owner, book, loanDate, returnDate, returnCondition, title } = req.body;

    // Validar que todos los campos necesarios están presentes
    if (!owner || !book || !loanDate || !returnDate || !title) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const exchange = await Exchange.findByIdAndUpdate(id, {
      owner,
      book,
      loanDate,
      returnDate,
      returnCondition,
      title
    }, { new: true, runValidators: true });

    if (!exchange) return res.status(404).json({ message: 'Intercambio no encontrado' });
    res.status(200).json(exchange);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un intercambio
const deleteExchange = async (req, res) => {
  try {
    const { id } = req.params;
    const exchange = await Exchange.findByIdAndDelete(id);
    if (!exchange) return res.status(404).json({ message: 'Intercambio no encontrado' });
    res.status(200).json({ message: 'Intercambio eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
