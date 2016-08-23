import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";

import Feed from "./pages/Feed";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Rankings from "./pages/Rankings";
import Sports from "./pages/Sports";
import store from "./store";

const app = document.getElementById('app');

gapi.client.load('conference', 'v1', loadCallback, '//' + window.location.host + '/_ah/api');
gapi.client.load('oauth2', 'v2', function () {});

function loadCallback () {
	console.log("api loaded");
}

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
			<Route path="/" component={Layout}>
				<IndexRoute component={Feed}></IndexRoute>
				<Route path="profile" name="profile" component={Profile}></Route>
				<Route path="rankings" name="rankings" component={Rankings}></Route>
				<Route path="sports(/:sport(/:league(/:match)))" name="sports" component={Sports}></Route>
			</Route>
		</Router>
	</Provider>,
app);
