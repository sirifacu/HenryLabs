import { Box, Button, Container, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import csv from "csv";
import React, {useState, useCallback} from 'react';
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { inviteStudent } from '../../../../redux/inviteReducer/actionsInvite';
import { consoleLog } from '../../../../services/consoleLog';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


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
  },
  icon: {
    fontSize: "1em"
  },
}));

const dropzone = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: 130,
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

export const Invite = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const classes = useStyles();
  const [file, setFile] = useState([]);
  const [users, setUsers] = useState([])

  const { getRootProps, getInputProps } = useDropzone({ 
    accept: '.csv',
    multiple: false,
    onDrop: useCallback(acceptedFiles => {
      const reader = new FileReader();
      reader.onabort = () => consoleLog("file reading was aborted");
      reader.onerror = () => consoleLog("file reading failed");
      reader.onload = () => {
        csv.parse(reader.result, (err, data) => setUsers([...data]));
      };
      // eslint-disable-next-line no-mixed-operators
      if (acceptedFiles[0] && acceptedFiles[0].size === 0 || acceptedFiles[0] === undefined){
        Swal.fire('Oops...', 'El archivo no es un csv', 'error')
      }else{
        acceptedFiles.forEach(file => reader.readAsBinaryString(file));
        setFile(acceptedFiles)
      } 
    }, [])
  });

  const sendEmail = () => {
      if (users.length) {
        dispatch(inviteStudent(users))
        setUsers([])
        setFile([])
      }else{
        Swal.fire('Oops...', 'No hay archivos adjuntos', 'error')
      }
  }

  const deleteFile = () => {
    setFile([])
    setUsers([])
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
          { file.length ? 
            <aside>
                <ul>
                    {file.map(item => (
                    <li key={item.path}>
                        {item.name}
                        <IconButton aria-label="delete" onClick={deleteFile}>
                                <DeleteIcon />
                        </IconButton>
                    </li>
                    ))}
                </ul>
            </aside> 
            : 
            null}
        </Grid>
        </Box>
        {file.length ? 
            <>
              <Typography className={classes.spacing}>Al hacer click en enviar, se generará la cuenta de usuario y se le enviará por email los datos para ingresar a la misma</Typography>
              <Grid container justify="center" style={{marginTop: "1%"}}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                        onClick={sendEmail}
                    >
                        Enviar
                    </Button>
                </Grid>
              </Grid>
            </> : 
            null}
      </Grid>
     </Container>
    )
}


