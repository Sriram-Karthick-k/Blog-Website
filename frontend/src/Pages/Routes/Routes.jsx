import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Index from "../Users/Index";
import Posts from "../Users/Posts"
import PostRead from "../Users/PostRead"
import UserView from "../Users/UserView";
import Profile from "../Users/Profile";
import Compose from "../Users/Compose";
import Notfound from "../Notfound"
import Protected from "./Protected"
import FullyProtected from "./FullyProtected"
function Routes() {
  return (
    <Router >
      <Switch >
        <Route exact path="/" ><Index /></Route>
        <Route exact path="/posts/:id" > <Protected component={Posts} /></Route>
        <Route exact path="/posts/:id/:blogid" > <Protected component={PostRead} /> </Route>
        <Route exact path="/user/:userId" ><Protected component={UserView} /></Route>
        <Route exact path="/profile" > <FullyProtected component={Profile} /> </Route>
        <Route exact path="/compose" ><FullyProtected component={Compose} /></Route>
        <Route component={Notfound} />
      </Switch >
    </Router>
  )
}
export default Routes