import { GET_ALL_GROUPS, CREATE_GROUP, GET_GROUP } from './groupAction'

const initialState = {
    groups: [],
    students: []
}

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GROUPS: {
            return {
                ...state,
                groups: action.payload
            }
        }
        case CREATE_GROUP: {
            return {
                ...state,
                groups: [...state.groups, action.payload],
            } 
        }
        case GET_GROUP: {
            return {
                ...state,
                students: action.payload,
            }
        }
        default:
            return state
    }
}

export default groupReducer