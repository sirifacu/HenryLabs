import React from 'react';
import { AppBar, Toolbar, Paper, Stepper, Step, StepLabel, Button, Badge, Typography, Grid, TextField, Avatar } from '@material-ui/core';
import { useStylesCompleteProfile, chipStyles, validationSchema } from './styles'
import { useDispatch } from 'react-redux';
import { completeData } from '../../redux/userReducer/userAction';
import { backToLogin } from '../../redux/loginReducer/loginAction';
import { useFormik } from 'formik';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import logo from './assets/logo_negro.png';

export default function CompleteProfile() {
  const classes = useStylesCompleteProfile();
  const steps = ['Datos basicos', 'Otros datos', 'Contraseña'];
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory()
  const dispatch = useDispatch()
  const user = localStorage.getItem('id')

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  
  const formik = useFormik({
    initialValues: {
      dateOfBirth: "",
      nationality: "",
      address: "",
      city: "",
      state: "",
      country: "",
      cellPhone: "",
      githubUser: "",
      googleUser: "",
      password: "",
      verifyPassword: "", 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.cellPhone = parseInt(values.cellPhone, 10)
      dispatch(completeData(user, values))
      setActiveStep(activeStep + 1); 
    }
  })

  const BasicData = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Datos basicos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="cellPhone"
              name="cellPhone"
              label="Telefono/Celular"
              color="secondary"
              fullWidth
              value={formik.values.cellPhone}
              onChange={formik.handleChange}
              error={formik.touched.cellPhone && Boolean(formik.errors.cellPhone)}
              helperText={formik.touched.cellPhone && formik.errors.cellPhone}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="nationality"
              name="nationality"
              label="Nacionalidad"
              color="secondary"
              fullWidth
              value={formik.values.nationality}
              onChange={formik.handleChange}
              error={formik.touched.nationality && Boolean(formik.errors.nationality)}
              helperText={formik.touched.nationality && formik.errors.nationality}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="Date"
              id="dateOfBirth"
              name="dateOfBirth"
              label="Fecha de nacimiento"
              color="secondary"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                id="country"
                name="country"
                label="Pais"
                color="secondary"
                fullWidth
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField 
                id="state" 
                name="state" 
                label="Estado/Provincia/Region" 
                color="secondary"
                fullWidth 
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="Ciudad"
                color="secondary"
                fullWidth
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="address"
              name="address"
              label="Direccion"
              color="secondary"
              fullWidth
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  
  const AdvancedData = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Foto y cuentas
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className={classes.avatarContainer}>
          <Badge
                badgeContent={
                  <div style={chipStyles}>
                    <Edit />
                  </div>
                }
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  className={classes.avatar}
                />
              </Badge>  
          </Grid>
          <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="githubUser"
              name="githubUser"
              label="Usuario de github"
              color="secondary"
              fullWidth
              value={formik.values.githubUser}
              onChange={formik.handleChange}
              error={formik.touched.githubUser && Boolean(formik.errors.githubUser)}
              helperText={formik.touched.githubUser && formik.errors.githubUser}
              />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="googleUser"
              name="googleUser"
              label="Usuario de google"
              color="secondary"
              fullWidth
              value={formik.values.googleUser}
              onChange={formik.handleChange}
              error={formik.touched.googleUser && Boolean(formik.errors.googleUser)}
              helperText={formik.touched.googleUser && formik.errors.googleUser}
            />
          </Grid>
          </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  const ChangePassword = () => {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Cambia tu contraseña
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              type="password"
              id="password"
              name="password"
              label="Contraseña"
              color="secondary"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              label="Confirma tu contraseña"
              color="secondary"
              fullWidth
              value={formik.values.verifyPassword}
              onChange={formik.handleChange}
              error={formik.touched.verifyPassword && Boolean(formik.errors.verifyPassword)}
              helperText={formik.touched.verifyPassword && formik.errors.verifyPassword}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
  

  function getStepContent(step) {
    switch (step) {
      case 0:
        return BasicData();
      case 1:
        return AdvancedData();
      case 2:
        return ChangePassword();  
      default:
        throw new Error('Unknown step');
  }
}

  return (
    <React.Fragment>
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar>
          <Grid className={classes.logoContainer}>
          <img src={logo} alt="logo" className className={classes.logo}/>
          </Grid>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Completa tu perfil
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Grid className={classes.continue}>
                <Typography variant="h5" gutterBottom>
                  Sus datos han sido actualizados.
                </Typography>
                <Typography variant="subtitle1">
                  Haga click aqui para continuar.
                </Typography>
                <Button 
                    onClick={()=>{
                      localStorage.clear()
                      dispatch(backToLogin())
                      history.replace('/')
                    }}
                    className={classes.buttonContinue}
                    variant="contained"
                    fullWidth
                    color="primary"
                >
                  continuar
                </Button>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Atras
                    </Button>
                  )}
                    {activeStep === steps.length - 1 ?  
                       <Button
                           variant="contained"
                           color="primary"
                           onClick={formik.handleSubmit}
                           className={classes.button}
                        > Enviar
                        </Button>
                       :<Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                       > Siguiente
                       </Button>}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}