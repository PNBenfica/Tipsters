import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Feed from "./pages/Feed";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Rankings from "./pages/Rankings";
import Sports from "./pages/Sports";
import SportsLeague from "./pages/SportsLeague";

const app = document.getElementById('app');

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Feed}></IndexRoute>
      <Route path="profile" name="profile" component={Profile}></Route>
      <Route path="rankings" name="rankings" component={Rankings}></Route>
      <Route path="sports(/:sport(/:league(/:match)))" name="sports" component={Sports}></Route>
      <Route path="sports/premierleague" name="sportsleague" component={SportsLeague}></Route>
    </Route>
  </Router>,
app);
