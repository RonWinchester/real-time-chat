import React, { FC, useEffect, useState } from "react";
import styles from "../styles/Chat.module.css";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { IFields } from "../types";

import icon from "../images/emoji.svg";
import EmojiPicker from "emoji-picker-react";
const socket = io("http://localhost:5000");

const Chat: FC = () => {
	const { search } = useLocation();
	const initialParams: IFields = {
		name: "",
		room: "",
	};
	const [roomParams, setRoomParams] = useState<IFields>(initialParams);
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("")
	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setRoomParams({ name: searchParams.name, room: searchParams.room });
		socket.emit("join", searchParams);
	}, [search]);

	useEffect(() => {
		socket.on("message", ({ data }) => {
			console.log("data", data);
		});
	}, []);

	const leftRoom = () => {};

	const handleSubmit = () => {};

	const handleChange = () => {};

	const onEmojiClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<div className={styles.title}>{roomParams.room}</div>
				<div className={styles.users}>0 users in this room</div>
				<button className={styles.left} onClick={leftRoom}>
					Left the room
				</button>
			</div>

			<div className={styles.messages}>
				{/* <Messages messages={state} name={params.name} /> */}
			</div>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.input}>
					<input
						type="text"
						name="message"
						placeholder="What do you want to say?"
						value={message}
						onChange={handleChange}
						autoComplete="off"
						required
					/>
				</div>
				<div className={styles.emoji}>
					<img src={icon} alt="" onClick={() => setIsOpen(!isOpen)} />

					{isOpen && (
						<div className={styles.emojies}>
							<EmojiPicker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div>

				<div className={styles.button}>
					<input type="submit" onSubmit={handleSubmit} value="Отправить" />
				</div>
			</form>
		</div>
	);
};

export default Chat;
