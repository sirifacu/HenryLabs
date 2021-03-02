import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';
import Swal from 'sweetalert2';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_PM = 'GET_PM';
export const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
export const REGISTER_USER = 'REGISTER_USER'

export const getUsers = () => (dispatch) => {
    return axios.get('/users')
    .then(res => dispatch({type: GET_USERS, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const getUser = () => dispatch => {
    return axios.get('/users/:id')
    .then(response => {
        dispatch({type: GET_USER, payload: response.data})
    })
    .catch(error => {
        console.log(error)
    })
}

export const getStudents = () => (dispatch) => {
    return axios.get('/users/listAll?rol=Student')
    .then(res => {
        dispatch({type: GET_STUDENTS, payload: res.data})

    })
    .catch(e => console.log(e))
}

export const getPm = () => (dispatch) => {
    return axios.get('/users/listAll?rol=Pm')
    .then(res => {
        dispatch({type: GET_PM, payload: res.data})
    })
    .catch(e => console.log(e))
}

export const getInstructors = () => (dispatch) => {
    return axios.get('/users/listAll?rol=Instructor')
    .then(res => {
        const instructors = res.data.slice(0, res.data.length - 1).map(inst => inst.users[0]);
        dispatch({type: GET_INSTRUCTORS, payload: instructors });
    })
    .catch(err => consoleLog(err));
};

//Register user (register form)
export const registerUser = (values, userRole) => (dispatch) => {
    const roles = userRole
    const {firstName, lastName, email, password} = values
    return axios.post(`/users/createuser`, {
        firstName, lastName, email, password, roles
    }).then(res => {
        if(res.data.message){
            Swal.fire('Oops...', 
            'El usuario ya existe', 'error')
        } else {
            dispatch({
                type: REGISTER_USER,
                payload: res.data
            })
            Swal.fire('Felicitaciones', `
            Se ha registrado el usuario en HenryApp<br>`)
        }
    }).catch(err => consoleLog(err));
};