import InfoTooltip from "./InfoTooltip";
import EntrancePage from "./EntrancePage";
import React, { useState } from "react";

export default function Register({ ...props }) {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  }
  );

  const [messageError, setMessageError] = useState('');

  function handleChange(newData) {
    setData((oldData) => (
      {
        ...oldData,
        email: newData.email,
        password: newData.password,
      }
    ))
  }

  // props.imagesuccsess = { props.imagesuccsess };
  // Imagefail = { fail }
  // props.headerPopup = { 'Вы успешно зарегистрировались!'};

  function handleSubmit(data) {
    props.handleRegister(data);

    // if evrth is ok -> set header to form and image
  }



  return (
    <>
      <EntrancePage
        header="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        actionText="Уже зарегистрированы? Войти"
        onChange={handleChange}
      />
      <InfoTooltip {...props} />
    </>
  )

}