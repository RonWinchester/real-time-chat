const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const server = require("http").Server(app);
const useSocketIo = require("socket.io");

const PORT = 5000;
const io = useSocketIo(server, {
  cors: {
    origin: "*",
  },
});;


app.use(cookieParser());
app.use(express.json());

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/chats");


app.get("/", (req, res) => {
  res.send("Сервер запущен!");
});

io.on("connection", (socket) => {
  console.log(`Подключено socket: ${socket.id}`);
});

server.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`));
