import EntrancePage from "./EntrancePage";
import React, { useState } from "react";

export default function Register({ ...props }) {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handleChange(newData) {
    setData((oldData) => (
      {
        ...oldData,
        email: newData.email,
        password: newData.password,
      }
    ))
  }

  function handleSubmit(data) {
    props.handleRegister(data);
  }

  return (
    <EntrancePage
      header="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      actionText="Уже зарегистрированы? Войти"
      onChange={handleChange}
    />
  )

}