import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, Button, Dialog,DialogTitle, DialogContent, FormControl, InputLabel, Select, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup, getFilteredPms } from '../../../redux/groupReducer/actionsGroup';
import { getCohortPm, getPm } from '../../../redux/userReducer/userAction';
import { getCohorts } from '../../../redux/cohortReducer/cohortAction'
import { useParams } from 'react-router-dom';


const validationSchema = yup.object({
    number: yup
        .number('Enter number group.')
        .required('Group number is required.')
        .positive('Cohort number must be positive.'),
    pm1: yup
        .string('Enter PM 1.')
        .required('Enter PM'),
    pm2: yup
        .string('Enter PM 2.')
        .required('Enter PM'),
    cohort: yup
        .number('Enter cohort number.')
        .required('Cohort number is required')
  });

const CreateGroupForm = () => {
    const { id } = useParams()
    const pms = useSelector(state => state.userReducer.pm)
    const cohorts = useSelector(state => state.cohortReducer.cohorts)
    const dispatch = useDispatch();
    const [newPm1, setNewPm1] = useState("")
    const [newPm2, setNewPm2] = useState("")
    const [ cohort, setCohort ] = useState("");
    const [open, setOpen] = useState(false)

     useEffect(() => {
        dispatch(getCohorts())
        dispatch(getPm())
        // dispatch(getCohortPm(cohortNumber))
    }, [dispatch])


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
          number: 0,
          pm1: '',
          pm2: '',
          cohort: 0
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            const {pm1} = JSON.parse(newPm1)
            const {pm2} = JSON.parse(newPm2)
            const finalForm = {...values, pm1: pm1, pm2: pm2}
            dispatch(createGroup(finalForm))
            formik.resetForm({});
            setNewPm1("")
            setNewPm2("")
            showAlert();
            handleClose()
        }
    });
    const handlePm1 = (element) => {
      setNewPm1(element) 
    }

    const handlePm2 = (element) => {
        setNewPm2(element) 
      }

    const handleCohort = (element) => {
      setCohort(element)
    }


    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Crear un nuevo Grupo
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Crear Grupo</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container direction='row' spacing={3} justify='center'>
                <Grid container item xs={12}>
                  <TextField
                    fullWidth
                    id="number"
                    color='secondary'
                    name="number"
                    label="Número"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.touched.number && Boolean(formik.errors.number)}
                    helperText={formik.touched.number && formik.errors.number}
                    required
                  />
                </Grid>
                <Grid container item xs={12}>
                  <FormControl fullWidth color="secondary">

                    <InputLabel>Numero de cohorte</InputLabel>
                      <Select
                        id='cohort'
                        color='secondary'
                        name='cohort'
                        value={cohort}
                        onChange={(e) => setCohort(e.target.value)}
                      >
                      { cohorts.map(cohort => <MenuItem  key={cohort.id} value={cohort.number} >{`Cohorte ${cohort.number}`}</MenuItem>)}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth color="secondary">
                    <InputLabel>PM 1</InputLabel>
                      <Select
                        id='pm1'
                        color='secondary'
                        name='pm1'
                        value={ newPm1 ? newPm1 : ""}
                        onChange={(e) => handlePm1(e.target.value)}
                      >
                        {pms?.map(item =>(
                          <MenuItem
                            key={item.id} 
                            value={ JSON.stringify({id: item.id, name: `${item.firstName} ${item.lastName}`}) }
                            >
                            {`${item.firstName} ${item.lastName}`}
                          </MenuItem>)
                        )}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth color="secondary">
                    <InputLabel>PM 2</InputLabel>
                      <Select
                        id='pm2'
                        color='secondary'
                        name='pm2'
                        value={ newPm2 ? newPm2 : ""}
                        onChange={(e) => handlePm2(e.target.value)}
                      >
                        {pms?.map(item =>(
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
                <Grid container item xs={4} justify='center'>
                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                  Crear Grupo
                </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default CreateGroupForm;