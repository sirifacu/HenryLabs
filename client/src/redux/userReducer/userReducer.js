import { GET_USERS, GET_USER, GET_INSTRUCTORS, GET_STUDENTS, GET_PM, GET_INFO_USER_COHORT, GET_USER_BY_ROLE, UPDATE_USER } from './userAction'

const initialState = {
    users: [],
    user: {},
    usersByRole: [],
    students: [],
    pm: [],
    instructors: [],
    infoUserCohort: {},
    updatedUser: false,
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }

        case GET_USER:{
            return {
                ...state,
                user: action.payload
            }
        }

        case GET_STUDENTS:{
            return {
                ...state,
                students: action.payload
            }
        }

        case GET_PM:{
            return {
                ...state,
                pm: action.payload
            }
        }

        case GET_INSTRUCTORS: {
            return {
                ...state,
                instructors: action.payload
            }
        }
        case GET_INFO_USER_COHORT: {
            return {
                ...state,
                infoUserCohort: action.payload
            }
        }
        case GET_USER_BY_ROLE: {
            return {
                ...state,
                usersByRole: action.payload
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                updatedUser: true
            }
        }
        default:
            return state
    }
}
