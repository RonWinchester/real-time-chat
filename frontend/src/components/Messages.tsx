import React, { FC, useEffect, useState, useRef, useMemo } from "react";
import { Socket } from "socket.io-client";
import styles from "../styles/Messages.module.css";
import { IMessage } from "../types";

interface IMessageComponent {
	socket: Socket;
	user: string;
}

const Messages: FC<IMessageComponent> = ({ socket, user }) => {
	const [messagesRecieved, setMessagesReceived] = useState<IMessage[]>([]);

	const messagesColumnRef = useRef<HTMLDivElement | null>(null);

	function sortMessagesByDate(messages: IMessage[]) {
		return messages.sort((a, b) => {
			if (
				typeof a.createdTime === "string" &&
				typeof b.createdTime === "string"
			) {
				return parseInt(a.createdTime) - parseInt(b.createdTime);
			}
			return 0;
		});
	}

	useEffect(() => {
		socket.on(
			"receive_message",
			({ message, name, room, createdTime }: IMessage) => {
				setMessagesReceived((prevState) => [
					...prevState,
					{ message, name, room, createdTime },
				]);
			}
		);
		return () => {
			socket.off("receive_message");
		};
	}, [socket, messagesRecieved]);

	useEffect(() => {
		socket.on("all_messages", (allMessages) => {
			if (allMessages.length > 0) {
				allMessages = sortMessagesByDate(allMessages);
				setMessagesReceived((state) => [...state, ...allMessages]);
			}
		});

		return () => {
			socket.off("all_messages");
		};
	}, [socket]);

	useEffect(() => {
		if (messagesColumnRef.current !== null) {
			messagesColumnRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	}, [messagesRecieved]);

	function formatDateFromTimestamp(timestamp: string | number | Date) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	// Рендер сообщений только при изменении
	const messageElements = useMemo(() => {
		return messagesRecieved.map(({ name, message, createdTime }, i) => {
			const currentUser = name.trim().toLowerCase() === user.trim().toLowerCase();
			const className = currentUser ? styles.currentUser : styles.user;

			return (
				<div key={i} className={`${styles.message} ${className}`}>
					<span className={styles.user}>{name}</span>
					<div className={styles.text}>{message}</div>
					<span className={styles.user}>
						{formatDateFromTimestamp(createdTime)}
					</span>
				</div>
			);
		});
	}, [messagesRecieved, user]);

	return (
		<div className={styles.messages} ref={messagesColumnRef}>
			{messagesRecieved.length > 0 && messageElements}
		</div>
	);
};

export default Messages;
