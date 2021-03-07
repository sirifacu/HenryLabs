import axios from 'axios';
import Swal from 'sweetalert2';
import { consoleLog } from '../../services/consoleLog';

export const GET_FILTERED_STUDENT = 'GET_FILTERED_STUDENT';
export const GET_FILTERED_STUDENT_COHORT = 'GET_FILTERED_STUDENT_COHORT';


export const getFilteredStudents = (name, cohortNumber, email, migrationsQuantity) => (dispatch, getState) => {
    let url = `/users/listUsersBy?name=${name ? name : ""}&cohortNumber=${cohortNumber ? cohortNumber : ""}&email=${email ? email : ""}&migrationsQuantity=${migrationsQuantity ? migrationsQuantity : ""}`
     return axios.get(url, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => {
        dispatch({ type: GET_FILTERED_STUDENT, payload: res.data })})
    .catch(err => consoleLog(err));
};

export const getFilteredStudentsByCohort = (cohortId, name, email, github, migrationsQuantity) => dispatch => {
    let url = `/users/listUsers/cohort/${cohortId}?name=${name ? name : ""}&github=${github ? github : ""}&email=${email ? email : ""}&migrationsQuantity=${migrationsQuantity ? migrationsQuantity : ""}`
     return axios.get(url)
    .then(res => {
        dispatch({ type: GET_FILTERED_STUDENT_COHORT, payload: res.data })})
    .catch(err => consoleLog(err));
};

export const migrateStudents = (students, nextCohortId, ) => (dispatch, getState) => {
    const message = []
    const promises = students ? students.map(student => {
        return new Promise((resolve, reject) => {
            resolve(
                axios.post(`/cohorts/${nextCohortId}/user/${student}`, {},{ headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
                    .then(async res => {
                        if(!res.data.message){
                           await axios.put(`/cohorts/changeMigrationQuantity/${student}`,
                      {}, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
                        } else {
                            message.push(res.data.message)
                        }
                    })
                )
            reject(err => consoleLog(err))
        })
    }) : [];
    Promise.all(promises)
    .then(() => axios.get('/users/listUsersBy',
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }}))
    .then(res => dispatch({type: GET_FILTERED_STUDENT, payload: res.data}))
    .then( () => message.length && Swal.fire('Oops...', message[0], 'error'))
    .catch(err => consoleLog(err));
};


