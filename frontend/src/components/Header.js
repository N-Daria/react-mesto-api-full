import { useHistory } from "react-router-dom"

function Header(props) {
  const email = props.isAuth ? 'header__email' : 'header__email_hidden';
  const actionClass = props.isAuth ? 'header__action-text_auth' : '';

  const history = useHistory();

  function redirect() {
    if (props.handleLogout) {
      props.handleLogout();
    }
    history.push(props.redirect);
  }

  return (
    <header className="header">
      <img src={props.src} alt={props.alt} className="header__logo" />
      <div className="header__text-box">
        <p className={email}>{props.userEmail}</p>
        <p className={`header__action-text ${actionClass}`} onClick={redirect}>{props.actionText}</p>
      </div>
    </header >
  )
}

export default Header
