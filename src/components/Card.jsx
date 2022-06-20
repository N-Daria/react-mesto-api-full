export default function Card(props) {

  function handleClick() {
    // debugger
    const card = {
      src: props.src,
      title: props.title,
    }
    props.onCardClick(card);
  }

  return (
    <li className="elements__card">
      <figure className="elements__item">
        <button type="button" className="elements__remove" aria-label="Удалить фотографию"></button>
        <img src={props.src} alt={props.title} className="elements__photo" onClick={handleClick} />
        <figcaption className="elements__info">
          <p className="elements__text">{props.title}</p>
          <div className="elements__like-group">
            <button type="button" className="elements__like" aria-label="Нравится"></button>
            <p className="elements__like-number">{props.likes}</p>
          </div>
        </figcaption>
      </figure>
    </li >
  )
}

