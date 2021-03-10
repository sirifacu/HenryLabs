import axios from "axios";
import Swal from 'sweetalert2';
import { consoleLog } from '../../services/consoleLog'

export const POST_JOB = 'POST_JOB';
export const GET_JOBS = 'GET_JOBS';
export const DELETE_JOBS = 'DELETE_JOBS'
export const APPLY_JOB = 'APPLY_JOB'

export const postJob = (values) => (dispatch) => {
    return axios
     .post(`/jobs/post`, {
        title: values.title,
        type: values.type,
        contract: values.contract,
        webProfile: values.webProfile,
        salary: values.salary,
        description: values.description,
        requirements: values.requirements,
        benefits: values.benefits,
        others: values.others,
        language: values.language,
        seniority: values.seniority,
        applyType: values.applyType
    }).then((data) => {
        dispatch({
            type: POST_JOB,
            payload: data
        })
        Swal.fire({
            icon: 'success',
            title: 'Trabajo posteado correctamente',
        });
    }).catch(err => consoleLog(err));
}

export const getJobs = () => (dispatch) => {
    return axios
    .get(`/jobs/list`)
    .then((data) => {
        dispatch({
            type: GET_JOBS,
            payload: data
        })
    }).catch(err => consoleLog(err))
}

export const deleteJobs = (id) => (dispatch) => {
    return axios
    .delete(`/jobs/delete/${id}`)
    .then((data) => {
        dispatch({
            type: DELETE_JOBS,
            payload:data
        })    
        Swal.fire({
            icon: 'success',
            title: 'Trabajo eliminado',
        });
    }).catch((err)=> consoleLog(err))
}

//Aplicar a un trabajo
export const applyJob = (values) => (dispatch) => {
    const {jobId, userId, english, webProfile, others} = values
    console.log(values)
        return axios
        .post(`/apply/post`, { jobId, userId, english, webProfile, others
        }).then((data) => {
           dispatch({
                type: APPLY_JOB,
                payload: data
            })
            Swal.fire({
                icon: 'success',
                title: 'Postulación recibida',
            });
        }).catch(err => consoleLog(err));
}