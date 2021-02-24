import axios from 'axios'
import { consoleLog } from '../../services/consoleLog';


export const GET_ALL_COHORTS = 'GET_ALL_COHORTS';



export const getAllCohorts = () => (dispatch) => {
    return axios.get('/cohorts/get/all')
    .then(res => {
        dispatch({type: GET_ALL_COHORTS, payload: res.data})
    })
}