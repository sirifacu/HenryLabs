import React from "react";
import { userLogin } from "../../redux/loginReducer/loginAction";
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    color: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.dark,
  },
  font:{
    color: "black",
  },
  textField: {
    border: "black",
  },
  cont:{
    padding: '4%'
  }
}));

export const validate = (input) => {
  let errors = {};
  if (!input.email) {
    errors.email = "*Email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Enter a valid email";
  }
  
  if (!input.password) {
    errors.password = '*Password is required';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = '*Enter a valid password';
  }
  return errors;
};

export default function Login () {
  
  const [userData, setUserData] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });

    handleChange(event);
    if (Object.keys(errors).length === 0) {
      dispatch(userLogin(userData.email, userData.password))
    }
    setUserData({ email: "", password: "" });
  }

  const handleChange = function (event) {
    setErrors(validate({
      ...userData,
      [event.target.name]: event.target.value
    }))
  
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
    
  }

  
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.cont}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}
              onSubmit={handleSubmit} noValidate
          >
          <TextField
            color="secondary"
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            required
            error={!!errors.email}
            value={userData.email}
            helperText={errors.email}
            onChange={handleChange}
          />
          <TextField
            required
            color="secondary"
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            value={userData.password}
            helperText={errors.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.font}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
