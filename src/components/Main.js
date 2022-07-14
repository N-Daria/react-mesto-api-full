import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ ...props }) {

  const currentUserContext = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={props.onEditAvatar}>
          <img src={currentUserContext.avatar} alt="Фотография профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__header">{currentUserContext.name}</h1>
          <button className="profile__edit" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
          <p className="profile__description">{currentUserContext.about}</p>
        </div>
        <button className="profile__add" type="button" aria-label="Добавить новую фотографию" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__gallery list">
          {props.cards.map(function (card) {
            return <Card {...card}
              onCardLike={props.onCardLike}
              onCardClick={props.onCardClick}
              key={card._id}
              onCardDelete={props.onCardDelete}
            />
          })}
        </ul>
      </section>
    </main >
  )

}

export default Main
