import { useRef } from "react";
import { Link } from "react-router-dom";

export default function EntrancePage(props) {

  const email = useRef();
  const password = useRef();

  function handleSubmit() {
    debugger
  }

  return (
    <form className="popup__form RegisterForm" onSubmit={handleSubmit}>
      <h2 className="popup__header">Регистрация</h2>
      <input
        id="email-input"
        type="email"
        name="email"
        className="popup__input"
        placeholder="Email"
        required
        ref={email}
      />
      <span className="email-input-error"></span>

      <input
        id="password-input"
        type="password"
        name="password"
        className="popup__input"
        placeholder="Пароль"
        required
        ref={password}
      />
      <span className="password-input-error"></span>

      <button className="popup__button" type="submit">Зарегистрироваться</button>
      <Link to='/sign-in'>Уже зарегистрированы? Войти</Link>
    </form>
  )

}