import { GET_REQUESTS } from './migrationRequestsActions';

const initialState = { 
    requests: [],
    status: 'pending'
}

const migrationRequestsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REQUESTS: {
            return {
                ...state,
                requests: action.payload.requests,
                status: action.payload.status
            }
        }
        default: return state
    }
}

export default migrationRequestsReducer;
