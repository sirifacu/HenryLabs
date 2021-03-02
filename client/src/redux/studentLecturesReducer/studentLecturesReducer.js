import { GET_STUDENT_COHORT, GET_MODULES, GET_LECTURES, GET_LECTURE_DETAIL, SEND_ERROR, CLEAN_ERROR, CLEAN_LECTURES } from './studentLecturesAction';

const initialState = {
    cohort: {},
    modules: [],
    lectures: [],
    lectureDetail: {},
    message: ""
}

const studentLecturesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_STUDENT_COHORT: {
            return {
                ...state,
                cohort: action.payload
            }
        }
        case GET_MODULES: {
            return {
                ...state,
                modules: action.payload
            }
        }
        case GET_LECTURES: {
            return {
                ...state,
                lectures: action.payload
            }
        }
        case GET_LECTURE_DETAIL: {
            return {
                ...state,
                lectureDetail: action.payload
            }
        }
        case SEND_ERROR: {
            return {
                ...state,
                message: "No te han asignado a ningún cohorte aún."
            }
        }
        case CLEAN_ERROR: {
            return {
                ...state,
                message: ''
            }
        }
        case CLEAN_LECTURES: {
            return {
                ...state,
                lectures: [],
                lectureDetail: {}
            }
        }
        default: return state;
    }
}

export default studentLecturesReducer;