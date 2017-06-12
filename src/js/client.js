import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import { Provider } from "react-redux"

import gapiLoader from './scripts/gapiLoader'

import Feed from "./pages/Feed"
import Layout from "./pages/Layout"
import LiveStreams from "./pages/LiveStreams"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Rankings from "./pages/Rankings"
import Sports from "./pages/Sports"
import store from "./store"

const app = document.getElementById('app')

gapiLoader.loadAPI()

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={() => {if(!window.location.hash.startsWith("#/sports/")) window.scrollTo(0, 0)}} history={hashHistory}>
			<Route path="/" component={Layout}>
				<IndexRoute component={Home}></IndexRoute>
				<Route path="feed" name="feed" component={Feed}></Route>
				<Route path="login" name="login" component={Login}></Route>
				<Route path="posts/:postId" name="post" component={Feed}></Route>
				<Route path="profile(/:username)" name="profile" component={Profile}></Route>
				<Route path="rankings" name="rankings" component={Rankings}></Route>
				<Route path="sports(/:sport/:sportCode(/:league/:leagueCode(/:match/:matchCode)))" name="sports" component={Sports}></Route>
				<Route path="streams" name="streams" component={LiveStreams}></Route>
			</Route>
		</Router>
	</Provider>,
app)
