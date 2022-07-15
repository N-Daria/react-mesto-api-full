import { useRef } from "react";
import { Link } from "react-router-dom";

export default function EntrancePage({ header, buttonText, actionText, onSubmit, onChange }) {

  const actionTextClass = (actionText === undefined ? 'form__log-in_hidden' : 'form__log-in');

  const email = useRef();
  const password = useRef();

  function handleChange(e) {
    onChange({ email: email.current.value, password: password.current.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit();
  }

  return (
    <form className="popup__form form_entrance RegisterForm" onSubmit={handleSubmit}>
      <h2 className="popup__header form__header_entrance">{header}</h2>
      <input
        id="email-input"
        type="email"
        name="email"
        className="popup__input form__input_entrance"
        placeholder="Email"
        required
        ref={email}
        onChange={handleChange}
      />
      <span className="email-input-error"></span>

      <input
        id="password-input"
        type="password"
        name="password"
        className="popup__input form__input_entrance"
        placeholder="Пароль"
        required
        ref={password}
        onChange={handleChange}
      />
      <span className="password-input-error"></span>

      <button className="popup__button form__button_entrance" type="submit">{buttonText}</button>
      <Link to="/sign-in" className={`${actionTextClass}`}>{actionText}</Link>
    </form>
  )

}