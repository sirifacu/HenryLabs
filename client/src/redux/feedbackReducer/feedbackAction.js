import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const LIST_ALL_FEEDBACKS_FROM_LECTURE = 'LIST_ALL_FEEDBACKS_FROM_LECTURE';
export const GET_FEEDBACK_FROM_USER = 'GET_FEEDBACK_FROM_USER';
export const LIST_ALL_FEEDBACKS_FROM_USER = 'LIST_ALL_FEEDBACKS_FROM_USER';
export const GET_FEEDBACK = 'GET_FEEDBACK';
export const GET_AVERAGE_FEEDBACKS_FROM_USER = 'GET_AVERAGE_FEEDBACKS_FROM_USER';
export const GET_AVERAGE_FEEDBACKS_FROM_LECTURE = 'GET_AVERAGE_FEEDBACKS_FROM_LECTURE';
export const POST_FEEDBACK = 'POST_FEEDBACK';
export const CHANGE_FEEDBACK = 'CHANGE_FEEDBACK';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';
export const CHANGE_DONE = 'CHANGE_DONE';
export const GET_ALL_FEEDBACKS = 'GET_ALL_FEEDBACKS';
export const GET_AVERAGES = 'GET_AVERAGES';

export const getAllFeedbacks = (lectureRating, lectureComment, instructorRating, instructorComment, 
                                cohortNumber, lectureTitle, email) => (dispatch, getState) => {
  	const url = `/feedbacks/listAllFeedbacks?lectureRating=${lectureRating 
                                                             ? lectureRating : ""}&lectureComment=${lectureComment 
                                                             ? lectureComment : ""}&instructorRating=${instructorRating 
                                                             ? instructorRating : ""}&instructorComment=${instructorComment 
                                                             ? instructorComment : ""}&cohort=${cohortNumber 
                                                             ? cohortNumber : ""}&lectureTitle=${lectureTitle 
                                                             ? lectureTitle : ""}&email=${email 
                                                             ? email : ""}`;
    return axios.get(url, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_ALL_FEEDBACKS, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getFeedbackNumbers = ratingType => (dispatch, getState) => {
	return axios.get('/feedbacks/averages', 
	{ headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
	.then(res => dispatch({ type: GET_AVERAGES, payload: res.data }))
	.catch(err => consoleLog(err));
};

export const getAllFeedbacksFromLecture = lectureId => (dispatch, getState) => {
    return axios.get(`/feedbacks/listAll/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: LIST_ALL_FEEDBACKS_FROM_LECTURE, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getFeedbackFromUser = (lectureId, userId) => (dispatch, getState) => {
    return axios.get(`/feedbacks/list/user/${userId}/lecture/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_FEEDBACK_FROM_USER, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getAllFeedbacksFromUser = userId => (dispatch, getState) => {
    return axios.get(`/feedbacks/list/user/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: LIST_ALL_FEEDBACKS_FROM_USER, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getFeedback = feedbackId => (dispatch, getState) => {
    return axios.get(`/feedbacks/feedback/${feedbackId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_FEEDBACK, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getAverageFeedbacksFromUser = userId => (dispatch, getState) => {
    return axios.get(`/feedbacks/average/user/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_AVERAGE_FEEDBACKS_FROM_USER, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getAverageFeedbacksFromLecture = lectureId => (dispatch, getState) => {
    return axios.get(`/feedbacks/average/lecture/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_AVERAGE_FEEDBACKS_FROM_LECTURE, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const postFeedback = (userId, lectureRating, lectureComment, instructorRating, instructorComment, lectureId) => (dispatch, getState) => {
    return axios.post('/feedbacks/feedback', { userId, lectureRating, lectureComment, instructorRating, instructorComment, lectureId },
    { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: POST_FEEDBACK, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const changeFeedback = (feedbackId, rating, comment) => (dispatch, getState) => {
    return axios.put(`/feedbacks/feedback/${feedbackId}`, { rating, comment },
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: CHANGE_FEEDBACK, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const deleteFeedback = feedbackId => (dispatch, getState) => {
    return axios.delete(`/feedbacks/feedback/${feedbackId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: DELETE_FEEDBACK, payload: true }))
    .catch(err => consoleLog(err));
};
