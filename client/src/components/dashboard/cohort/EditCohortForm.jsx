import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, Button, Dialog,DialogTitle, DialogContent, FormControl, InputLabel, Select, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructors } from '../../../redux/userReducer/userAction'
import { editCohort } from '../../../redux/cohortReducer/cohortAction'
import moment from 'moment'

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

const EditCohortForm = ({openEdit, setOpenEdit}) => {
    const instructors = useSelector(state => state.userReducer.instructors)
    const editingCohort = useSelector(state => state.cohortReducer.editingCohort)
    const dispatch = useDispatch();
    const [newInstructor, setNewInstructor] = useState("")

    useEffect(() => {
        dispatch(getInstructors())
    }, [dispatch])

    useEffect(() => {
        setNewInstructor(JSON.stringify({id: editingCohort.instructor_id, name: `${editingCohort.instructor_name}`}))
    }, [editingCohort, instructors])

    const showAlert = () => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cohorte editado',
            showConfirmButton: false,
            timer: 2000,
        });
    };



    const formik = useFormik({
        initialValues: {
          id:  editingCohort.id || "",
          title: editingCohort.title || "",
          number: editingCohort.number || 1,
          initialDate: moment(editingCohort.initialDate).format('YYYY-MM-DD') || "",
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            const {id, name} = JSON.parse(newInstructor)
            const finalForm = {...values, instructor_id: id, instructor_name: name}
            formik.resetForm({});
            handleClose() 
            dispatch(editCohort(finalForm))
            setNewInstructor("")
            showAlert();
        }
    });

    const handleInstructor = (element) => {
        setNewInstructor(element) 
    }

    const handleClose = () => {
        setOpenEdit(!openEdit);
      };

    return (
        <Dialog open={openEdit} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Editar Cohorte</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction='row' spacing={3} justify='center'>
                <Grid container item xs={12}>
                  <TextField
                    fullWidth
                    id="title"
                    color='secondary'
                    name="title"
                    label="Titulo"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    required
                  />
                </Grid>
                <Grid container item xs={12}>
                  <FormControl fullWidth color="secondary">
                    <InputLabel>Instructor</InputLabel>
                      <Select
                        id='instructor'
                        color='secondary'
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
                </Grid>
                <Grid container item xs={12}>
                  <TextField
                    fullWidth
                    id="number"
                    name="number"
                    color='secondary'
                    label="Numero"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.touched.number && Boolean(formik.errors.number)}
                    helperText={formik.touched.number && formik.errors.number}
                    required
                  />
                </Grid>
                <Grid container item xs={12}>
                  <TextField
                    fullWidth
                    id="initialDate"
                    name="initialDate"
                    color='secondary'
                    label=""
                    value={formik.values.initialDate}
                    onChange={(e) => formik.handleChange}
                    error={formik.touched.initialDate && Boolean(formik.errors.initialDate)}
                    helperText={formik.touched.initialDate && formik.errors.initialDate}
                    required
                    type="date"
                  />
                </Grid>
                <Grid container item xs={4} justify='center'>
                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                  Editar
                </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
    )
}

export default EditCohortForm
