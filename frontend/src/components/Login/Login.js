import React from "react";
import './Login.css'
import {connectionSocket} from '../../socket'

function Login() {

function submit(e) {
    e.preventDefault()
    connectionSocket()
}

  return (
    <div className="login">
      <form className="form" onSubmit={submit} autoComplete="off">
          <h1 className="form__title">Добро пожаловать</h1>
        <input
        required
        type='text'
        /* value={inputValue} */
        placeholder='Введите номер комнаты'
        name='room'
        /* id={FormInputId} */
        className="form-input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect='off'
      />
      <input
        required
        type='text'
        /* value={inputValue} */
        name='room'
        /* id={FormInputId} */
        className="form-input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect='off'
        placeholder='Введите имя'
      />
      <span /* id={FormInputError} */ className="form-input-error">
        {/* {FormInputErrorName} */}
      </span>
      <button
          type="submit"
          className="button"/* {`button ${selector} ${!isValid && 'button_disabled'} `} */
          /* disabled={!isValid} */
        >Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
