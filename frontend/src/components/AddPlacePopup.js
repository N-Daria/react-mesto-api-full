import PopupWithForm from "./PopupWithForm"
import React from "react"

export default function AddPlacePopup(props) {

  const placeInput = React.useRef();
  const linkInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdatePlace({
      name: placeInput.current.value,
      link: linkInput.current.value,
    })
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      popupClass="add"
      formClass="addForm"
      header="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        type="text"
        name="place"
        className="popup__input"
        placeholder="Название"
        required
        maxLength="30"
        minLength="2"
        ref={placeInput}
      />
      <span className="place-input-error"></span>
      <input
        id="link-input"
        type="url"
        name="link"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
        ref={linkInput}
      />
      <span className="link-input-error"></span>
    </PopupWithForm>
  )
}