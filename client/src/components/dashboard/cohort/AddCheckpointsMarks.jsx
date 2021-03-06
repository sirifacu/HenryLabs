    
import React, {useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDropzone} from 'react-dropzone';
import Swal from 'sweetalert2'
import {consoleLog} from '../../../services/consoleLog'
import csv from "csv";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {getFilteredStudentsByCohort} from '../../../redux/studentReducer/studentAction'
import { Select, Grid, DialogTitle, DialogContentText, DialogContent, DialogActions, IconButton, Dialog, Button, Paper, FormControl, InputLabel } from '@material-ui/core';

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
    
const useStyles = makeStyles((theme) => ({
    spacing: {
        margin: theme.spacing(2),
    },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    },
}));

const checkpoints = [
    {name: "Checkpoint 1", value: "checkpoint1"},
    {name: "Checkpoint 2", value: "checkpoint2"},
    {name: "Checkpoint 3", value: "checkpoint3"},
    {name: "Checkpoint 4", value: "checkpoint4"}
]
    

const AddCheckpointsMarks = () => {
    const {id} = useParams()
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([])
    const [checkpoint, setCheckpoint] = useState("checkpoint1");
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const {getRootProps, getInputProps} = useDropzone({
        accept: '.csv',
        multiple: false,
        onDrop: useCallback(acceptedFiles => {
        const reader = new FileReader();
        reader.onabort = () => consoleLog("file reading was aborted");
        reader.onerror = () => consoleLog("file reading failed");
        reader.onload = () => {
          csv.parse(reader.result, (err, data) => setUsers(data.map(el => el[0])));
        };
        if (acceptedFiles[0] && acceptedFiles[0].size === 0 || acceptedFiles[0] === undefined){
          Swal.fire('Oops...', 'El archivo no es un csv', 'error')
        }else{
          acceptedFiles.forEach(file => reader.readAsBinaryString(file));
          setFiles(acceptedFiles)
        } 
      }, [])
      });

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setUsers([])
    setOpen(false);
    };

    const sendCheckPoints = (checkpoint) => {
        console.log(users)
         axios.post(`/users/checkpoint/status/${checkpoint}`, {cohortId: id, students: users})
        .then(() => dispatch(getFilteredStudentsByCohort(id)))
        .then(() => handleClose())
        .then(() => {Swal.fire('Excelente!', 'Se actualizaron todas las notas de los alumnos', 'success')})
        .catch(e => Swal.fire('Oops...', 'Hubo un error en la carga de notas de los alumnos', 'error')) 
    }

    return (
    <React.Fragment>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Asignar Notas CP
        </Button>
        <Dialog
        fullWidth
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        >
        <Paper elevation={9} style={{margin:"1%"}}>
            <DialogTitle id="max-width-dialog-title">Ingrese un archivo con la lista de usuarios de github Aprobados.</DialogTitle>
            <DialogContent>
                <DialogContentText>
                El formato tiene que ser un usuario abajo del otro
                </DialogContentText>
                <Grid container direction='row' justify="space-between">
                    <Grid item xs={8}>
                        <div style={dropzone} {...getRootProps()}>
                            <input {...getInputProps()} />
                                <p>Ingrese el archivo CSV</p>
                        </div>
                    </Grid>
                    <Grid item container justify="center" xs={4}>
                        <Grid item xs={10}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel color="secondary" htmlFor="outlined-checkpoint-native-simple">Checkpoint</InputLabel>
                                <Select
                                    color="secondary"
                                    fullWidth
                                    native
                                    value={checkpoint}
                                    label="Checkpoint"
                                    onChange={(e) => setCheckpoint(e.target.value)}
                                    inputProps={{
                                        name: 'checkpoint',
                                        id: 'outlined-checkpoint-native-simple',
                                    }}
                                > 
                                    {checkpoints.map(({value, name},i) => (
                                    <option key={i} value={value} label={name}>
                                        {name}
                                    </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                { files.length ? 
                <>
                    <aside>
                        <h4>Files</h4>
                        <ul>
                            {files.map(file => (
                            <li key={file.path}>
                                {file.name}
                                <IconButton aria-label="delete" onClick={(e) => setFiles([])}>
                                        <DeleteIcon />
                                </IconButton>
                            </li>
                            ))}
                        </ul>
                    </aside> 
                    <Grid container justify="center" style={{marginTop: "1%"}}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                onClick={() => sendCheckPoints(checkpoint)}
                            >
                                Cargar Notas
                            </Button>
                        </Grid>
                    </Grid>
                </>
            : null}
            </DialogContent>
            <DialogActions>
                <Button variant={'contained'}onClick={handleClose} color="primary" style={{marginRight: "4%"}}>
                Close
                </Button>
            </DialogActions>
        </Paper>
        </Dialog>
    </React.Fragment>
    );
}

export default AddCheckpointsMarks


