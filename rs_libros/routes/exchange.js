const express = require('express');
const router = express.Router();
const exchangeControllers = require('../controllers/exchangeControllers');

router.post('/createExchange', exchangeControllers.createExchange);
router.post('/exchange', exchangeControllers.getAllExchanges);
router.post('/updateExchange/:id', exchangeControllers.updateExchange);
router.post('/deleteExchange/:id', exchangeControllers.deleteExchange);
router.post('/getExchange/:id', exchangeControllers.getExchange);


module.exports = router;