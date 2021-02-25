import axios from "axios";
export const INVITE_STUDENT= 'INVITE_STUDENT';

export const inviteStudent = (data) => (dispatch) => {
    console.log('data action', data)
    data && data.map((student, i) => {
    return axios
            .post(`/user`, {
                firstName: student[0],
                lastName: student[1],
                email: student[2],
                password: student[3]
            }).then(() => {
                axios
               .post(`/user/invite`, {
                   firstName: student[0],
                   lastName: student[1],
                   email: student[2],
               })
            })
    })
    dispatch({
        type: INVITE_STUDENT,
        payload: data
    })
}