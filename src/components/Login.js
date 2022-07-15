import EntrancePage from "./EntrancePage"
import { useState } from "react";

export default function Login({ ...props }) {

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
    props.handleLogin(data);
  }

  return (
    <EntrancePage
      header="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  )
}