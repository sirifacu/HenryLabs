import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_FILTERED_STUDENT = 'GET_FILTERED_STUDENT';
export const GET_FILTERED_STUDENT_COHORT = 'GET_FILTERED_STUDENT_COHORT';

export const getFilteredStudents = (name, cohortNumber, email, migrationsQuantity) => dispatch => {     
    let url = `/users/listUsersBy?name=${name ? name : ""}&cohortNumber=${cohortNumber ? cohortNumber : ""}&email=${email ? email : ""}&migrationsQuantity=${migrationsQuantity ? migrationsQuantity : ""}`
     return axios.get(url)
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



export const migrateStudents = (students, nextCohortId, ) => dispatch => {
    const promises = students ? students.map(student => {
        return new Promise((resolve, reject) => {
            resolve(
                axios.post(`/cohorts/${nextCohortId}/user/${student}`)
                    .then(() => axios.put(`/cohorts/changeMigrationQuantity/${student}`))
                )
            reject(err => consoleLog(err))
        })
    }) : [];
    Promise.all(promises)
    .then(() => axios.get('/users/listAll?role=student'))
    .then(res => dispatch({type: GET_FILTERED_STUDENT, payload: res.data}))
    .catch(err => consoleLog(err));
};
