import { GET_USERS, GET_USER, GET_INSTRUCTORS, GET_STUDENTS, GET_PM, REGISTER_USER } from './userAction'

const initialState = {
    users: [],
    user: {},
    students: [],
    pm: [],
    instructors: [],
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

        case REGISTER_USER: {
            return {
                ...state,
                users: state.users.concat(action.payload)
            }
        }

        default:
            return state
    }
}