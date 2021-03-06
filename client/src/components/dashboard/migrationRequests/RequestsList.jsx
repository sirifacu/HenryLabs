import {
    Button,
    ButtonGroup, Dialog,
    DialogActions, DialogContent, DialogTitle, Grid,
    MenuItem, Paper, Select, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCohorts } from '../../../redux/cohortReducer/cohortAction';
import { changeStatus, getRequests } from '../../../redux/migrationRequestsReducer/migrationRequestsActions';
import Row from './Rows';
import { useRowStyles } from './styles';

const CollapsibleTable = () => {
    const dispatch = useDispatch();
    const classes = useRowStyles();
    const requests = useSelector(state => state.migrationRequestsReducer.requests);
    const cohorts = useSelector(state => state.cohortReducer.cohorts);
    const status = useSelector(state => state.migrationRequestsReducer.status);
    const [ selected, setSelected ] = useState([]);
    const [ cohort, setCohort ] = useState("");
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        dispatch(getRequests('pending'));
        dispatch(getCohorts());
    }, [dispatch]);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setCohort("");
    };

    const handleSelect = item => {
        if(status === "pending"){
            !selected.find(el => el.id === item.id) 
            ? setSelected([...selected, item])
            : setSelected(selected.filter(el => el.id !== item.id))
        }
    };

    const handleReply = () => {
        dispatch(changeStatus(selected, "accepted", cohort));
        handleClose();
        setSelected([]);
    };

    const handleDeny = () => {
        dispatch(changeStatus(selected, "rejected", cohort));
        handleClose();
        setSelected([]);
    };

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item container direction="row" justify="center">
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                    <Button className={clsx(status === 'rejected' && classes.primary)} onClick={() => dispatch(getRequests('rejected'))}>
                        Rechazadas
                    </Button>
                    <Button className={clsx(status === 'pending' && classes.primary)} onClick={() => dispatch(getRequests('pending'))}>
                        Pendientes
                    </Button>
                    <Button className={clsx(status === 'accepted' && classes.primary)} onClick={() => dispatch(getRequests('accepted'))}>
                        Aceptadas
                    </Button>
                </ButtonGroup>
            </Grid>

            <Grid item container direction="row" justify="flex-end" style={{marginTop:"2%", marginBottom: "2%"}}>
                {status === 'pending' && selected.length ? <Button variant="contained" color="primary" onClick={handleOpen} >Acciones</Button> : null}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <Paper elevation={8} className={classes.paper}>
                        <DialogTitle className={classes.title} id="form-dialog-title">¿Migrar?</DialogTitle>
                        <DialogContent>
                            <Select
                                fullWidth
                                label="Cohorte"
                                id="cohorte"
                                value={cohort}
                                onChange={e => setCohort(e.target.value)}
                            >
                                { cohorts.map(cohort => <MenuItem key={cohort.id} value={cohort.id} >{ cohort.title }</MenuItem>) }
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" className={classes.closeButton}>
                                Cerrar
                            </Button>
                            <Button onClick={handleDeny} variant="contained" className={classes.RejectButton}>
                                Rechazar
                            </Button>
                            <Button onClick={handleReply} disabled={!cohort} variant="contained" className={classes.acceptButton} >
                                Aceptar
                            </Button>
                        </DialogActions>
                    </Paper>
                </Dialog>
            </Grid>

            <Grid item container>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Usuario</TableCell>
                                <TableCell align="right">Cohorte</TableCell>
                                <TableCell align="right">Nueva fecha de inicio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map(req => (
                                <Row key={req.id} req={req} selected={selected} handleSelect={handleSelect} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default CollapsibleTable;
