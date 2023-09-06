export type UserType = {
	name: string;
	room: string;
};

class User {
	users: Array<UserType>;

	constructor() {
		this.users = [];
	}

	public addUser = (user: UserType) => {
		const isExist = this.findUser(user);

		if (!isExist) {
			this.users.push(user);
		}
		const currentUser = isExist || user;

		return { user: currentUser };
	};

	public findUser = (user: UserType): UserType | undefined => {
		return this.users.find((u) => u.name === user.name && u.room === user.room);
	};

	public getRoomUsers = (room: string) =>
		this.users.filter((u) => u.room === room);

	public removeUser = ({ name, room }: UserType) => {
		const user = {
			name,
			room,
		};
		const found = this.findUser(user);

		if (found) {
			this.users = this.users.filter(
				({ room, name }) => room === found.room && name !== found.name
			);
		}

		return found;
	};
}

export default User;
