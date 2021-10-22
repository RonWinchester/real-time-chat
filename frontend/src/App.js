import React from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import { Api } from "../src/utils/Api";
import reducer from "../src/utils/reducer";
import socket from "../src/socket";

function App() {
  const api = new Api({
    adress: "http://localhost:5000/",
  });

  const [state, dispatch] = React.useReducer(reducer, {
    loggedIn: false,
    userName: null,
    roomId: null,
    users: [],
    messages: [],
  });

  function login(userName, roomId) {
    api
      .loginUser(userName, roomId)
      .then((res) => {
        const data = {
          userName,
          roomId,
        };
        dispatch({
          type: "loggedIn",
          payload: data,
        });

        socket.emit("user-join", data);
        api
          .getUserData(data.roomId)
          .then((res) => {
            dispatch({
              type: "old_message",
              payload: res,
            });
          })
          .catch((err) => {
            console.log(`Ошибка при принятии данных : ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Ошибка при отправке данных : ${err}`);
      });
  }

  function setAllUsers(users) {
    dispatch({
      type: "set_users",
      payload: users,
    });
  }

  function addMessage(message) {
    dispatch({
      type: "new_message",
      payload: message,
    });
  }

  React.useEffect(() => {
    socket.on("user-joined", setAllUsers);
    socket.on("user-esc", setAllUsers);
    socket.on("users-message", addMessage);
  }, []);

  return (
    <div className="App">
      {state.loggedIn ? (
        <Chat {...state} addMessage={addMessage}></Chat>
      ) : (
        <Login login={login}></Login>
      )}
    </div>
  );
}

export default App;
