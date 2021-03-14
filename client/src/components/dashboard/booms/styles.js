import { makeStyles } from "@material-ui/core/styles";
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
      display: "flex",
      flexDirection: "row",
      margin: theme.spacing(1),
    },
    card: {
      display: "flex",
      flexDirection: "row",
    },
    type: {
      display: "flex",
      flexDirection: "row",
      marginLeft: theme.spacing(3),
      alignItems: "center",
    },
    button: {
      width: "5%",
      marginLeft: theme.spacing(2),
    },
    right: {
      marginRight: theme.spacing(3),
    },
  }));

  export const useStylesBoomDetail = makeStyles((theme) => ({
    root: {
      boxShadow: "none",
    },
  }));