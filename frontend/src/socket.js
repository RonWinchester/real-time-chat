import io from "socket.io-client";

export const connectionSocket = () => {
    io('http://localhost:5000');
  }


