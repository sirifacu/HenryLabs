import axios from "axios";
import Swal from "sweetalert2";
import { consoleLog } from "../../services/consoleLog";

export const POST_BOOM = "POST_BOOM";
export const GET_BOOMS = "GET_BOOMS";
export const DELETE_BOOM = "DELETE_BOOM";

export const postBoom = (values) => (dispatch) => {
  return axios
    .post(`/booms/post`, {
      title: values.title,
      student: values.student,
      job: values.job,
      company: values.company,
      description: values.description,
    })
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

export const getBooms = () => (dispatch) => {
  return axios
    .get(`/booms/list`)
    .then((data) => {
      dispatch({
        type: GET_BOOMS,
        payload: data,
      });
    })
    .catch((err) => consoleLog(err));
};

export const deleteBoom = () => (dispatch) => {
  return axios
    .delete(``)
    .then((data) => {})
    .catch((err) => consoleLog(err));
};
