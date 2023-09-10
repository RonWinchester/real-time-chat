interface IFields {
	name: string;
	room: string;
}

interface IMessage {
	name: string;
	room: string;
	createdTime: Date | string;
	message: string;
}


export type { IFields, IMessage };
