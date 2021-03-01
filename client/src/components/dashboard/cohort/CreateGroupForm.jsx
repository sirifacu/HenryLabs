import React, { useState, useEffect } from 'react';
import { Container, MenuItem, TextField, Typography, Button, CssBaseline, FormControl, InputLabel, Select } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useStylesCohortForm } from './styles';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../redux/groupReducer/actionsGroup' 
import { getCohorts } from '../../../redux/cohortReducer/cohortAction';
import { useParams } from 'react-router-dom'

const validationSchema = yup.object({
    number: yup
        .number('Enter cohort number.')
        .required('Cohort number is required')
        .positive('Cohort number must be positive'),
  });

const CreateGroupForm = () => {
    const  {id}  = useParams();
    const dispatch = useDispatch();
    const style = useStylesCohortForm();

    const showAlert = () => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Grupo creado correctamente!',
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const formik = useFormik({
        initialValues: {
          number: 0
        },
        validationSchema: validationSchema,
        onSubmit: values => {
          console.log(id)
            const finalForm = {...values, cohortId: id }
            dispatch(createGroup(finalForm))
            formik.resetForm({});
            showAlert();
        }
    });

    
    return (
      <div >
        <form onSubmit={formik.handleSubmit}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography align="center" component="h4" variant="h4">
              Nuevo Grupo
            </Typography>
            <TextField
              fullWidth
              id="number"
              name="number"
              label="Numero"
              value={formik.values.number}
              onChange={formik.handleChange}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
              required
            />
          </Container>
          <Button
            className={style.submitButton}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </div>
    );
};

export default CreateGroupForm;
