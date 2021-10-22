import React from "react";
import './Login.css'

function Login({login}) {
  const [userName, setUserName] = React.useState('');
  const [roomId, setRoomId] = React.useState('');

function submit(e) {
    e.preventDefault()
    login(userName,roomId);
}

  return (
    <div className="login">
      <form className="form" onSubmit={submit} autoComplete="off">
          <h1 className="form__title">Добро пожаловать</h1>
        <input
        required
        type='text'
        value={roomId}
        placeholder='Введите номер комнаты'
        name='room'
        className="form-input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect='off'
        onChange={(e)=> {setRoomId(e.target.value)}}
      />
      <input
        required
        type='text'
        value={userName}
        name='name'
        className="form-input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect='off'
        placeholder='Введите имя'
        onChange={(e)=> {setUserName(e.target.value)}}
      />
      <button
          type="submit"
          className="button login-button"/* {`button ${selector} ${!isValid && 'button_disabled'} `} */
          /* disabled={!isValid} */
        >Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
