import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {

  const [cards, setCards] = useState([]);

  const currentUserContext = React.useContext(CurrentUserContext);

  useEffect(() => {
    api.get('cards')
      .then((data) => {
        setCards(
          data.map((item) => ({
            src: item.link,
            title: item.name,
            key: item._id,
            likes: item.likes,
            id: item._id,
          }))
        )
      }).catch((err) => {
        console.log(err)
      })
  }, [])

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

          {cards.map((card) => <Card {...card} onCardClick={onCardClick} key={card.key} />)}
        </ul>
      </section>
    </main >
  )

}

export default Main
