import { combineReducers } from 'redux';
import feedbackReducer from './feedbackReducer/feedbackReducer';
import lectureReducer from './lectureReducer/lectureReducer';

const rootReducer = combineReducers({
    feedbackReducer,
    lectureReducer,
});

export default rootReducer;
