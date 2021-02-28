import { combineReducers } from 'redux';
import cohortReducer from './cohortReducer/cohortReducer';
import userReducer from './userReducer/userReducer'
import loginReducer from "./loginReducer/loginReducer";
import darkModeReducer from "./darkModeReducer/reducerDarkMode"
import inviteReducer from "./inviteReducer/reducerInvite"
import feedbackReducer from './feedbackReducer/feedbackReducer';
import lectureReducer from './lectureReducer/lectureReducer';

const rootReducer = combineReducers({
  feedbackReducer,
  lectureReducer,
  cohortReducer,
  userReducer,
  userLoggedIn: loginReducer,
  darkModeReducer,
  inviteReducer,
  
});

export default rootReducer;
