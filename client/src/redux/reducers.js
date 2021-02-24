import { combineReducers } from 'redux';
import darkModeReducer from "./darkModeReducer/reducerDarkMode"
import inviteReducer from "./inviteReducer/reducerInvite"

const rootReducer = combineReducers({
  darkModeReducer,
  inviteReducer,
});

export default rootReducer;
