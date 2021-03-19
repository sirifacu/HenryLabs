import { makeStyles, fade, lighten } from "@material-ui/core/styles";
import * as yup from "yup";

export const validationSchema = yup.object({
    student: yup
      .string("¿Cómo te llamas?")
      .min(5, "Muy corto")
      .max(100, "Muy largo (max 30 caracteres)")
      .required("*este campo es obligatorio"),
    previousStudies: yup
      .string("¿Qué estudiabas antes?")
      .min(1, "Muy corto")
      .max(200, "Muy largo (max 30 caracteres)")
      .required("*este campo es obligatorio"),
    position: yup
      .string("¿Para qué puesto te contrataron?")
      .min(1, "Muy corto")
      .max(100, "Muy largo (max 30 caracteres)")
      .required("*este campo es obligatorio"),
    company: yup
      .string("¿Para qué país?")
      .min(1, "Muy corto")
      .max(100, "Muy largo (max 10000 caracteres)")
      .required("*este campo es obligatorio"),
    country: yup
      .string("¿Para qué país?")
      .min(1, "Muy corto")
      .max(100, "Muy largo (max 10000 caracteres)")
      .required("*este campo es obligatorio"),
    incomeImprovement: yup
      .string("¿En cuánto mejoraste tus ingresos?")
      .min(1, "Muy corto")
      .max(1000, "Muy largo (max 10000 caracteres)")
      .required("*este campo es obligatorio"),
    whatYouDidBefore: yup
      .string("¿Qué hacías antes de henry?")
      .min(1, "Muy corto")
      .max(1000, "Muy largo (max 10000 caracteres)")
      .required("*este campo es obligatorio"),
    thanks: yup
      .string("¿A quién agradecerías?")
      .min(1, "Muy corto")
      .max(1000, "Muy largo (max 10000 caracteres)")
      .required("*este campo es obligatorio"),
    comments: yup
      .string("¿Otro comentario?")
      .min(1, "Muy corto")
      .max(1000, "Muy largo (max 10000 caracteres)")
      .required("*este campo es obligatorio"),
  });

  export const useStylesPostBoom = makeStyles((theme) => ({
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
      display: "flex",
      justifyContent: "center",
    },
  }));

  export const useStylesBoomList = makeStyles((theme) => ({
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
  }));

  export const useStylesBoomDetail = makeStyles((theme) => ({
    root: {
      boxShadow: "none",
    },
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
    buttons:{
      display: 'flex',
      alignItems: 'flex-end'
    }
  }));
  