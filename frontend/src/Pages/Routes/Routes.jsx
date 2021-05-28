import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Index from "../Users/Index";
import Post from "../Users/Post";
import Admin from "../Admin/Admin";
import AdminLogin from "../Admin/AdminLogin"
import Notfound from "../Notfound"
import Protected from "./Protected"
function Routes() {
  return (
    <Router >
      <Switch >
        <Route exact path="/" ><Index /></Route>
        <Route exact path="/" ><Post /></Route>
        <Route exact path="/admin" ><Protected component={Admin} /></Route>
        <Route exact path="/admin/login" ><AdminLogin /></Route>
        <Route component={Notfound} />
      </Switch >
    </Router>
  )
}
export default Routes