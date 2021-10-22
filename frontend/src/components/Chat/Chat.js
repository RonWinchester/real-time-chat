import React from "react";
import "./Chat.css";
import socket from "../../socket";

function Chat({ userName, roomId, users, messages, addMessage }) {
  const [texts, setText] = React.useState("");

  function sendMessage(e) {
    setText(e.target.value);
  }

  function onSendMessage(e) {
    e.preventDefault();
    socket.emit("users-message", {
      userName,
      roomId,
      text: texts,
    });
    addMessage({ userName, text: texts });
    setText("");
  }

  const Data = new Date();
  const Hour = Data.getHours();
  const Minutes = Data.getMinutes();

  return (
    <div className="chat">
      <h1 className="chat__title">
        {userName} в комнате {roomId}
      </h1>
      <div className="chat__container">
        <div className="chat-sidebar">
          <h2 className="chat-sidebar__title">
            Пользователей онлайн: {users.length}
          </h2>
          <ul className="chat-sidebar__users">
            {users.map((user, index) => (
              <li className="chat-sidebar__user" key={index}>
                {user}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          <div className="chat-window__area">
            {messages.map((message, index) => (
              <div className="chat-message" key={index}>
                <div className="chat-message-info">
                  <span className="chat-message-username">{userName}</span>
                  <span className="chat-message-time">
                    {Hour}:{Minutes}
                  </span>
                </div>
                <p className="chat-message-text">{message.text}</p>
              </div>
            ))}
          </div>

          <form className="chat-form" onSubmit={onSendMessage}>
            <textarea
              className="chat-form__textarea"
              value={texts}
              onChange={sendMessage}
            ></textarea>
            <button type="submit" className="button chat-button">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
