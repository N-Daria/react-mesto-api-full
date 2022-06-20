import { useState } from "react";

import '../index.css';
import logo from '../images/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, changeStateProfile] = useState(false);
  const [isAddPlacePopupOpen, changeStatePlase] = useState(false);
  const [isEditAvatarPopupOpen, changeStateAvatar] = useState(false);

  const [selectedCard, showSelectedCard] = useState(false);

  function handleCardClick(card) {
    showSelectedCard(card);
  }

  function closeAllPopups() {
    changeStateProfile(false);
    changeStateAvatar(false);
    changeStatePlase(false);
    showSelectedCard('');
  }

  function handleEditProfileClick() {
    changeStateProfile(true);
  }

  function handleEditAvatarClick() {
    changeStateAvatar(true);
  }
  function handleAddPlaceClick() {
    changeStatePlase(true);
  }

  return (
    <>
      <Header src={logo} alt="логотип" />

      <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />

      <Footer />

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} popupClass="edit" formClass="editForm" header="Редактировать профиль" buttonText="Сохранить">
        <input id="name-input" type="text" name="name" className="popup__input" required maxLength="40" minLength="2" />
        <span className="name-input-error"></span>
        <input id="description-input" type="text" name="description" className="popup__input" required maxLength="200" minLength="2" />
        <span className="description-input-error"></span>
      </PopupWithForm>

      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} popupClass="add" formClass="addForm" header="Новое место" buttonText="Создать">
        <input id="place-input" type="text" name="place" className="popup__input" placeholder="Название" required maxLength="30" minLength="2" />
        <span className="place-input-error"></span>
        <input id="link-input" type="url" name="link" className="popup__input" placeholder="Ссылка на картинку" required />
        <span className="link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} popupClass="photoProfile" formClass="PhotoChange" header="Обновить аватар" buttonText="Сохранить">
        <input id="photo-input" type="url" name="photo" className="popup__input" placeholder="Ссылка на картинку" required />
        <span className="photo-input-error"></span>
      </PopupWithForm>

      <PopupWithForm onClose={closeAllPopups} popupClass="delete" formClass="popup__form_confirmation" header="Вы уверены?" buttonText="Да" />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <template id="card">
        <li className="elements__card">
          <figure className="elements__item">
            <button type="button" className="elements__remove" aria-label="Удалить фотографию"></button>
            <img src="#" alt="" className="elements__photo" />
            <figcaption className="elements__info">
              <p className="elements__text"></p>
              <div className="elements__like-group">
                <button type="button" className="elements__like" aria-label="Нравится"></button>
                <p className="elements__like-number"></p>
              </div>
            </figcaption>
          </figure>
        </li>
      </template>

    </>
  );
}

export default App;
