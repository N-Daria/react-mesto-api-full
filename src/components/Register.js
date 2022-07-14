import InfoTooltip from "./InfoTooltip";
import EntrancePage from "./EntrancePage";
import React from "react";

export default function Register({ ...props }) {

  // props.imagesuccsess = { props.imagesuccsess };
  // Imagefail = { fail }
  // props.headerPopup = { 'Вы успешно зарегистрировались!'};

  function handleSubmit(event) {
    event.preventDefault();

    // if evrth is ok -> set header to form and image

    debugger
  }

  return (
    <>
      <EntrancePage
        header="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        actionText="Уже зарегистрированы? Войти"
      />
      <InfoTooltip {...props} />
    </>
  )

}