import axios from "axios";
import Swal from "sweetalert2";
import { consoleLog } from "../../services/consoleLog";

export const POST_BOOM = "POST_BOOM";
export const GET_BOOMS = "GET_BOOMS";
export const CHANGE_STATUS = "CHANGE_STATUS"

export const postBoom = (values) => (dispatch, getState) => {
  return axios
    .post(`/booms/post`, {
      student: values.student,
      previousStudies: values.previousStudies,
      position: values.position,
      company: values.company,
      country: values.country,
      incomeImprovement: values.incomeImprovement,
      whatYouDidBefore: values.whatYouDidBefore,
      thanks: values.thanks,
      comments: values.comments,
      createdAt: values.createdAt
    },
    { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }}
    )
    .then((data) => {
      dispatch({
        type: POST_BOOM,
        payload: data,
      });
      Swal.fire({
        icon: "success",
        title: "Boom posteado correctamente",
      });
    })
    .catch((err) => consoleLog(err));
};

export const getBooms = () => (dispatch, getState) => {
  return axios
    .get(`/booms/listAll`, { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
    .then((data) => {
      dispatch({
        type: GET_BOOMS,
        payload: data,
      });
    })
    .catch((err) => consoleLog(err));
};

export const getBoomsByStatus = ( status ) => (dispatch, getState) => {
  return axios
  .get(`/booms/listAll?status=${status}`, { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
  .then( data => {
    dispatch({
      type: GET_BOOMS,
      payload: data
    })
  })
  .catch( error => {
    console.log(error)
  })
}

