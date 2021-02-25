import { GET_USERS, GET_USER } from './reducerUser' 
import axios from 'axios'

export const getUsers = () => dispatch => {
    const url = "http://localhost:3005/api/user"
    axios.get(url)
    .then(response => {
        dispatch({type: GET_USERS, payload: response.data})
    })
    .catch(error => {
        console.log(error)
    })
}

export const getUser = () => dispatch => {
    const url = "http://localhost:3005/api/user/:id"
    axios.get(url)
    .then(response => {
        dispatch({type: GET_USER, payload: response.data})
        console.log('AQUI DATA: ', response.data)
    })
    .catch(error => {
        console.log(error)
    })
}