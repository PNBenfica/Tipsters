import { combineReducers } from "redux";

import notifications from "./notificationsReducer";
import sports from "./sportsReducer";

export default combineReducers({
  sports, notifications
})
