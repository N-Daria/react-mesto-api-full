export default function ImagePopup(props) {
  let open;

  if (props.card) {
    open = 'popup_opened';
  }

  return (
    <section className={`popup view ${open}`}>
      <figure className="popup__photo-container">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose}></button>
        <img src={props.card.src} alt={props.card.title} className="popup__photo" />
        <figcaption className="popup__info">{props.card.title}</figcaption>
      </figure>
    </section >
  )
}
