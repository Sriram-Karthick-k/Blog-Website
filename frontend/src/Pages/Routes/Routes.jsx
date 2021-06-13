import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Index from "../Users/Index";
import Posts from "../Users/Posts"
import Profile from "../Users/Profile";
import Compose from "../Users/Compose";
import Admin from "../Admin/Admin";
import AdminLogin from "../Admin/AdminLogin"
import Notfound from "../Notfound"
import Protected from "./Protected"
function Routes() {
  const [userLogin, setUserLogin] = useState(false)
  useEffect(() => {
    //this is used to check wheather the user is logged in while entering the page
    var promise = new Promise(function (res, rej) {
      var user = JSON.parse(localStorage.getItem("UserData"))
      if (user) {
        res(user)
      } else {
        rej()
      }
    })
    promise
      .then(res => {
        if (res.userName) {
          setUserLogin(true)
        } else {
          setUserLogin(false)
        }
      })
      .catch(() => {
        setUserLogin(false)
      })
  }, [])
  return (
    <Router >
      <Switch >
        <Route exact path="/" ><Index /></Route>
        <Route exact path="/posts/:id" >{userLogin ? <Protected component={Posts} /> : <Posts logged="true" />}</Route>
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