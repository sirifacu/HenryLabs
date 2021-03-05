import {
    Button, Dialog,
    DialogActions, DialogContent, DialogTitle,
    FormControl,
    TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { sendMigrationRequest } from '../../../redux/userReducer/userAction';
import { profileMigrationStyles } from './styles';

const validationSchema = yup.object({
    reason: yup
        .string('Enter cohort title.')
        .required('Cohort title is required.')
});

const ProfileMigrationForm = ({ id, minCohort }) => {
    const dispatch = useDispatch();
    const styles = profileMigrationStyles();
    const [ open, setOpen ] = useState(false);
    const [ cohort, setCohort ] = useState();
    const formik = useFormik({
        initialValues: {
            reason: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log("DISPATCH: ", values);
            dispatch(sendMigrationRequest(id, values.reason, cohort));
            handleClose();
        }
    })

    useEffect(() => {
        minCohort && setCohort(minCohort + 1);
    }, [minCohort]);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleChangeCohort = value => {
        (value > minCohort && value < minCohort + 6) && setCohort(value);
    };

    return (
        <div className={styles.containerModal} >
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Migrar
            </Button>
            <Dialog open={open} onClose={handleClose} justify="center" aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" className={styles.title} >Formulario de migración</DialogTitle>
                <form onSubmit={formik.handleSubmit} >
                    <FormControl>
                        <DialogContent>
                            <TextField
                                id="reason"
                                multiline
                                fullWidth
                                required
                                variant="outlined"
                                label="Motivo"
                                value={formik.values.reason}
                                onChange={formik.handleChange}
                                error={formik.touched.reason && Boolean(formik.errors.reason)}
                                helperText={formik.touched.reason && formik.errors.reason}
                            />
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                type="number"
                                min={minCohort && minCohort }
                                max={minCohort && minCohort + 6 }
                                fullWidth
                                label="Cohorte"
                                value={cohort}
                                onChange={e => handleChangeCohort(e.target.value)}
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} className={styles.button} variant="outlined" color="primary">
                                Cancelar solicitud
                            </Button>
                            <Button type="submit" className={styles.button} variant="outlined" color="primary">
                                Enviar solicitud
                            </Button>
                        </DialogActions>
                    </FormControl>
                </form>
            </Dialog>
        </div>
    );
};

export default ProfileMigrationForm;
