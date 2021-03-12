import { makeStyles } from '@material-ui/core/styles';
import * as yup from "yup";

export const useStylesNewsDetails = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      boxShadow: 'none',
      padding: theme.spacing(2),
    },
    media: {
      padding: theme.spacing(2),
      MaxHeight: 300,
      maxWidth: 300,
    },
    info: {
      padding: theme.spacing(5),
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(1),
    },
    text: {
      display: 'flex',
      justifyContent: 'center',
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000', 
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    fonts: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
    },
    image:{
      width: "80%",
      height: theme.spacing(50)
    }
  }));

export const useStylesNewsList = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      margin: theme.spacing(1)
    },
    card:{
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2)
    },
    type:{
      display: 'flex',
      flexDirection: 'row',
      marginLeft: theme.spacing(3),
      alignItems: "center"
    },
    button:{
      width: "5%",
      marginLeft: theme.spacing(2),
    },
    texts:{
      paddingTop: theme.spacing(1),
      marginRight: theme.spacing(3),
    },
    column:{
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(3),
    },
    image:{
      width: "100%",
      height: theme.spacing(40)
    },
    intro:{
      backgroundColor: "#ffeb3b",
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
  }));

export  const validationSchema = yup.object({
    title: yup
    .string("Ingresa el titulo")
    .min(5, "Muy corto")
    .max(100, "Muy largo (max 100 caracteres)")
    .required("*este campo es obligatorio"),
    type: yup
    .string("Ingrese el tipo")
    .required("*este campo es obligatorio"),
    link: yup
    .string("Link a enlace externo")
    .min(6, "Muy corto")
    .max(100, "Muy largo (max 100 caracteres)")
    .required("*este campo es obligatorio"),
    description: yup
    .string("Texto de la noticia")
    .min(6, "Muy corto")
    .max(10000, "Muy largo (max 10000 caracteres)")
    .required("*este campo es obligatorio"),
  });

export const useStylesNewsPost = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    spacing: {
        margin: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    button: {
        margin: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center'
    },
    editor: {
        background: "black",
    }
}));

export const dropzone = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 50,
    padding: "5px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  }
