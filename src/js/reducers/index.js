import { combineReducers } from "redux";

import messages from "./messagesReducer";
import notifications from "./notificationsReducer";
import sports from "./sportsReducer";

export default combineReducers({
  messages, notifications, sports
})
