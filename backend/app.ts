import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import router from "./route";

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

app.listen(PORT, () => {
	console.log("Сервер запущен!");
});
