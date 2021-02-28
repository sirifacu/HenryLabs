import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_PM = 'GET_PM';
export const GET_INSTRUCTORS = 'GET_INSTRUCTORS';
export const GET_INFO_USER_COHORT = 'GET_INFO_USER_COHORT';
export const GET_USER_BY_ROLE = 'GET_USER_BY_ROLE';

export const getUsers = () => (dispatch) => {
    return axios.get('/users/listAll')
    .then(res => dispatch({type: GET_USERS, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const getUser = (id) => dispatch => {
    return axios.get(`/users/${id}`)
    .then(response => {
        dispatch({type: GET_USER, payload: response.data})
    })
    .catch(error => {
        console.log(error)
    })
}

export const getStudents = () => (dispatch) => {
    return axios.get('/users/students')
    .then(res => {
        dispatch({type: GET_STUDENTS, payload: res.data})
    })
    .catch(e => console.log(e))
}

export const getPm = () => (dispatch) => {
    return axios.get('/users/pm')
    .then(res => {
        dispatch({type: GET_PM, payload: res.data})
    })
    .catch(e => console.log(e))
}

export const getInstructors = () => (dispatch) => {
    return axios.get('/users/instructors')
    .then(res => {
        const instructors = res.data.slice(0, res.data.length - 1).map(inst => inst.users[0]);
        dispatch({type: GET_INSTRUCTORS, payload: instructors });
    })
    .catch(err => consoleLog(err));
};

export const getInfoUserCohort = (userId) => (dispatch) => {
    return axios.get(`/users/infoCohort/${userId}`)
      .then(res => {
          const { id, title, number, instructor_name } = res.data.cohorts[0];
          dispatch({type: GET_INFO_USER_COHORT, payload: { id, title, number, instructor: instructor_name }});
      })
      .catch(err => consoleLog(err));
};

export const getUsersByRole = (role) => (dispatch) => {
    return axios.get(`/users/listAll?role=${role}`)
      .then(res => {
          const usersByRole = res.data[0].users;
          dispatch({type: GET_USER_BY_ROLE, payload: usersByRole });
      })
      .catch(err => consoleLog(err));
};
