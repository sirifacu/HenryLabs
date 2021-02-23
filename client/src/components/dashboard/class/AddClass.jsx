import React from 'react'
import {Grid, TextField, Fab, Card, FormControl, InputLabel, OutlinedInput, InputAdornment, Select} from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
      .string('Tenes que ingresar el nombre de la clase')
      .required('Name is required')
});
  const useStyles = makeStyles((theme) => ({
     card: {
      maxWidth: "90%",
      margin: "auto",
      marginTop: "1rem",
      padding: "1%"
    },
    margin: {
      margin: theme.spacing(1),
    },
    inputs: {
        height: "50",
    }
  }));

const AddClass = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
        name: "",
        number: 0,
        }})

    return (
        <>
        <Card className={classes.card}>
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  className={classes.inputs}
                  required
                  id="name"
                  label="Name"
                  name="name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  className={classes.inputs}
                  required
                  id="number"
                  label="Numero"
                  name="number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  helperText={formik.touched.number && formik.errors.number}
                />
              </Grid>
              {/*  {Agregar  funcionalidad para insertarle categorias al producto} */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item container xs={12} justify="flex-end">
                <Fab

                  variant="extended"
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={classes.margin}
                  type="submit"
                >
                  <NavigationIcon className={classes.extendedIcon} />
                  Add Product
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Card>
      </>
    );
}

export default AddClass;
