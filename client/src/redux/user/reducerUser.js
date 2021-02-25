export const GET_USERS = "GET_USERS"
export const GET_USER = "GET_USER"


const initialValues = {
    userList: [],
    user: {}
}


export default function userListReducer (state=initialValues, action){
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                userList: action.payload
            }

        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
            
            default:
                return state
            }
}


