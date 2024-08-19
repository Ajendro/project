const express = require('express');
const router = express.Router();
const messagesControllers = require('../controllers/messagesControllers')

router.post('/createMessages/', messagesControllers.createMessage);
router.post('/messages', messagesControllers.getAllMessages);
router.post('/updateMessages/:id', messagesControllers.updateMessage);
router.post('/deleteMessages/:id', messagesControllers.deleteMessage);
router.post('/getMessages/:id', messagesControllers.getMessage);

module.exports=router;
