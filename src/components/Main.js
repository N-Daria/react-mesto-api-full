import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUserContext = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img src={currentUserContext.avatar} alt="Фотография профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__header">{currentUserContext.name}</h1>
          <button className="profile__edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <p className="profile__description">{currentUserContext.about}</p>
        </div>
        <button className="profile__add" type="button" aria-label="Добавить новую фотографию" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__gallery list">
          {cards.map(function (card) {
            return <Card {...card}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              key={card._id}
              onCardDelete={onCardDelete}
            />
          })}
        </ul>
      </section>
    </main >
  )

}

export default Main
