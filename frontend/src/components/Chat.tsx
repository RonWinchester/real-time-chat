import React, { FC, useEffect, useState } from "react";
import styles from "../styles/Chat.module.css";
import { useNavigate } from "react-router-dom";
import { IFields } from "../types";
import { Socket } from "socket.io-client";

import icon from "../images/emoji.svg";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Messages from "./Messages";
interface IChatPage {
	socket: Socket;
	user: IFields;
}

const Chat: FC<IChatPage> = ({ socket, user }) => {
	const navigate = useNavigate();
	const { name, room } = user;

	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [roomUsers, setRoomUsers] = useState<IFields[]>([]);

	useEffect(() => {
		socket.on("chatroom_users", ({ data: { users } }) => {
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

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (message !== "") {
			socket.emit("send_message", {
				message: message,
				name: user.name,
				room: user.room,
				createdTime: new Date(),
			});
			setMessage("");
		}
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target: { value },
	}) => setMessage(value);

	const onEmojiClick = (emojiData: EmojiClickData) => {
		setIsOpen(!isOpen);
		setMessage(message + emojiData.emoji);
	};

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<div className={styles.title}>{room}</div>
				<div className={styles.users}>{roomUsers.length} участников</div>
				<button className={styles.left} onClick={leftRoom}>
					Выйти
				</button>
			</div>

			<div className={styles.messages}>
				<Messages socket={socket} user={name} />
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
					<input type="submit" value="Отправить" />
				</div>
			</form>
		</div>
	);
};

export default Chat;
