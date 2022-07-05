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
import AddPlacePopup from "./AddPlacePopup";

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

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get('cards')
      .then((data) => {
        setCards(
          data.map((item) => ({
            link: item.link,
            name: item.name,
            likes: item.likes,
            _id: item._id,
          }))
        )
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then((card) => {
        setCards((state) => {
          return state.filter((cardInCards) => {
            return !(cardInCards._id === cardId);
          })
        })
      })
  }

  function handleCardLike(cardId, notLiked) {
    notLiked ?
      api.likeCard(cardId)
        .then((newCard) => {
          setCards((state) => {
            return state.map((cardInCards) => {
              return cardInCards._id === cardId ? newCard : cardInCards;
            })
          })
        })
      : api.deleteLikeCard(cardId)
        .then((newCard) => {
          setCards((state) => {
            return state.map((cardInCards) => {
              return cardInCards._id === cardId ? newCard : cardInCards;
            })
          })
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
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdatePlace={handleAddPlaceSubmit}
      />

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
