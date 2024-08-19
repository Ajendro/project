const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers')
const upload = require('../config/multer'); 

router.post('/createBook', upload.single('image'), bookControllers.createBook);
router.post('/getAllbook', bookControllers.getAllBooks);
router.post('/updateBooks/:id', upload.single('image'), bookControllers.updateBook);
router.post('/deleteBook/:id', bookControllers.deleteBook);
router.post('/getOnebook/:id', bookControllers.getBook);

module.exports=router; 

