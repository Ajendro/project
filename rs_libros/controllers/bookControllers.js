const Book = require('../models/bookModels');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.createBook = async (req, res) => {
  try {
      const { title, author, isbn, description, owner, available, status, category, publicationDate } = req.body;
      let imageUrl = null;

      if (req.file) {
          imageUrl = req.file.path; // La URL local de la imagen
      }

      // Verificar si el owner es un ObjectId válido y si el usuario existe
      if (!owner) {
          return res.status(400).json({ mensaje: 'ID de usuario no proporcionado' });
      }

      const user = await User.findById(owner);
      if (!user) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      const newBook = new Book({
          title,
          author,
          isbn,
          description,
          owner,
          available: available === 'Sí', // Convertir de 'Sí'/'No' a true/false
          imageUrl,
          status,
          category,
          publicationDate,
      });

      await newBook.save();
      res.status(201).json({ mensaje: 'Libro creado exitosamente', libro: newBook });
  } catch (error) {
      res.status(500).json({ mensaje: 'No se pudo crear el libro: Error interno del servidor', error: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'firstName lastName');
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('owner');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id, title, author, isbn, description, owner, available, status, category, publicationDate } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Validación de campos requeridos
    if (!id) {
      return res.status(400).json({ error: 'El campo ID es requerido para la actualización.' });
    }

    const updateData = {
      title, 
      author, 
      isbn, 
      description, 
      owner,
      available,
      status,
      category,
      publicationDate,
      imageUrl,
    };

    // Elimina campos con valores undefined para no sobrescribir con undefined
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const book = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'El campo ID es requerido para eliminar el libro.' });
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.status(200).json({ message: 'Libro eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
