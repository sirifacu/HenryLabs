import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import csv from "csv";
import {useDispatch} from "react-redux"
import { inviteStudent } from '../../../../redux/inviteReducer/actionsInvite';
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  spacing: {
    margin: theme.spacing(2),
  },
}));

const dropzone = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: 100,
  padding: "10px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
}

var info = []
var fileName = ''

export const Invite = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const classes = useStyles();

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        data.forEach(data => info.push(data))  
      });
    };
    if (acceptedFiles[0] === undefined){
      Swal.fire('Oops...', 'El archivo no es un csv', 'error')
    }else{
      acceptedFiles.forEach(file => reader.readAsBinaryString(file));
      fileName = acceptedFiles[0].name
    } 
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    accept: '.csv',
    onDrop });

  const sendEmail = () => {
    dispatch(inviteStudent(info))
    info = []
    showAlert()
    history.push('/dashboard')
  }

  const showAlert = () => {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Alumnos invitados correctamente',
        showConfirmButton: false,
        timer: 1500,
    });
};

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Typography variant={"h6"} className={classes.spacing}>Creación de cuenta por defecto para nuevos alumnos</Typography>  
        <Box>
                <div style={dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Arrastra el archivo aca o bien hace click para seleccionarlo desde tu carpeta</p>
                    <em>(Solo archivos .CSV serán aceptados)</em>
                </div>
        <Grid className={classes.spacing}>
          {
          fileName ? <div><AttachFileIcon /> {fileName}</div> : <></>
          }
        </Grid>
        </Box>
        <Typography className={classes.spacing}>Al hacer click en enviar, se generará la cuenta de usuario y se le enviará por email los datos para ingresar a la misma</Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.spacing}
              onClick={sendEmail}
              >
              Enviar
            </Button>
      </Grid>
     </Container>
    )
}
const rootElement = document.getElementById("root");
