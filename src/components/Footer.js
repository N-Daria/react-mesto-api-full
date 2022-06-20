
function Footer(props) {
const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} Nikulina Daria</p>
    </footer>
  )

}

export default Footer
