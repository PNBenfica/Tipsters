import { combineReducers } from "redux"

import auth from "./loginReducer"
import messages from "./messagesReducer"
import notifications from "./notificationsReducer"
import posts from "./postsReducer"
import sports from "./sportsReducer"
import sportsTips from "./sportsTipsReducer"
import users from "./usersReducer"
import rankings from "./rankingsReducer"
import register from "./registerReducer"
import search from "./searchReducer"


export default combineReducers({
  auth, messages, notifications, sports, sportsTips, posts, rankings, register, search, users
})
