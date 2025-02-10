const express = require('express');
const router = express.Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.render('home', { title: 'Página de Inicio' });
});

// Ruta para la página de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real' });
});

module.exports = router;