const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/createUser', userController.createUser);
router.post('/users', userController.getAllUsers);
router.post('/updateUser/:id', userController.updateUser);
router.post('/deleteuser/:id', userController.deleteUser);
router.post('/getUsers/:id', userController.getUser);

module.exports=router;