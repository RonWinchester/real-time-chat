import React from "react";
import "./Chat.css";

function Chat({data}) {
  const [text, setText] = React.useState('')
  const messages = [1];

  function sendMessage (e) {
    setText(e.target.value)
  }

  const Data = new Date();
  const Hour = Data.getHours();
  const Minutes = Data.getMinutes();

  return (
    <div className="chat">
      <h1 className="chat__title">{data.userName} в комнате {data.roomId}</h1>
      <div className="chat__container">
        <div className="chat-sidebar">
          <h2 className="chat-sidebar__title">Пользователей онлайн: {data.users.length}</h2>
          <ul className="chat-sidebar__users">
            {data.users.map((user, index) => (
              <li className="chat-sidebar__user" key={index}>{user}</li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          <div className="chat-window__area">
            {messages.map((message, index) => (
              <div className="chat-message" key={index}>
                <div className="chat-message-info">
                  <span className="chat-message-username">{data.userName}</span>
                  <span className="chat-message-time">{Hour}:{Minutes}</span>
                </div>
                  <p className="chat-message-text">Текст сообщения{/* {message.text} */}</p>
              </div>
            ))}
          </div>

          <form className="chat-form" >
            <textarea className="chat-form__textarea" value={text} onChange={sendMessage}></textarea>
            <button type='submit' className="button chat-button">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
