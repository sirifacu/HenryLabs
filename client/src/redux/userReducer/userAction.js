import axios from 'axios';

export const GET_USERS = 'GET_USERS';

export const getUsers = () => (dispatch) => {
    return axios.get('http://localhost:3005/api/user')
    .then(res => {
        dispatch({type: GET_USERS, payload: res.data})
    })
    .catch(e => console.log(e))
}