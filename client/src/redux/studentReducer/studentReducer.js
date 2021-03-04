import { GET_FILTERED_STUDENT } from './studentAction';

const initialState = {
    students: [],
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILTERED_STUDENT: {
            return {
                ...state,
                students: action.payload
            };
        }
        default: {
            return state
        }
    };
};

export default studentReducer
