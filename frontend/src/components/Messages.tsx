import React, { FC, useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import styles from "../styles/Messages.module.css";

interface IMessageComponent {
	socket: Socket;
	user: string;
}

interface IReceiveMessage {
	message: string;
	name: string;
}

const Messages: FC<IMessageComponent> = ({ socket, user }) => {
	const [messagesRecieved, setMessagesReceived] = useState<IReceiveMessage[]>(
		[]
	);

	const messagesColumnRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		socket.on("receive_message", ({ message, name }: IReceiveMessage) => {
			setMessagesReceived((state) => [
				...state,
				{
					message,
					name,
				},
			]);
		});

		return () => {
			socket.off("receive_message");
		};
	}, [socket]);

	useEffect(() => {
		if (messagesColumnRef.current !== null) {
			messagesColumnRef.current.scrollTop =
				messagesColumnRef.current.scrollHeight;
		}
	}, [messagesRecieved]);


	return (
		<div className={styles.messages} ref={messagesColumnRef}>
			{messagesRecieved.map(({ name, message }, i) => {
				const itsMe = name.trim().toLowerCase() === user.trim().toLowerCase();
				const className = itsMe ? styles.me : styles.user;

				return (
					<div key={i} className={`${styles.message} ${className}`}>
						<span className={styles.user}>{name}</span>

						<div className={styles.text}>{message}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Messages;
