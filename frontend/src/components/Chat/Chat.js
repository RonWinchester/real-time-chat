import React from "react";
import "./Chat.css";

function Chat() {
  const messages = [1, 2, 3, 4, 5, 6, 7, 9, 7, 1, 2, 3, 4, 5, 6, 7, 9, 7, 1, 2, 3, 4, 5, 6, 7, 9, 7];

  return (
    <div className="chat">
      <h1 className="chat__title">Имя пользователя в номер комнаты</h1>
      <div className="chat__container">
        <div className="chat-sidebar">
          <h2 className="chat-sidebar__title">Пользователей онлайн</h2>
          <ul className="chat-sidebar__users">
            {messages.map((message) => (
              <li className="chat-sidebar__user" key={Date.now() + Math.random()}>user1</li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          <div className="chat-window__area">
            {messages.map((message) => (
              <div className="chat-message" key={Date.now() + Math.random()}>
                <div className="chat-message-info">
                  <span className="chat-message-username">Логин{/* {message.userName} */}</span>
                  <span className="chat-message-time">Время отправки</span>
                </div>
                  <p className="chat-message-text">Текст сообщения{/* {message.text} */}</p>
              </div>
            ))}
          </div>

          <form className="chat-form">
            <textarea className="chat-form__textarea"></textarea>
            <button className="button chat-button">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
