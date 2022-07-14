import { Link } from "react-router-dom"

function Header(props) {
  return (
    <header className="header">
      <img src={props.src} alt={props.alt} className="header__logo" />
      <div className="header__text-box">
        <Link to={props.redirect} className="header__action-text">{props.actionText}</Link>
      </div>
    </header>
  )

}

export default Header
