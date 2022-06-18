import { findRenderedComponentWithType } from "react-dom/test-utils"


function Main({onEditAvatar, onEditProfile, onAddPlace}) {


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img src="" alt="Фотография профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__header">Жак-Ив-Кусто</h1>
          <button className="profile__edit" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <p className="profile__description">Исследователь океана</p>
        </div>
        <button className="profile__add" type="button" aria-label="Добавить новую фотографию" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__gallery list">
        </ul>
      </section>
    </main>
  )

}

export default Main
