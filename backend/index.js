const express = require("express");
const io = require("socket.io");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
/* const cors = require('cors'); */
const PORT = 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/chats');

/* app.use(cors()) */
app.get("/", (req, res) => {res.send('Сервер запущен!')});

app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`));
