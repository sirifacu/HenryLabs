import { combineReducers } from 'redux';
import feedbackReducer from './feedbackReducer/feedbackReducer';
import lectureReducer from './lectureReducer/lectureReducer';
import cohortReducer from './cohortReducer/cohortReducer'

const rootReducer = combineReducers({
    feedbackReducer,
    lectureReducer,
    cohortReducer,
});

export default rootReducer;
