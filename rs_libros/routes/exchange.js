const express = require('express');
const router = express.Router();
const exchangeControllers = require('../controllers/exchangeControllers');
const authenticateToken = require('../middleware/Middlewarexchange');

// Middleware para verificar la autenticación
router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

// Ruta para crear un intercambio
router.post('/createExchange', authenticateToken, (req, res, next) => {
  console.log('POST /createExchange route hit');
  exchangeControllers.createExchange(req, res, next);
});

// Ruta para obtener todos los intercambios
router.post('/exchange', (req, res, next) => {
  console.log('POST /exchange route hit');
  exchangeControllers.getAllExchanges(req, res, next);
});

// Ruta para actualizar un intercambio
router.post('/updateExchange/:id', (req, res, next) => {
  console.log('POST /updateExchange/:id route hit');
  exchangeControllers.updateExchange(req, res, next);
});

// Ruta para eliminar un intercambio
router.post('/deleteExchange/:id', (req, res, next) => {
  console.log('POST /deleteExchange/:id route hit');
  exchangeControllers.deleteExchange(req, res, next);
});

// Ruta para obtener un intercambio por ID
router.post('/getExchange/:id', (req, res, next) => {
  console.log('POST /getExchange/:id route hit');
  exchangeControllers.getExchange(req, res, next);
});

// Ruta para obtener el perfil del usuario
router.post('/me', authenticateToken, (req, res, next) => {
  console.log('POST /me route hit');
  exchangeControllers.getUserProfile(req, res, next);
});

router.post('/createExchange', authenticateToken, exchangeControllers.createExchange);
router.post('/exchange', exchangeControllers.getAllExchanges);
router.post('/updateExchange/:id', exchangeControllers.updateExchange);
router.post('/deleteExchange/:id', exchangeControllers.deleteExchange);
router.post('/getExchange/:id', exchangeControllers.getExchange);

router.post('/me', authenticateToken, exchangeControllers.getUserProfile);

module.exports = router;