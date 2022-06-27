import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

export default function Card(props) {

  const currentUserContext = React.useContext(CurrentUserContext);

  const isOwn = currentUserContext._id === props.id;
  const removeButtonVisibility = isOwn ? 'elements__remove' : 'elements__remove_hidden';

  const isLiked = props.likes.some(i => i._id === currentUserContext._id);
  const cardLikeButtonClassName = isLiked ? 'elements__like_active' : '';

  function handleClick() {
    const card = {
      src: props.src,
      title: props.title,
    }
    props.onCardClick(card);
  }

  return (
    <li className="elements__card">
      <figure className="elements__item">
        <button type="button" className={removeButtonVisibility} aria-label="Удалить фотографию"></button>
        <img src={props.src} alt={props.title} className="elements__photo" onClick={handleClick} />
        <figcaption className="elements__info">
          <p className="elements__text">{props.title}</p>
          <div className="elements__like-group">
            <button type="button" className={`elements__like ${cardLikeButtonClassName}`} aria-label="Нравится"></button>
            <p className="elements__like-number">{props.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li >
  )
}

