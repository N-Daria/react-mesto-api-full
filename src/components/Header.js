
function Header(props) {
  return (
    <header className="header">
      <img src={props.src} alt={props.alt} className="header__logo" />
      <div className="header__text-box">
        <a href={props.redirect} className="header__action-text">{props.actionText}</a>
      </div>
    </header>
  )

}

export default Header
