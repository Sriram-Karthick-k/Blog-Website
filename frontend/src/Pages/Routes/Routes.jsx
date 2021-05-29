import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Index from "../Users/Index";
import Profile from "../Users/Profile";
import Compose from "../Users/Compose";
import Admin from "../Admin/Admin";
import AdminLogin from "../Admin/AdminLogin"
import Notfound from "../Notfound"
import Protected from "./Protected"
function Routes() {
  return (
    <Router >
      <Switch >
        <Route exact path="/" ><Index /></Route>
        <Route exact path="/profile" > <Protected component={Profile} /> </Route>
        <Route exact path="/compose" ><Protected component={Compose} /></Route>
        <Route exact path="/admin" ><Protected component={Admin} /></Route>
        <Route exact path="/admin/login" ><AdminLogin /></Route>
        <Route component={Notfound} />
      </Switch >
    </Router>
  )
}
export default Routes