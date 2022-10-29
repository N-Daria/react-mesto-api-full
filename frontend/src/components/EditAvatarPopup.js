import PopupWithForm from "./PopupWithForm"
import React from "react"

export default function EditAvatarPopup(props) {
  const avatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      photo: avatar.current.value,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      popupClass="photoProfile"
      formClass="PhotoChange"
      header="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatar}
        id="photo-input"
        type="url"
        name="photo"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="photo-input-error"></span>
    </PopupWithForm>
  )
}

