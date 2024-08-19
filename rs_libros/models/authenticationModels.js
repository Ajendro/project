const mongoose = require('mongoose');


const AutentificacionSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Autentificacion = mongoose.model('Autentificacion', AutentificacionSchema);

module.exports = Autentificacion;