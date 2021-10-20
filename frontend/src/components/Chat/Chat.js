import React from "react";
import "./Chat.css";

function Chat() {
  const messages = [1, 2, 3, 4, 5];

  return (
    <div className="chat">
      <h1 className="chat__title">Имя пользователя в номер комнаты</h1>
      <div className="chat__container">
        <div className='chat-sidebar'>
          <h2>Пользователей онлайн</h2>
          <ul className='chat-sidebar__users'>
            <li>user1</li>
          </ul>
        </div>
        <div className="chat-message-window">
          <div className="chat-message-area">
            {messages.map((message) => (
              <div className="chat-message" key={(Date.now() + Math.random())}>
                <div>
                  <span>Логин{/* {message.userName} */}</span>
                  <span>Время отправки</span>
                </div>
                <div>
                  <p>Текст сообщения{/* {message.text} */}</p>
                </div>
              </div>
            ))}
          </div>

          <form className='chat-form'>
            <textarea className='chat-form__textarea'></textarea>
            <button className='button chat_button'></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
