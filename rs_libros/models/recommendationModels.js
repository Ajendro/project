const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  score: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  description: { type: String, required: false }, // Campo de descripción
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
module.exports = Recommendation;