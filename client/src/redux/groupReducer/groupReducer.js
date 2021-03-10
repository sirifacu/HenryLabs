import { GET_ALL_GROUPS, CREATE_GROUP, GET_GROUP, GET_FILTERED_PMS } from './actionsGroup'

const initialState = {
    groups: [],
    students: [],
    filteredPms: []
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

        case GET_FILTERED_PMS: {
            return {
                ...state,
                filteredPms: action.payload,
            }
        }
        default:
            return state
    }
}

export default groupReducer