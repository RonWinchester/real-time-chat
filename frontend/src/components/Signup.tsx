import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Signup.module.css";
import { IFields } from "../types";


const Signup: FC = () => {
	const [values, setValues] = useState<IFields>({
		name: "",
		room: "",
	});

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target: { name, value },
	}): void => {
		setValues({ ...values, [name]: value });
	};

	const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e): void => {
		const isDisabled = Object.values(values).some((v) => !v);

		if (isDisabled) e.preventDefault();
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
							value={values.name}
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
							value={values.room}
							placeholder="Введите комнату"
							className={styles.input}
							onChange={handleChange}
							autoComplete="off"
							required
						/>
					</div>
					<Link
						className={styles.group}
						to={`/chat?name=${values.name}&room=${values.room}`}
						onClick={handleClick}
					>
						<button type="submit" className={styles.button}>
							Присоединиться
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Signup;
