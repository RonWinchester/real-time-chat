import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import { IFields } from "../types";
import { Socket } from "socket.io-client";
interface ISignupPage {
	socket: Socket;
	user: IFields;
	setUser: React.Dispatch<React.SetStateAction<IFields>>;
}

const Signup: FC<ISignupPage> = ({ socket, user, setUser }) => {
	const navigate = useNavigate();

	const { name, room } = user;

	const joinRoom = () => {
		if (room !== "" && name !== "") {
			socket.emit("join", { name, room });
		}

		navigate("/chat", { replace: true });
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target: { name, value },
	}): void => {
		setUser({ ...user, [name]: value });
	};

	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				<h1 className={styles.heading}>Добрейший вечерочек</h1>
				<form className={styles.form}>
					<div className={styles.group}>
						<input
							type="text"
							name="name"
							value={name}
							placeholder="Введите имя"
							className={styles.input}
							onChange={handleChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.group}>
						<input
							type="text"
							name="room"
							value={room}
							placeholder="Введите комнату"
							className={styles.input}
							onChange={handleChange}
							autoComplete="off"
							required
						/>
					</div>
					<div className={styles.group}>
						<button type="submit" className={styles.button} onClick={joinRoom}>
							Присоединиться
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
