import { makeStyles } from '@material-ui/core';
import * as yup from "yup";

const numericRegex = /(?=.*[0-9])/
const lowerCaseRegex = /(?=.*[a-z])/
const upperCaseRegex = /(?=.*[A-Z])/

export const validationSchema = yup.object({
  firstName: yup
    .string("Ingresa tu nombre")
    .required("Debes ingresar tu nombre"),
  lastName: yup
    .string("Ingresa tu apellido")
    .required("Debes ingresar tu nombre"),
  country: yup
    .string("Ingresa tu pais de residencia")
    .required("Debes ingresar un pais"),
  address: yup
    .string("Ingresa tu direccion de vivienda")
    .required("Debes ingresar tu direccion"),
  nationality: yup
    .string("Ingresa tu nacionalidad")
    .required("Debes ingresar tu nacionalidad"),
  dateOfBirth: yup
    .string("Ingresa tu fecha de nacimiento")
    .required("Debes ingresar tu fecha de nacimiento"),
  cellPhone: yup
    .number("Ingresa tu numero de Telefono/Celular")
    .min(7)
    .required("Debes ingresar tu numero de Telefono/Celular"),
  state: yup
    .string("Ingresa el Estado/Provincia/Region en al que vives")
    .required("Debes ingresar tu Estado/Provincia/Region"),
  githubUser: yup
    .string("Ingresa tu usuario de github")
    .required("Debes ingresar tu usuario de github"),
  googleUser: yup
    .string("Ingresa tu correo de gmail")
    .email("Debes ingresar una correo valido")
    .required("Debes ingresar tu correo de gmail"),
  password: yup 
    .string("Ingresa una contraseña")
    .required("Debes ingresar una contraseña")
    .min(8, "Debe tener minimo 8 caracteres")
    .matches(numericRegex, "Debe tener minimo un numero")
    .matches(lowerCaseRegex, "Debe tener minimo una minuscula")
    .matches(upperCaseRegex, "Debe tener minimo una mayuscula"),
  verifyPassword: yup
    .string("Confirma tu contraseña")  
    .oneOf([yup.ref("password")], "Las contraseñas no son iguales")
    .required("Debes confirmar tu contraseña")
});

export const chipStyles = {
  backgroundColor: '#d4cfc9',
  borderRadius: '200px 200px 200px 200px',
  width: '35px',
  height: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
}

export const useStylesCompleteProfile = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    logoContainer: {
        width: "30%",
    },    
    logo: {
        width: "50%",
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      width: theme.spacing(22),
      height: theme.spacing(22),
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
    continue: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }
  }));