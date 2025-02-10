const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');

// Importar rutas
const viewsRoutes = require('./routes/views');

// Inicializar Express y el servidor HTTP
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main', // Usar el layout "main.handlebars"
    layoutsDir: path.join(__dirname, '../views/layouts') // Carpeta de layouts
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/', viewsRoutes);

app.get('/', (req, res) => {
    res.render('home', { title: 'Página de Inicio', year: new Date().getFullYear() });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real', year: new Date().getFullYear() });
});

// Configuración de WebSockets
require('./sockets/products')(io);

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});