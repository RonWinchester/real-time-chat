import React, { FC, useEffect, useState } from "react";
import styles from "../styles/Chat.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { IFields } from "../types";
import { Socket } from "socket.io-client";

import icon from "../images/emoji.svg";
import EmojiPicker from "emoji-picker-react";
interface IChatPage {
	socket: Socket;
	user: IFields;
}

const Chat: FC<IChatPage> = ({ socket, user }) => {
	const navigate = useNavigate();
	const { name, room } = user;

	const { search } = useLocation();

	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [roomUsers, setRoomUsers] = useState<IFields[]>([]);

	useEffect(() => {
		socket.on("chatroom_users", ({data: {users}}) => {
			console.log(users);
			setRoomUsers(users);
		});

		return () => {
			socket.off("chatroom_users");
		};
	}, [socket]);

	const leftRoom = () => {
		socket.emit("leave_room", { name, room });
		navigate("/", { replace: true });
	};

	const handleSubmit = () => {};

	const handleChange = () => {};

	const onEmojiClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<div className={styles.title}>{room}</div>
				<div className={styles.users}>{roomUsers.length} пользователей</div>
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
