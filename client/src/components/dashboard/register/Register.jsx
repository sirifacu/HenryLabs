import { Avatar, Button, Container, FormControl, Grid, Select, TextField, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useFormik } from "formik";
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { registerUser } from '../../../redux/userReducer/userAction';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(0, 0, 3),
  },
  button: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
  }
}));


///Multiple select things
function getStyles(name, userRole, theme) {
  return {
    fontWeight:
    userRole.indexOf(name) === -1
    ? theme.typography.fontWeightRegular
    : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Staff',
  'Instructor',
  'Pm',
  'Estudiante',
];
/////

const validationSchema = yup.object({
    firstName: yup
    .string('Ingresa el/los nombre/s del usuario')
    .required('*El Nombre es requerido'),
    lastName: yup
    .string('Ingresa el apellido del usuario')
    .required('*El apellido es requerido'),
    email: yup
      .string('Ingresa el e-mail del usuario')
      .email('Ingresa un e-mail valido')
      .required('*El e-mail es requerido'),
    password: yup
      .string('Ingresa tu contraseña')
      .min(8, 'La contraseña debe tener un minimo de 8 caracteres')
      .required('*La contraseña es requerida'),
    passwordConfirm: yup
    .string().oneOf( [yup.ref('password')], 'La contraseña debe coincidir',),
  });


export const Register = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [userRole, setUserRole] = React.useState([]);

    const handleChange = (event) => {
      setUserRole(event.target.value);
    };

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',  
          roles: '',  
          email: '',
          password: '',
          passwordConfirm: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
          dispatch(registerUser(values, userRole))
          formik.resetForm()
          setUserRole([])
        }
      });
      
    
      return (
        <Container component="main" maxWidth="xs">
           <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOpenIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Registrar un usuario
              </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>          
          <div>    
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Rol del usuario</InputLabel>
              <Select
                labelId="roles"
                id="roles"
                multiple
                required
                value={userRole}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, userRole, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>         
          <TextField
              fullWidth
              color="secondary"
              variant="outlined"
              margin="normal"
              id="firstName"
              name="firstName"
              label="Nombres"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              color="secondary"
              variant="outlined"
              margin="normal"
              id="lastName"
              name="lastName"
              label="Apellido"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
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
              label="contraseña (8 caracteres minimo)"
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
              label="ingrese nuevamente la contraseña"
              type="password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            />
          <Grid item className={classes.button} xs={12}>
            <Button color="secondary" variant="contained" type="submit">
              Enviar
            </Button>
          </Grid>
          </form>
        </div>
        </Container>
      );
}
