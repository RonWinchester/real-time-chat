export interface IMessage {
	name: string;
	room: string;
	createdTime: Date | string;
	message: string;
}

class Messages {
	messages: Array<IMessage>;
	constructor() {
		this.messages = [];
	}

	setMessages(data: IMessage) {
		this.messages.push(data);
	}

	getMessages(room: string): Array<IMessage> {
        console.log("this.messages",room, this.messages)
		return this.messages.filter((m) => m.room === room);
	}
}

export default Messages;
