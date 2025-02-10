let products = [];

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Un cliente se ha conectado');

        // Enviar la lista actual de productos al cliente que se conecta
        socket.emit('updateProducts', products);

        // Escuchar nuevos productos desde el cliente
        socket.on('newProduct', (productName) => {
            if (productName.trim() !== '') {
                products.push(productName); // Agregar el producto a la lista
                io.emit('updateProducts', products); // Notificar a todos los clientes
            }
        });

        // Escuchar desconexión del cliente
        socket.on('disconnect', () => {
            console.log('Un cliente se ha desconectado');
        });
    });
};