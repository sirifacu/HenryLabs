import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_REQUESTS = 'GET_REQUESTS'

export const getRequests = status => dispatch => {
    return axios.get(`migrations/listAll?status=${status}`)
    .then(res => dispatch({ type: GET_REQUESTS, payload: {requests: res.data, status} }))
    .catch(err => consoleLog(err));
};

export const changeStatus = (requests, status, cohortId) => dispatch => {
    const promises = requests.length ? requests.map( request => {
        return new Promise((resolve, reject) => {
            resolve (
                axios.put(`migrations/changeStatus/${request.id}`, { status })
                .then(res => {
                    if(res.data.status === 'accepted'){
                        axios.post(`/cohorts/${cohortId}/user/${request.users[0].id}`)
                    };
                }) 
            )
        })
    }) : [];
    Promise.all(promises)
    .then(() => axios.get('migrations/listAll?status=pending')
        .then(res => dispatch( { type: GET_REQUESTS, payload: {requests: res.data, status: "pending"} } ))
    )
    .catch(err => consoleLog(err));
};
