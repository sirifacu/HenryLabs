import { makeStyles } from '@material-ui/core'
import * as yup from "yup";

export const validationSchema = yup.object({
    title: yup
    .string('Inserte el titulo del evento')
    .required('Debe insertar un titulo'),
    description: yup
    .string('Ingrese la descripcion del evento')
    .required('Debe ingresar una descripcion'),
    start: yup
    .string('debe ingresar una fecha de inicio')
    .required('Debe ingresar una fecha de inicio'),
    end: yup
    .string('debe ingresar una fecha de fin')
    .required('Debe ingresar una fecha de fin')
})

export const useStylesDark = makeStyles(( theme ) => (
    {
     calendar: {
        color: theme.palette.text,
        '& button':{
            color: "#fff"
        },
        '& a':{
            color: '#fff'
        },
        '& div > div > div > div > div > div':{
            color: '#000',
            backgroundColor: '#ffea00'
        }
    },
}))

export const useStylesLigth = makeStyles(( theme ) => (
    {
     calendar: {
        color: theme.palette.text,
        '& button':{
            color: "#000"
        },
        '& a':{
            color: '#000'
        },
        '& div > div > div > div > div > div':{
            color: '#000',
            backgroundColor: '#ffea00'
        }
    },
}))
