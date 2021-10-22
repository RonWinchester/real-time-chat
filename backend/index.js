const express = require("express");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const server = require("http").Server(app);
const useSocketIo = require("socket.io");
app.use(cors());
app.options("*", cors());

const PORT = 5000;
const io = useSocketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cookieParser());
app.use(express.json());

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/chats");

const rooms = new Map();

app.get("/:id", (req, res) => {
  const { id: roomId } = req.params;
  /* Проверка на наличие комнаты */
  const obj = rooms.has(roomId)
  ? {
      users: [...rooms.get(roomId).get('users').values()],
      messages: [...rooms.get(roomId).get('messages').values()],
    }
  : { users: [], messages: [] };
res.json(obj);
});

app.post('/', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  res.send(roomId);
});

io.on("connection", (socket) => {
  socket.on("user-join", ({roomId, userName}) => {
    /* Подключаемся по определенному запросу */
    socket.join(roomId); /* Заходим только в нужную комнату */
    /* Нашли нужную комнату,  нашли и записали в ней пользователей, */
    rooms.get(roomId).get("users").set(socket.id, userName);
    /* Получили всех пользователей */
    const users = [...rooms.get(roomId).get("users").values()];
    /* Оповестили пользователей о входе */
    socket.to(roomId).emit("user-joined", users);
  });

  socket.on('users-message', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    console.log(roomId)
    rooms.get(roomId).get('messages').push(obj);
    console.log(roomId)
    socket.to(roomId).emit('users-message', obj);
  });
  

  socket.on('disconnect', ()=> {
    /* Удаляем пользователя */
    rooms.forEach((value, roomId)=> {
      if(value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get("users").values()];
        socket.to(roomId).emit("user-esc", users);
      }
    })
  })
  console.log(`Подключено socket: ${socket.id}`);
});

server.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`));
