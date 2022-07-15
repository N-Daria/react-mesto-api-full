import { Redirect, Route } from "react-router-dom"

export default function ProtectedRoute({ ...props }) {

  function renderComponent() {
    let Component = [];

    props.children.forEach(element => {
      Component.push(element);
      return Component
    });

    return Component
  }

  return (
    <Route>
      {
        () => props.loggedIn ? renderComponent() : <Redirect to='/sign-in' />
      }
    </Route>
  )
}