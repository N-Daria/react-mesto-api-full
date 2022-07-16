import { Redirect, Route } from "react-router-dom"

export default function ProtectedRoute({ ...props }) {

  return (
    <Route>
      {
        () => props.loggedIn ? props.children : <Redirect to='/sign-in' />
      }
    </Route>
  )
}