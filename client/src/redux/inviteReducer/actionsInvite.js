import axios from "axios";
export const INVITE_STUDENT= 'INVITE_STUDENT';

export const inviteStudent = (data) => (dispatch) => {
    data && data.map((student, i) => {
        const createUser = async () => {
            await axios
            .post(`http://localhost:3005/api/user`, {
                firstName: student[0],
                lastName: student[1],
                email: student[2],
                password: student[3]
            })
        }
        createUser()      
        //falta hacer nodemailer
        //y una nueva ruta para verificar si ya esta ese mail q no lo vuelva a crear
    })
    dispatch({
        type: INVITE_STUDENT,
        payload: data
    })
}