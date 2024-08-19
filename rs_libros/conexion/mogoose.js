const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/rs_libros');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('¡Conexión a la base de datos establecida correctamente!');
}); 