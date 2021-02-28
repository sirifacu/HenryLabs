import { makeStyles } from "@material-ui/core";
import * as yup from "yup";

export const useStylesProfile = makeStyles((theme) => ({
  PaperModal: {
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  root: {
    border: 10,
    borderRadius: 20,
    marginTop: 18,
    minWidth: 350,
  },
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 7,
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  logo:{

  }
}));

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

export const useStylesUpdateProfile = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  align: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .min(1, "Very short")
    .required("You must write your first name"),
  lastName: yup
    .string("Enter your last name")
    .min(1, "Very short")
    .required("You must write your last name"),
  country: yup
    .string("Enter your country")
    .min(1, "Very short")
    .required("You must write your country"),
  address: yup
    .string("Enter your address")
    .min(1, "Very short")
    .required("You must write your address"),
  phone: yup.number().min(7).required("Enter your phone number"),
});
