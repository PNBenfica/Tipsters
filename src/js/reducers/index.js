import { combineReducers } from "redux"

import messages from "./messagesReducer"
import notifications from "./notificationsReducer"
import posts from "./postsReducer"
import sports from "./sportsReducer"
import trends from "./trendsReducer"
import users from "./usersReducer"
import rankings from "./rankingsReducer"
import search from "./searchReducer"


export default combineReducers({
  messages, notifications, sports, posts, rankings, search, trends, users
})
