import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_FILTERED_STUDENT = 'GET_FILTERED_STUDENT';

export const getFilteredStudents = (name, cohortNumber, email, migrationsQuantity) => dispatch => {
    return axios.get(`/users/listUsersBy?${name ? 'name=' + name : ''}&${cohortNumber ? 'cohortNumber=' + cohortNumber : ''}&${email ? 'email=' + email : ''}&${migrationsQuantity ? 'migrationsQuantity=' + migrationsQuantity : ''}`)
    .then(res => dispatch({ type: GET_FILTERED_STUDENT, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const migrateStudents = (students, nextCohortId) => dispatch => {
    const promises = students ? students.map(student => {
        return new Promise((resolve, reject) => {
            resolve(
                axios.post(`/cohorts/${nextCohortId}/user/${student.id}`)
                .then(() => student.cohorts.length && axios.post(`/remove/cohorts/${student.cohorts[0].id}/user/${student.id}`))
                .then(() => axios.put(`/users/changeMigrationQuantity/${student.id}`))
                )
            reject(err => consoleLog(err))
        })
    }) : [];
    Promise.all(promises)
    .then(() => axios.get('/users/listAll?role=student'))
    .then(res => dispatch({type: GET_FILTERED_STUDENT, payload: res.data}))
    .catch(err => consoleLog(err));
};
