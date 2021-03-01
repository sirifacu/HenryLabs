    import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_ALL_COHORTS = 'GET_ALL_COHORTS';
export const CREATE_COHORT = 'CREATE_COHORT';
export const GET_COHORT = 'GET_COHORT';

export const getCohorts = () => (dispatch) => {
    return axios.get('/cohorts/getAll')
    .then(res => dispatch({type: GET_ALL_COHORTS, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const createCohort = (data) => (dispatch) => {
   return axios.post('/cohorts/create ', {
       title: data.title,
       number: data.number,
       initialDate: data.initialDate,
       instructor_id: data.instructor_id,
       instructor_name: data.instructor_name
    }).then(res => dispatch({type: CREATE_COHORT, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const getCohort =  (id) => (dispatch) => {
    return axios.get(`/cohorts/${id}/user`)
    .then(res => dispatch({type: GET_COHORT, payload: res.data}))
    .catch(e =>  consoleLog(e));
};
