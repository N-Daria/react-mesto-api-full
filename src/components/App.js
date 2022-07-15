import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import logo from '../images/logo.svg';
import succsess from '../images/succsess.svg'
import fail from '../images/fail.svg'
import Header from './Header';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import { checkToken, register, authorize } from '../utils/Authorization';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRegistrationPopupOpen, setisRegistrationPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userAuthData, setUserAuthData] = useState({
    id: '',
    email: ''
  });
  const history = useHistory();

  // gets initial cards list and user data

  useEffect(() => {
    api.getCards()
      .then(setCards)
      .catch(console.log)
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(console.log)
  }, [])

  // check if user is already registered

  useEffect(() => {
    handleTokenCheck()
  }, [])

  // open/close popups 

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setisRegistrationPopupOpen(false);
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

  // popups submit changes

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

  // card actions

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then((card) => {
        setCards(state => state.filter(card => card._id !== cardId))
      })
  }

  function handleCardLike(cardId, notLiked) {
    function onSetCards(newCard) {
      setCards(state => state.map(cardInCards => cardInCards._id === cardId ? newCard : cardInCards));
    }

    notLiked ?
      api.likeCard(cardId)
        .then((newCard) => {
          onSetCards(newCard);
        })
      : api.deleteLikeCard(cardId)
        .then((newCard) => {
          onSetCards(newCard);
        })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // registration, login & logout

  function handleRegister(data) {
    register(data)
      .then((res) => {
        if (res._id) {
          localStorage.setItem('id', data._id);
          setUserAuthData({
            email: data.email,
            id: data._id
          })
        }
        setLoggedIn(true);
        history.push('/');
      })
      .catch(console.log)
  }

  function handleLogin(data) {
    authorize(data)
      .then((res) => {
        console.log(res)
        if (res.token) {
          localStorage.setItem('id', res.token);
          setUserAuthData((oldData) => (
            {
              ...oldData,
              id: res.token,
            }
          ))
        }
        setLoggedIn(true);
        history.push('/');
      })
      .catch(console.log)
  }

  function handleLogout() {
    localStorage.removeItem('id');
    setUserAuthData({
      id: '',
      email: ''
    });
    setLoggedIn(false);
    debugger
  }

  function handleTokenCheck() {
    const id = localStorage.getItem('id');
    if (id) {
      checkToken(id)
        .then((res) => {
          if (res._id) {
            localStorage.setItem('id', id);
            setUserAuthData({
              id: id,
              email: res.email
            })
          }
          setLoggedIn(true);
          history.push('/');
        });
    }
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/sign-in'>
          <Header src={logo} alt="логотип" actionText='Регистрация' redirect="/sign-up" />
          <Login
            handleLogin={handleLogin}
          />
        </Route>

        <Route path='/sign-up'>
          <Header src={logo} alt="логотип" actionText='Войти' redirect="/sign-in" />
          <Register
            imagesuccsess={succsess}
            imagefail={fail}
            isOpen={isRegistrationPopupOpen}
            onClose={closeAllPopups}
            handleRegister={handleRegister}
          />
        </Route>

        <ProtectedRoute exact path='/' loggedIn={loggedIn} >

          <Header
            src={logo}
            alt="логотип"
            actionText='Выйти'
            redirect="/sign-in"
            userEmail={currentUser.email}
            handleLogout={handleLogout}
          />

          <Main
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}>
          </Main>

          <Footer />

        </ ProtectedRoute>

        <Route path='*'>
          {loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/sign-up" />}
        </Route>

      </Switch>


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
