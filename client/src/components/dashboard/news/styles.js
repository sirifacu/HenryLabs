import { makeStyles, fade, lighten } from '@material-ui/core/styles';
import * as yup from "yup";

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

export const useStylesNewsTable = makeStyles( theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

export const useStylesBoomList = makeStyles((theme) => ({
  title: {
    display: "flex",
    width: "100%",
    flexDirection: "column"
  },
  card:{
    display: "flex",
    minHeight: theme.spacing(40),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  info:{
    width: "100%",
    minHeight: "100%",
  },
  name:{
    marginLeft: theme.spacing(1)
  }
}));

export const enhancedTableToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    marginTop: theme.spacing(2),
    flex: '1 1 100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  search: {
    marginTop: theme.spacing(2),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey[700], 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey[700], 0.45),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
