const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Asegúrate de que la ruta sea correcta para tu modelo de Usuario
const { createAuthentication, getAllAuthentications, getAuthenticationById, updateAuthentication, deleteAuthentication } = require('../controllers/authenControllers');

const router = express.Router(); // Aquí defines el router

// Rutas
router.post('/createAuth', createAuthentication);
router.post('/auth', getAllAuthentications);
router.post('/getAuth/:id', getAuthenticationById);
router.post('/updateAuth/:id', updateAuthentication);
router.post('/deleteAuth/:id', deleteAuthentication);

// Ruta de autenticación personalizada
router.post('/createAuth', async (req, res) => {
    const { correo, contrasenia } = req.body;

    try {
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            'secretKey', // Cambia 'secretKey' por tu propia clave secreta
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router; // Exporta el router para que pueda ser usado en app.js
