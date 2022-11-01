import { useEffect, useState, useCallback } from "react";
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
import InfoTooltip from "./InfoTooltip";
import { checkToken, register, authorize } from '../utils/Authorization';

function App() {
  const token = localStorage.getItem('id');
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

  const [popupRegistrationData, setPopupRegistrationData] = useState({
    photoUrl: '',
    header: ''
  });

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
    api.patchUserInfo(data, token)
      .then((result) => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(data) {
    api.patchUserPhoto(data, token)
      .then((result) => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // card actions

  function handleCardDelete(cardId) {
    api.deleteCard(cardId, token)
      .then((card) => {
        return setCards((state) => {
          return state.filter(card => card._id !== cardId)
        })
      })
      .catch(console.log)
  }

  function handleCardLike(cardId, notLiked) {
    function onSetCards(newCard) {
      return setCards((state) => {
        return state.map((cardInCards) => {
          return cardInCards._id === cardId ? newCard : cardInCards
        });
      }
      );
    }

    notLiked ?
      api.likeCard(cardId, token)
        .then((newCard) => {
          onSetCards(newCard.data);
        })
      : api.deleteLikeCard(cardId, token)
        .then((newCard) => {
          onSetCards(newCard.data);
        })
        .catch(console.log)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function changeRegistrationStatus(isRegistrationOk) {
    setisRegistrationPopupOpen(true);

    if (isRegistrationOk) {
      setPopupRegistrationData({
        photoUrl: succsess,
        header: 'Вы успешно зарегистрировались!'
      });
    } else {
      setPopupRegistrationData({
        photoUrl: fail,
        header: 'Что-то пошло не так! Попробуйте ещё раз.'
      });
    }
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
        changeRegistrationStatus(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        changeRegistrationStatus(false);
      })
  }

  function handleLogin(data) {
    authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('id', res.token);
          setUserAuthData({
            email: data.email,
            id: res.token,
          })
        }
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err)
        changeRegistrationStatus(false);
      })
  }

  function handleLogout() {
    localStorage.removeItem('id');
    setUserAuthData({
      id: '',
      email: ''
    });
    setLoggedIn(false);
  }

  // confirmation of the user's existence

  const handleTokenCheck = useCallback(() => {
    const id = localStorage.getItem('id');
    if (id) {
      checkToken(id)
        .then((res) => {
          if (res.data._id) {
            localStorage.setItem('id', id);
            setUserAuthData({
              id: id,
              email: res.data.email
            })
          }
          setLoggedIn(true);
          history.push('/');
        })
        .catch(console.log)
    }
  }, [history]);

  // gets initial cards list and user data

  useEffect(() => {
    if (loggedIn) {
      api.getCards(token)
        .then((res) => {
          setCards(res.data)
        })
        .catch(console.log)
    }
  }, [loggedIn, token])

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo(token)
        .then((user) => {
          setCurrentUser(user.data);
        })
        .catch(console.log)
    }
  }, [loggedIn, token])

  // check if user is already registered

  useEffect(() => {
    handleTokenCheck()
  }, [handleTokenCheck])

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
            handleRegister={handleRegister}
          />
        </Route>

        <ProtectedRoute exact path='/' loggedIn={loggedIn} >

          <Header
            src={logo}
            alt="логотип"
            actionText='Выйти'
            redirect="/sign-in"
            userEmail={userAuthData.email}
            handleLogout={handleLogout}
            isAuth={loggedIn}
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

      <InfoTooltip
        data={popupRegistrationData}
        isOpen={isRegistrationPopupOpen}
        onClose={closeAllPopups}
      />

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
