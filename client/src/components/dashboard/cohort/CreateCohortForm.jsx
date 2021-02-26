import React, { useState, useEffect } from 'react';
import { Container, MenuItem, TextField, Typography, Button, CssBaseline, FormControl, InputLabel, Select } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useStylesCohortForm } from './styles';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { createCohort } from '../../../redux/cohortReducer/cohortAction' 
import { getInstructors } from '../../../redux/userReducer/userAction'

const validationSchema = yup.object({
    title: yup
        .string('Enter cohort title.')
        .required('Cohort title is required.'),
    number: yup
        .number('Enter cohort number.')
        .required('Cohort number is required')
        .positive('Cohort number must be positive'),
    initialDate: yup
        .string("YYYY/MM/DD")
        .required('Start day is required'),
    instructor: yup
        .string('Enter Instructor')
  });

const CreateCohortForm = () => {
    const instructors = useSelector(state => state.userReducer.instructors)
    const dispatch = useDispatch();
    const style = useStylesCohortForm();
    const [newInstructor, setNewInstructor] = useState("")

    useEffect(() => {
        dispatch(getInstructors())
    }, [dispatch])

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
          initialHour: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            const {id, name} = JSON.parse(newInstructor)
            const finalForm = {...values, instructor_id: id, instructor_name: name}
            dispatch(createCohort(finalForm))
            formik.resetForm({});
            setNewInstructor("")
            showAlert();
        }
    });

    const handleInstructor = (element) => {
      setNewInstructor(element) 
    }
    
    return (
      <div className={style.cohortForm}>
        <form onSubmit={formik.handleSubmit}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography align="center" component="h4" variant="h4">
              Nuevo Cohorte
            </Typography>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Titulo"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
            <FormControl fullWidth color="secondary">
              <InputLabel>Instructor</InputLabel>
                <Select
                  id='instructor'
                  name='instructor'
                  value={ newInstructor ? newInstructor : ""}
                  onChange={(e) => handleInstructor(e.target.value)}
                >
                  {instructors?.map(item =>(
                    <MenuItem
                      key={item.id} 
                      value={ JSON.stringify({id: item.id, name: `${item.firstName} ${item.lastName}`}) }
                      >
                      {`${item.firstName} ${item.lastName}`}
                    </MenuItem>)
                  )}
              </Select>
            </FormControl>
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
            <TextField
              fullWidth
              id="initialDate"
              name="initialDate"
              label=""
              value={formik.values.initialDate}
              onChange={formik.handleChange}
              error={
                formik.touched.initialDate &&
                Boolean(formik.errors.initialDate)
              }
              helperText={
                formik.touched.initialDate && formik.errors.initialDate
              }
              required
              type="date"
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

export default CreateCohortForm;
