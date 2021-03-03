import { GET_FILTERED_STUDENT } from './studentAction';

initialState = {
    students: [],
};

const studentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILTERED_STUDENT: {
            return {
                ...state,
                students: action.payload
            };
        }
        default: 
            return state;
    };
};

export default studentsReduce
