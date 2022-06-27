import { useEffect, useState } from "react";
import '../index.css';
import logo from '../images/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, showSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  // const [currentCards, setCurrentCards] = useState({});

  // useEffect(() => {
  //   Promise.all([api.get('users/me'), api.get('cards')])
  //     .then(([user, cards]) => {
  //       setCurrentUser(user);
  //       setCurrentCards(cards);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  useEffect(() => {
    api.get('users/me')
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleCardClick(card) {
    showSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    showSelectedCard(null);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header src={logo} alt="логотип" />

      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />

      <Footer />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        popupClass="edit"
        formClass="editForm"
        header="Редактировать профиль"
        buttonText="Сохранить">

        <input id="name-input" type="text" name="name" className="popup__input" required maxLength="40" minLength="2" />
        <span className="name-input-error"></span>
        <input id="description-input" type="text" name="description" className="popup__input" required maxLength="200" minLength="2" />
        <span className="description-input-error"> </span>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        popupClass="add"
        formClass="addForm"
        header="Новое место"
        buttonText="Создать">

        <input id="place-input" type="text" name="place" className="popup__input" placeholder="Название" required maxLength="30" minLength="2" />
        <span className="place-input-error"></span>
        <input id="link-input" type="url" name="link" className="popup__input" placeholder="Ссылка на картинку" required />
        <span className="link-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        popupClass="photoProfile"
        formClass="PhotoChange"
        header="Обновить аватар"
        buttonText="Сохранить">
        <input id="photo-input" type="url" name="photo" className="popup__input" placeholder="Ссылка на картинку" required />
        <span className="photo-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        popupClass="delete"
        formClass="popup__form_confirmation"
        header="Вы уверены?"
        buttonText="Да"
      />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

    </CurrentUserContext.Provider>
  );
}

export default App;
