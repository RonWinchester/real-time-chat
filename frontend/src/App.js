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
    textMessage: [],
  });

  /*   const [loggedIn, setLoggedIn] = React.useState(false); */

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
        api.getUserData(data.roomId).then((res) => {
          console.log(res);
          setAllUsers(res.users)
        }).catch(err=> {
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

  React.useEffect(() => {
    socket.on("user-joined", setAllUsers);
    socket.on("user-esc", setAllUsers);
  }, []);

  return (
    <div className="App">
      {state.loggedIn ? (
        <Chat data={state}></Chat>
      ) : (
        <Login login={login}></Login>
      )}
    </div>
  );
}

export default App;
