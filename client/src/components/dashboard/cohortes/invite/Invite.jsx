import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import csv from "csv";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  spacing: {
    margin: theme.spacing(2),
  },
}));

export const Invite = () => {
  const classes = useStyles();

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      // Parse CSV file
      csv.parse(reader.result, (err, data) => {
        console.log("Parsed CSV data: ", data);
      });
    };

    // read file contents
    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <div className={classes.root} {...getRootProps()}>
      <Grid item>
        <Typography variant={"h6"} className={classes.spacing}>Creación de cuenta por defecto para nuevos alumnos</Typography>
    </Grid>

    <Box border={1}>
    <input {...getInputProps()} />
      <Typography>Arrastre aqui el archivo CSV o click para seleccionarlo desde una carpeta</Typography>

    </Box>
      
          <Typography className={classes.spacing}>Al hacer click en enviar, se generará la cuenta de usuario y se le enviará por email los datos para ingresar a la misma</Typography>
      <Button
        variant="contained"
        color="secondary"
        className={classes.spacing}
      >
        Enviar
      </Button>
  </div>
    )
}
const rootElement = document.getElementById("root");