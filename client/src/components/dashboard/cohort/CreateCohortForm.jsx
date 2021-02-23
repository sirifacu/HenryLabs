import React, { useState } from 'react';
import { Container, TextField, Typography, Button, CssBaseline, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useStylesCohortForm } from './styles';
import Swal from 'sweetalert2';

const validationSchema = yup.object({
    title: yup
        .string('Enter cohort title.')
        .required('Cohort title is required.'),
    number: yup
        .number('Enter cohort number.')
        .required('Cohort number is required')
        .positive('Cohort number must be positive'),
    initialDate: yup
        .date('Enter start date of cohort.')
        .required('Start day is required'),
  });

const CreateCohortForm = () => {
    const style = useStylesCohortForm();

    const [ loading, setLoading ] = useState(false);

    const showAlert = () => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cohort created succesfully!',
            showConfirmButton: false,
            timer: 2000,
        });
    };



    const formik = useFormik({
        initialValues: {
          title: '',
          number: 0,
          initialDate: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            setLoading(true);
            showAlert();
        }
    });

    const form = () => {
        return (
            <div className={style.cohortForm}>
                <form onSubmit={formik.handleSubmit} >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Typography align='center' component="h4" variant="h4">New Cohort</Typography>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            required
                        />
                         <TextField
                            fullWidth
                            id="number" 
                            name="number"
                            label="Number"
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            error={formik.touched.number && Boolean(formik.errors.number)}
                            helperText={formik.touched.number && formik.errors.number}
                            required
                        />
                        <TextField
                            fullWidth
                            multiline
                            id="initialDate" 
                            name="initialDate"
                            label="Initia Date"
                            value={formik.values.initialDate}
                            onChange={formik.handleChange}
                            error={formik.touched.initialDate && Boolean(formik.errors.initialDate)}
                            helperText={formik.touched.initialDate && formik.errors.initialDate}
                            required
                        />
                    </Container>
                    <Button className={style.submitButton} color="primary" variant="contained" fullWidth type="submit" >
                            Submit
                        </Button>
                </form>
            </div>
        );
    }

    return loading ? <CircularProgress disableShrink className={style.isLoading} /> : form() ;
};

export default CreateCohortForm;
