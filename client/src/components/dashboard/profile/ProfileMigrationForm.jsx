import {
    Button, Dialog,
    DialogActions, DialogContent, DialogTitle,
    FormControl,
    TextField,
    Paper
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { sendMigrationRequest } from '../../../redux/userReducer/userAction';
import { profileMigrationStyles } from './styles';

const validationSchema = yup.object({
    reason: yup
        .string('Ingresa el motivo de la migracion.')
        .required('El motivo es requerido.')
});

const ProfileMigrationForm = ({ id }) => {
    const dispatch = useDispatch();
    const styles = profileMigrationStyles();
    const [ open, setOpen ] = useState(false);
    const [ integrateDate, setIntegratedDate ] = useState('');
    const [ migration, setMigration ] = useState(false);
    const formik = useFormik({
        initialValues: {
            reason: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(sendMigrationRequest(id, values.reason, integrateDate));
            handleClose();
            resetForm();
            setIntegratedDate("");
            setMigration(true);
        }
    });
    useEffect(() => axios.get(`/migrations/listOne/${id}`)
    .then(res => {
        setMigration(res.data.message ? false : true)
    }), [id]);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
        <div className={styles.containerModal} >
            <Button variant="contained" disabled={migration} className={styles.RejectButton} onClick={handleClickOpen}>
                Migrar
            </Button>
            <Dialog open={open} onClose={handleClose} justify="center" aria-labelledby="form-dialog-title">
                <Paper elevation={9} style={{margin:"3%"}}>
                    <DialogTitle id="form-dialog-title" className={styles.title} >Formulario de migración</DialogTitle>
                    <form onSubmit={formik.handleSubmit} >
                        <FormControl>
                            <DialogContent>
                                <TextField
                                    id="reason"
                                    multiline
                                    rows={5}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    color="secondary"
                                    label="Motivo"
                                    value={formik.values.reason}
                                    onChange={formik.handleChange}
                                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                                    helperText={formik.touched.reason && formik.errors.reason}
                                />
                            </DialogContent>
                            <DialogContent>
                                <TextField
                                    type="date"
                                    color="secondary"
                                    fullWidth
                                    value={integrateDate}
                                    onChange={e => setIntegratedDate(e.target.value)}
                                    variant="outlined"
                                    required
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} size="small" variant="contained" color="secondary">
                                    Cancelar solicitud
                                </Button>
                                <Button type="submit" size="small" variant="contained" color="secondary">
                                    Enviar solicitud
                                </Button>
                            </DialogActions>
                        </FormControl>
                    </form>
                </Paper>
            </Dialog>
        </div>
    );
};

export default ProfileMigrationForm;
