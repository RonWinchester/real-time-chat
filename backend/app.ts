import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import router from "./route";
import User from "./user";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: process.env.DOMAIN }));
app.use(router);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: process.env.DOMAIN,
		methods: ["GET", "POST"],
	},
});
const userInstance = new User();

io.on("connection", (socket) => {

	socket.on("join", (res: {name: string, room: string}) => {
		socket.join(res.room);
		const { user } = userInstance.addUser({
			name: res.name.trim().toLowerCase(),
			room: res.room.trim().toLowerCase(),
		});

		const userMessage = `${user.name}, добро пожаловать!`;

		socket.emit("message", {
			data: { user: { name: "Admin" }, message: userMessage },
		});

		socket.broadcast.to(user.room).emit("message", {
			data: { user: { name: "Admin" }, message: `${user.name} присоединился` },
		});

		socket.to(user.room).emit("chatroom_users", {
			data: { users: userInstance.getRoomUsers(user.room) },
		});
		socket.emit('chatroom_users', {
			data: { users: userInstance.getRoomUsers(user.room) },
		});
	});

	socket.on("sendMessage", ({ message, params }) => {
		const user = userInstance.findUser(params);

		if (user) {
			io.to(user.room).emit("message", { data: { user, message } });
		}
	});

	socket.on("leave_room", ({ name, room }) => {
		const user = userInstance.removeUser({name, room});

		if (user) {
			const { room, name } = user;

			io.to(room).emit("message", {
				data: { user: { name: "Admin" }, message: `${name} покинул комнату` },
			});

			io.to(room).emit("room", {
				data: { users: userInstance.getRoomUsers(room) },
			});
		}
	});

	io.on("disconnect", () => {
		console.log("Disconnect");
	});
});

server.listen(PORT, () => {
	console.log("Сервер запущен!");
});
