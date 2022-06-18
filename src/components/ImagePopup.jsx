export default function ImagePopup() {

  return (
    <section className="popup view">
      <figure className="popup__photo-container">
        <button type="button" className="popup__close" aria-label="Закрыть"></button>
        <img src="#" alt="" className="popup__photo" />
        <figcaption className="popup__info"></figcaption>
      </figure>
    </section>
  )
}


