import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

export default function Card(props) {
  const currentUserContext = React.useContext(CurrentUserContext);

  const isOwn = currentUserContext._id === props.owner._id;
  const removeButtonVisibility = isOwn ? 'elements__remove' : 'elements__remove_hidden';

  const isLiked = props.likes.some(i => i._id === currentUserContext._id);
  const cardLikeButtonClassName = isLiked ? 'elements__like_active' : '';

  function handleClick() {
    const card = {
      link: props.link,
      name: props.name,
    }
    props.onCardClick(card);
  }

  function handleLikeClick() {
    const cardId = props._id;
    props.onCardLike(cardId, !isLiked);
  }

  function handleDeleteClick() {
    const cardId = props._id;
    props.onCardDelete(cardId);
  }

  return (
    <li className="elements__card">
      <figure className="elements__item">
        <button onClick={handleDeleteClick} type="button" className={removeButtonVisibility} aria-label="Удалить фотографию"></button>
        <img src={props.link} alt={props.name} className="elements__photo" onClick={handleClick} />
        <figcaption className="elements__info">
          <p className="elements__text">{props.name}</p>
          <div className="elements__like-group">
            <button type="button" onClick={handleLikeClick} className={`elements__like ${cardLikeButtonClassName}`} aria-label="Нравится"></button>
            <p className="elements__like-number">{props.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li >
  )
}

