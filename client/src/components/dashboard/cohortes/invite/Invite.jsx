import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import csv from "csv";
import {useDispatch} from "react-redux"
import { inviteStudent } from '../../../../redux/inviteReducer/actionsInvite';


const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  spacing: {
    margin: theme.spacing(2),
  },
}));

var info = []

export const Invite = () => {
  const dispatch = useDispatch()
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
    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const sendEmail = () => {
    dispatch(inviteStudent(info))
    //
  }

  return (
    <>
    <Grid item>
        <Typography variant={"h6"} className={classes.spacing}>Creación de cuenta por defecto para nuevos alumnos</Typography>
    </Grid>

    <Box border={1}>
      <div className={classes.root} {...getRootProps()}>
    <input {...getInputProps()} />
      <Typography>Arrastre aqui el archivo CSV o click para seleccionarlo desde una carpeta</Typography>
          </div>
    </Box>
      
          <Typography className={classes.spacing}>Al hacer click en enviar, se generará la cuenta de usuario y se le enviará por email los datos para ingresar a la misma</Typography>
      <Button
        variant="contained"
        color="secondary"
        className={classes.spacing}
        onClick={sendEmail}
      >
        Enviar
      </Button>
      </>
    )
}
const rootElement = document.getElementById("root");