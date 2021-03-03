import axios from 'axios';
import { divideLecturesByModules } from '../../services/divideLecturesByModules'

export const GET_STUDENT_COHORT = 'GET_STUDENT_COHORT';
export const GET_MODULES = 'GET_MODULES';
export const GET_LECTURES = 'GET_LECTURES';
export const GET_LECTURE_DETAIL = 'GET_LECTURE_DETAIL';
export const CLEAN_LECTURES = 'CLEAN_LECTURES';
export const SEND_ERROR = 'SEND_ERROR';
export const CLEAN_ERROR = 'CLEAN_ERROR';

export const getStudentCohort = userId => dispatch => {
    axios.get(`/cohorts/user/${userId}`)
    .then(res => { 
        dispatch({ type: GET_STUDENT_COHORT, payload: res.data[0] })
        return res.data[0] && res.data[0].id
    })
    .then(res => {
        if(res){
            axios.get(`/lectures/listAll?cohortId=${res}`)
            .then(res => dispatch({ type: GET_MODULES, payload: divideLecturesByModules(res.data) }))
        } else {
            dispatch({type: SEND_ERROR})
        }
    })
}

export const getLectures = item => {
    return {type: GET_LECTURES, payload: item}
}

export const getLectureDetail = item => {
    return { type: GET_LECTURE_DETAIL, payload: item }
}

export const cleanLectures = () => {
    return {type: CLEAN_LECTURES}
}