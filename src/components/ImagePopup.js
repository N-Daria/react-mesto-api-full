export default function ImagePopup(props) {

  const open = props.card ? 'popup_opened' : '';

  const image = props.card ? props.card.src : '';
  const title = props.card ? props.card.title : '';

  return (
    <section className={`popup view ${open}`}>
      <figure className="popup__photo-container">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={props.onClose} />
        <img src={image} alt={title} className="popup__photo" />
        <figcaption className="popup__info">{title}</figcaption>
      </figure>
    </section >
  )
}