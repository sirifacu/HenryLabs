import { GET_FILTERED_STUDENT, GET_FILTERED_STUDENT_COHORT } from './studentAction';

const initialState = {
    students: [],
    studentsCohort: [],
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILTERED_STUDENT: {
            return {
                ...state,
                students: action.payload
            };
        }
        case GET_FILTERED_STUDENT_COHORT: {
            return {
                ...state,
                studentsCohort: action.payload
            };
        }
       
        default: {
            return state
        }
    };
};

export default studentReducer
