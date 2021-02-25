import { GET_USERS, GET_INSTRUCTORS } from './userAction'

const initialState = {
    users: [],
    instructors: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }
        case GET_INSTRUCTORS: {
            return {
                ...state,
                instructors: action.payload
            }
        }
        default:
            return state
    }
}