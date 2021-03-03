import axios from "axios";
import { consoleLog } from '../../services/consoleLog';

export const INVITE_STUDENT= 'INVITE_STUDENT';

export const inviteStudent = (data) => (dispatch) => {
    const promises = data && data.map((student) => {
        new Promise((resolve, reject) => {
            resolve(
                axios
                .post(`/users/createUser`, {
                    firstName: student[0],
                    lastName: student[1],
                    email: student[2],
                    password: student[3]
                })
                .then((res) => {
                    axios
                    .post(`/users/invite`, {
                        firstName: student[0],
                        lastName: student[1],
                        email: student[2],
                    })
                })
            )
        })
    })
    Promise.all(promises)
    .then(() => dispatch({ type: INVITE_STUDENT, payload: data }))   
    .catch(err => consoleLog(err));
}