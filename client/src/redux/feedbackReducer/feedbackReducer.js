import { LIST_ALL_FEEDBACKS_FROM_LECTURE,
    GET_FEEDBACK_FROM_USER,
    CHANGE_DONE,
    LIST_ALL_FEEDBACKS_FROM_USER,
    GET_FEEDBACK,
    GET_AVERAGE_FEEDBACKS_FROM_USER,
    GET_AVERAGE_FEEDBACKS_FROM_LECTURE,
    POST_FEEDBACK,
    CHANGE_FEEDBACK,
    DELETE_FEEDBACK } from './feedbackAction';

const initialState = {
    feedbacksLecture: [],
    feedbacksUser: [],
    feedBackUser: {},
    done: false,
    feedback: {},
    averageFeedbacksUser: 0,
    averageFeedbacksLecture: 0,
    deletedFeedback: false
};

const feedbackReducer = (state = initialState, action) => {
    switch(action.type) {
        case LIST_ALL_FEEDBACKS_FROM_LECTURE:
            return {
                ...state,
                feedbacksLecture: action.payload
            };
        case GET_FEEDBACK_FROM_USER:
            return {
                ...state,
                feedBackUser: action.payload,
                done: action.payload.rating ? true : false
            };
        case CHANGE_DONE:
            return {
                ...state,
                done: true
            }
        case LIST_ALL_FEEDBACKS_FROM_USER:
            return {
                ...state,
                feedbacksUser: action.payload
            };
        case GET_FEEDBACK:
            return {
                ...state,
                feedback: action.payload
            };
        case GET_AVERAGE_FEEDBACKS_FROM_USER:
            return {
                ...state,
                averageFeedbacksUser: action.payload
            };
        case GET_AVERAGE_FEEDBACKS_FROM_LECTURE:
            return {
                ...state,
                averageFeedbacksLecture: action.payload
            };
        case POST_FEEDBACK:
            return {
                ...state,
                postedFeedback: action.payload
            };
        case CHANGE_FEEDBACK:
            state.feedbacksLecture.forEach(feedback => {
                if (feedback.id === action.payload.id) {
                    feedback = action.payload;
                };
            });
            state.feedbacksUser.forEach(feedback => {
                if (feedback.id === action.payload.id) {
                    feedback = action.payload;
                };
            });
            return {
                ...state,
                changedFeedback: action.payload,
                feedbacksLecture: state.feedbacksLecture,
                feedbacksUser: state.feedbacksUser
            };
        case DELETE_FEEDBACK:
            return {
                ...state,
                deletedFeedback: action.payload,
                feedbacksLecture: state.feedbacksLecture.filter(feedback => feedback.id !== action.payload.id),
                feedbacksUser: state.feedbacksUser.filter(feedback => feedback.id !== action.payload.id)
            };
        default:
            return state;
    };
};

export default feedbackReducer;
