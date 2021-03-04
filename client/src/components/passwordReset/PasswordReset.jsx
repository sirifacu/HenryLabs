import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Grid, Link, AppBar, Toolbar } from '@material-ui/core';
import { UseStylesResetPassword } from './styles.js'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import logo from '../completeProfile/assets/logo.png';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import axios from 'axios';



const PasswordReset = () => {
    const dispatch = useDispatch();
    const [verifyCode, setVerifyCode] = useState(false)
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    const numericRegex = /(?=.*[0-9])/
    const lowerCaseRegex = /(?=.*[a-z])/
    const upperCaseRegex = /(?=.*[A-Z])/

    const validationSchema = yup.object({
      newPassword: yup 
        .string("Ingresa una contraseña")
        .required("Debes ingresar una contraseña")
        .min(8, "Debe tener minimo 8 caracteres")
        .matches(numericRegex, "Debe tener minimo un numero")
        .matches(lowerCaseRegex, "Debe tener minimo una minuscula")
        .matches(upperCaseRegex, "Debe tener minimo una mayuscula"),
      confirmPassword: yup
        .string("Confirma tu contraseña")  
        .oneOf([yup.ref("newPassword")], "Las contraseñas no son iguales")
        .required("Debes confirmar tu contraseña")
    })

    const formik = useFormik({
        initialValues:{
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.put('/users/resetPassword', {password: values.newPassword, email})
            .then(response => {
                showAlertSuccess(response.data.msg, 2000)
                setTimeout(()=> setState("successful"), 2000)
            })
            .catch(error => {
                showAlertConflict(error.response.data.msg, 2000)
            })
        }
    })

    const classes = UseStylesResetPassword()

    const handleReset = () => {
        setEmail("")
        setVerifyCode(false)
    }

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleChangeCode = (event) => {
        setCode(event.target.value)
    }

    const showAlertSuccess = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
      };

    const showAlertConflict = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
      };

    const handleSubmit = (event) =>{
        axios.post('/users/sendVerifyCode', {email})
        .then(response =>{
            showAlertSuccess(response.data.msg, 2000)
            setVerifyCode(true)
        })
        .catch(error =>{
            showAlertConflict(error.response.data.msg, 2000)
        })
    }
    const handleSubmitCode = (event) =>{
        axios.get(`/users/${code}/email/${email}`)
        .then(response => {
            showAlertSuccess(response.data.msg, 2000)
            setState("password")
        })
        .catch(error =>{
            showAlertConflict(error.response?.data.msg , 2000)
        })
    }

    const InsertEmail = () => {
        return(
            <Container className={classes.container}>
               <Grid container spacing={5} className={classes.content}>
                  <Grid item lg={12} sm={10} sx={8} className={classes.title}>
                    <Typography variant="h3">Restablecimiento de contraseña</Typography>
                  </Grid>
                  <Grid item lg={10} sm={10} sx={8} className={classes.paragraph}>
                     <Typography variant="h5" align="center">
                       Coloca la dirección de correo electrónico que usaste para registrarte. Te enviaremos un mensaje con un codigo de verificacion para restablecer tu contraseña.
                     </Typography>
                  </Grid>
                  <Grid container item spacing={1} className={classes.inputContainer}>
                     <Grid item lg={5} sm={6} sx={8}>
                       <TextField
                          fullWidth
                          variant="outlined"
                          id="email"
                          name="email"
                          label="correo electronico"
                          onChange={handleChange}
                          value={email}
                          size="small"
                        />
                      </Grid>
                     <Grid item>
                        <Button
                           type="submit"
                           variant="contained"
                           color="primary"
                           onClick={handleSubmit}>
                            enviar
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
            </Container>
        )
    }
    const InsertCode = () => {
        return(
            <Container className={classes.container}>
                <Grid container spacing={3} className={classes.content}>
                  <Grid item className={classes.title}>
                    <Typography variant="h5">Inserte su codigo de verificacion:</Typography>
                  </Grid>
                <Grid container spacing={1} item className={classes.inputContainer} lg={12} sm={12} sx={12}>
                    <Grid item lg={4} sm={6} sx={8}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="verifyCode"
                        name="verifyCode"
                        label="codigo de verificacion"
                        onChange={handleChangeCode}
                        value={code}
                        size="small"
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitCode}
                      >
                        enviar
                      </Button>
                    </Grid>
                <Grid container item spacing={2} justify="center" direction="column" alignItems="center" lg={10} sm={10} sx={10}>
                    <Grid container item lg={6} sm={6} sx={6} className={classes.link} alignItems="flex-start">
                        <Grid item>
                           <Typography>¿No te llego el codigo?, 
                           <Link onClick={handleSubmit}>volver a enviar codigo</Link>
                           </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item lg={6} sm={6} sx={6} className={classes.link} alignItems="flex-start">
                        <Grid item> 
                          <Typography>
                          <Link onClick={handleReset}>Cambiar direccion de correo</Link>
                          </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
                </Grid>
        </Container>
        )
    }

    const InsertPassword = () => {

        return(
            <Container className={classes.container}>
              <Grid container spacing={3} className={classes.content} >
                <Grid item className={classes.title} lg={12} sm={12} sx={12}>
                  <Typography variant="h5">Inserte su nueva contraseña</Typography>
                </Grid>
                    <Grid container spacing={3}  item lg={12} sm={12} sx={12} className={classes.inputContainer}> 
                     <Grid item lg={7} sm={9} sx={12} className={classes.inputContainer}>
                     <TextField
                        size="small"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        variant="outlined"
                        label="nueva contraseña"
                        className={classes.input}
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                     />
                     </Grid>
                     <Grid item lg={7} sm={9} sx={12} className={classes.inputContainer}>
                     <TextField
                        size="small"
                        type="password"
                        variant="outlined"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="confirma tu contraseña"
                        className={classes.input}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                     </Grid>
                    </Grid>
                     <Grid item lg={12} sm={12} sx={12} className={classes.inputContainer}>
                     <Button
                        fullWidth
                        type="submit"
                        onClick={formik.handleSubmit}
                        variant="contained"
                        color="primary">
                          enviar
                     </Button>
                     </Grid>
              </Grid>
        </Container>
        )
    }

    return(
        <div>
          <Grid>
            <AppBar position="absolute" color="secondary" className={classes.appBar}>
                 <Toolbar>
                   <Grid className={classes.logoContainer}>
                   <img src={logo} alt="logo" className={classes.logo}/>
                   </Grid>
                 </Toolbar>
            </AppBar>
          </Grid>
        {state==="password"?InsertPassword():!verifyCode?InsertEmail():InsertCode()}
        {state==="successful"&&<Redirect to="/"/>}
        </div>
    )
}

export default PasswordReset