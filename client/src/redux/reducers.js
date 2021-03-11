import { combineReducers } from 'redux';
import cohortReducer from './cohortReducer/cohortReducer';
import groupReducer from './groupReducer/reducerGroup'
import userReducer from './userReducer/userReducer'
import loginReducer from "./loginReducer/loginReducer";
import darkModeReducer from "./darkModeReducer/reducerDarkMode";
import inviteReducer from "./inviteReducer/reducerInvite";
import feedbackReducer from './feedbackReducer/feedbackReducer';
import lectureReducer from './lectureReducer/lectureReducer';
import jobReducer from './jobsReducer/reducerJobs';
import boomReducer from "./boomsReducer/reducerBooms";
import studentReducer from './studentReducer/studentReducer'
import studentLecturesReducer from './studentLecturesReducer/studentLecturesReducer';
import migrationRequestsReducer from './migrationRequestsReducer/migrationRequestsReducer';
import newsReducer from './newsReducer/newsReducer'

const rootReducer = combineReducers({
  feedbackReducer,
  lectureReducer,
  cohortReducer,
  groupReducer,
  userReducer,
  userLoggedIn: loginReducer,
  darkModeReducer,
  inviteReducer,
  jobReducer,
  boomReducer,
  studentReducer,
  studentLecturesReducer,
  migrationRequestsReducer,
  newsReducer
});

export default rootReducer;
