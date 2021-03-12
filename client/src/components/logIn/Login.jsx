import React from "react";
import { Link, Grid, Avatar, Button, TextField, Typography, Box, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useStylesLogin } from "./style";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "../../redux/loginReducer/loginAction";



export const validate = (input) => {
  let errors = {};
  if (!input.email) {
    errors.email = 'Debes ingresar un email';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'Ingrese un email valido';
  }
  
  if (!input.password) {
    errors.password = 'Debes ingresar una contraseña';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = 'Ingrese una contraseña válida';
  }
  return errors;
};

export default function Login () {
  
  const [userData, setUserData] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const loginFailed = useSelector(store => store.userLoggedIn.loginFailed)
  const dispatch = useDispatch();
  const classes = useStylesLogin();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await setUserData({...userData,
      [event.target.name]: event.target.value
    });

    handleChange(event);
    
    if (Object.keys(errors).length === 0) {
      dispatch(userLogin(userData.email, userData.password))
    }
    setUserData({ email: "", password: "" });
  }

  const handleChange = (event) => {
    setErrors(validate({...userData,
      [event.target.name]: event.target.value
    }))
  
    setUserData({...userData,
      [event.target.name]: event.target.value
    });
  }
  
  
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper} >
          <Avatar className={classes.avatar} src={'https://media-exp1.licdn.com/dms/image/C4E0BAQGy6GZmHb_SXA/company-logo_200_200/0/1603651276024?e=2159024400&v=beta&t=ViXcu-TnrneSIy7d9SSO7DnGp4OCMmmJ-UhC9ifKHu4'}/>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} >
            <Grid className={classes.input} item xs={12} sm={12} md={8}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                color="secondary"
                error={!!errors.email}
                value={userData.email}
                helperText={errors.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid className={classes.input} item xs={12} sm={12} md={8} >
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                error={!!errors.password}
                value={userData.password}
                helperText={errors.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid className={classes.input} item xs={12} sm={12} md={8} >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Iniciar sesión
              </Button>
            </Grid>
            <Grid container className={classes.input} item xs={12} sm={12} md={8}>
              <Grid item xs>
                 {loginFailed && <Alert severity="error">
                 Los datos ingresados son incorrectos </Alert>}
                <Link href="/cambiar-clave" variant="body2" color="secondary">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
