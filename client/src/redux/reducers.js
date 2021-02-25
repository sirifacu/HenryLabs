import { combineReducers } from 'redux';
import loginReducer from "./loginReducer/loginReducer";
import darkModeReducer from "./darkModeReducer/reducerDarkMode"
import inviteReducer from "./inviteReducer/reducerInvite"

const rootReducer = combineReducers({
  userLoggedIn: loginReducer,
  darkModeReducer,
  inviteReducer,

});

export default rootReducer;
