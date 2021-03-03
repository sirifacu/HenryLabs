import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import csv from "csv";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { inviteStudent } from '../../../../redux/inviteReducer/actionsInvite';
import { consoleLog } from '../../../../services/consoleLog';


const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  spacing: {
    margin: theme.spacing(2),
  },
  button: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1),
  }
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
    console.log(acceptedFiles)
    const reader = new FileReader();
    reader.onabort = () => consoleLog("file reading was aborted");
    reader.onerror = () => consoleLog("file reading failed");
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        data.forEach(data => info.push(data))  
      });
    };
    if (acceptedFiles[0] && acceptedFiles[0].size === 0){
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
      fileName = ''
      history.push('/dashboard/invite')
  }

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
        <Grid item className={classes.button} xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={sendEmail}
              >
              Enviar
            </Button>
        </Grid>
      </Grid>
     </Container>
    )
}
const rootElement = document.getElementById("root");