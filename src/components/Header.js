
function Header(props) {
  return (
    <header className="header">
      <img src={props.src} alt={props.alt} className="header__logo" />
    </header>

  )

}

export default Header
