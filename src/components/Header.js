import { Link } from "react-router-dom"

function Header(props) {
  const email = props.isAuth ? 'header__email' : 'header__email_hidden';
  const actionClass = props.isAuth ? 'header__action-text_auth' : '';

  return (
    <header className="header">
      <img src={props.src} alt={props.alt} className="header__logo" />
      <div className="header__text-box">
        <Link to={props.redirect} className={`header__action-text ${actionClass}`}>{props.actionText}</Link>
        <p className={email}>{props.userEmail}</p>
      </div>
    </header>
  )
}

export default Header
