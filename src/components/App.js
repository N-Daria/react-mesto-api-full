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
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, showSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

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

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(data) {
    api.patchUserPhoto(data)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err)
      })
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

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

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

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

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
