import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_FILTERED_STUDENT = 'GET_FILTERED_STUDENT';


export const getFilteredStudents = (name, cohortNumber, email, migrationsQuantity) => (dispatch, getState) => {
    let url = `/users/listUsersBy?name=${name ? name : ""}&cohortNumber=${cohortNumber ? cohortNumber : ""}&email=${email ? email : ""}&migrationsQuantity=${migrationsQuantity ? migrationsQuantity : ""}`
     return axios.get(url, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => {
        dispatch({ type: GET_FILTERED_STUDENT, payload: res.data })})
    .catch(err => consoleLog(err));
};

export const migrateStudents = (students, nextCohortId, ) => (dispatch, getState) => {
    const promises = students ? students.map(student => {
        return new Promise((resolve, reject) => {
            resolve(
                axios.post(`/cohorts/${nextCohortId}/user/${student}`, {},{ headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
                    .then(() => axios.put(`/cohorts/changeMigrationQuantity/${student}`,
                      {}, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }}))
                )
            reject(err => consoleLog(err))
        })
    }) : [];
    Promise.all(promises)
    .then(() => axios.get('/users/listAll?role=student',
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }}))
    .then(res => dispatch({type: GET_FILTERED_STUDENT, payload: res.data}))
    .catch(err => consoleLog(err));
};
