export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};

export const serverRequestConfig = {
  url: 'http://api.mesto.daria.nomoredomainsclub.ru',
  // url: 'http://localhost:3002',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};
