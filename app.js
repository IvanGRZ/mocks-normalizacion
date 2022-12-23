import express from "express";
import dotenv from 'dotenv'
import { createServer } from 'http';
import { Server } from "socket.io";
import router from './src/routes/index.js'

dotenv.config();

const app = express();
const http = new createServer(app);
const io = new Server(http);
const PORT = process.env.SERVER_PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);
app.use(express.static('./public'));
app.use(express.static('./public/fakers'));




http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));


const products = []
const messages = []
const fakeProducts = []

io.on('connection', (socket) => {

    socket.emit('UPDATE_DATA', messages);
    socket.emit('PRODUCT', products);
    socket.emit('UPDATEFAKEPRODUCT', fakeProducts);


    socket.on('NEW_MESSAGE_TO_SERVER', data => {
        messages.push(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data);
    });

    socket.on('NEW_PRODUCT', data => {
        products.push(data)
        io.sockets.emit('PRODUCT', products)
    });

    socket.on('FAKEPRODUCT', data => {
        fakeProducts.push(...data)
        io.sockets.emit('UPDATEFAKEPRODUCT', fakeProducts)
    });
})

export default app;