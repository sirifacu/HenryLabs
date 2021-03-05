import axios from "axios";
import Swal from 'sweetalert2';
import { consoleLog } from '../../services/consoleLog';

export const INVITE_STUDENT= 'INVITE_STUDENT';

const token = localStorage.getItem('data');

export const inviteStudent = (data) => (dispatch) => {
    if(data[0][0] === ""){
        Swal.fire('Oops...', 'El csv está vacio', 'error')
    }else{
        const promises = data && data.map((student) => {
                new Promise((resolve, reject) => {
                    resolve(
                        axios
                        .post(`/users/createUser`, {
                            firstName: student[0],
                            lastName: student[1],
                            email: student[2],
                            password: student[3],
                            roles: ['student']
                        }, { headers: {'Authorization': 'Bearer ' + token }})
                        .then((res) => {
                            axios
                            .post(`/users/invite`, {
                                firstName: student[0],
                                lastName: student[1],
                                email: student[2],
                            }, { headers: {'Authorization': 'Bearer ' + token }})
                        })
                        .then((res) => {Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Alumnos invitados correctamente',
                        })})
                    )
                })
        })
        Promise.all(promises)
        .then(() => dispatch({ type: INVITE_STUDENT, payload: data }))
        .catch(err => consoleLog(err));
    }
}
