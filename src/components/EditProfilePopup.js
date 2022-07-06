import { useState, useContext, useEffect } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {

  const currentUserContext = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUserContext.name);
  const [description, setDescription] = useState(currentUserContext.about);

  useEffect(() => {
    setName(currentUserContext.name);
    setDescription(currentUserContext.about);
  }, [currentUserContext, props.isOpen]);

  function inputChange(event) {
    if (event.target.name === 'name') {
      setName(`${event.target.value}`);
    } else if (event.target.name === 'description') {
      setDescription(`${event.target.value}`);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      popupClass="edit"
      formClass="editForm"
      header="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input id="name-input"
        value={name || ""}
        onChange={inputChange}
        type="text"
        name="name"
        className="popup__input"
        required
        maxLength="40"
        minLength="2"
      />
      <span className="name-input-error"></span>
      <input id="description-input"
        value={description || ""}
        type="text"
        onChange={inputChange}
        name="description"
        className="popup__input"
        required
        maxLength="200"
        minLength="2"
      />
      <span className="description-input-error"> </span>
    </PopupWithForm>
  )
}