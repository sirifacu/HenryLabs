import React from 'react'
import Box from '@material-ui/core/Box';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      

    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const validationSchema = yup.object({
    email: yup
      .string('Ingresa tu e-mail')
      .email('Ingresa un e-mail valido')
      .required('El e-mail es requerido'),
    password: yup
      .string('Ingresa tu contraseña')
      .min(8, 'La contraseña debe tener un minimo de 8 caracteres')
      .required('La contraseña es requerida'),
    passwordConfirm: yup
    .string().oneOf( [yup.ref('password')], 'La contraseña debe coincidir',),
  });


export const Register = () => {
    const classes = useStyles();
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
          email: 'ejemplo@ejemplo.com',
          password: '12345678',
          passwordConfirm: '12345678',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
          axios
            .post(`/register`, {email : values.email, password : values.password})
            .then((res) => {
              Swal.fire('Felicitaciones', `
              Te has registrado en HenryApp<br>        
              `);
              history.push("/login");
            })
            .catch((error) => {
              Swal.fire('Error', `
              Algo Salio Mal<br>        
              `, error);
            });
        },
        
      });
    
      return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              color="secondary"
              variant="outlined"
              margin="normal"
              id="email"
              name="email"
              label="e-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              color="secondary"
              variant="outlined"
              margin="normal"
              id="password"
              name="password"
              label="contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              color="secondary"
              variant="outlined"
              margin="normal"
              id="passwordConfirm"
              name="passwordConfirm"
              label="ingrese nuevamente su contraseña"
              type="password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            />
            <Button className={classes.submit} color="secondary" variant="contained" fullWidth type="submit">
              Enviar
            </Button>
          </form>
        </div>
        </Container>
      );
}
