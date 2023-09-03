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

io.on("connection", (socket) => {
	const userInstance = new User();

	socket.on("join", (res) => {
		socket.join(res.room);

		const { user, isExist } = userInstance.addUser({
			name: res.name.trim().toLowerCase(),
			room: res.room.trim().toLowerCase(),
		});

		const userMessage = isExist
			? `${user.name}, с возвращением`
			: `Привет, ${user.name}`;

		socket.emit("message", {
			data: { user: { name: "Admin" }, message: userMessage },
		});

		socket.broadcast.to(user.room).emit("message", {
			data: { user: { name: "Admin" }, message: `${user.name} присоединился` },
		});

		io.to(user.room).emit("room", {
			data: { users: userInstance.getRoomUsers(user.room) },
		});
	});

	socket.on("sendMessage", ({ message, params }) => {
		const user = userInstance.findUser(params);

		if (user) {
			io.to(user.room).emit("message", { data: { user, message } });
		}
	});

	socket.on("leftRoom", ({ params }) => {
		const user = userInstance.removeUser(params);

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
