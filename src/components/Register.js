import EntrancePage from "./EntrancePage";

export default function Register(props) {

  function handleSubmit() {
    debugger
  }

  return (
    <EntrancePage
      header="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      actionText="Уже зарегистрированы? Войти"
    />
  )

}