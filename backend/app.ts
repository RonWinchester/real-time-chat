import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import router from "./route";
import User, { UserType } from "./models/user";
import Messages, { IMessage } from "./models/messages";

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
const messagesInstance = new Messages();

io.on("connection", (socket) => {
	socket.on("join", (res: { name: string; room: string }) => {
		socket.join(res.room);
		const { user } = userInstance.addUser({
			name: res.name.trim().toLowerCase(),
			room: res.room.trim().toLowerCase(),
		});

		socket.to(user.room).emit("receive_message", {
			message: `${user.name} has joined the chat room`,
			name: "CHAT_BOT",
		});

		socket.emit("receive_message", {
			message: `Welcome ${user.name}`,
			name: "CHAT_BOT",
		});
		const allMessages = messagesInstance.getMessages(user.room);
		socket.emit("all_messages", allMessages);

		socket.to(user.room).emit("chatroom_users", {
			data: { users: userInstance.getRoomUsers(user.room) },
		});
		socket.emit("chatroom_users", {
			data: { users: userInstance.getRoomUsers(user.room) },
		});
	});

	socket.on("send_message", (data: IMessage) => {
		const { message, name, room, createdTime } = data;
		messagesInstance.setMessages(data);
		console.log("data", data)
		io.in(room).emit("receive_message", { message, name, room, createdTime });
	});

	socket.on("leave_room", ({ name, room }) => {
		const user = userInstance.removeUser({ name, room });
		socket.leave(room);
		if (user) {
			const { room, name } = user;

			io.to(room).emit("receive_message", {
				name: "CHAT_BOT",
				message: `${name} покинул комнату`,
			});

			io.to(room).emit("chatroom_users", {
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
