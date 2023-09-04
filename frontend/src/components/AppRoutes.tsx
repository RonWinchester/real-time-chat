import React, { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

import Signup from "./Signup";
import Chat from "./Chat";
import { IFields } from "../types";

const socket = io("http://localhost:5000");

const AppRoutes: FC = () => {
	const [user, setUser] = useState<IFields>({
		name: "",
		room: "",
	});

	return (
		<Routes>
			<Route
				path="/"
				element={<Signup socket={socket} user={user} setUser={setUser} />}
			/>
			<Route path="/chat" element={<Chat socket={socket} user={user}/>} />
		</Routes>
	);
};

export default AppRoutes;
