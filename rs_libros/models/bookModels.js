const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  isbn: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  available: { type: Boolean, default: true },
  imageUrl: { type: String }, // URL o path de la imagen
  status: { type: String, enum: ['Nuevo', 'Usado', 'Dañado'], required: true }, // Estado del libro
  category: { type: String },
  publicationDate: { type: Date, required: true }, // Fecha de publicación
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
