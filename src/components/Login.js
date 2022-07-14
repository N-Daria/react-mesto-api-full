import EntrancePage from "./EntrancePage"

export default function Login() {

  function handleSubmit() {
    debugger
  }

  return (
    <EntrancePage
      header="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
    />
  )
}