import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Collapse, IconButton, Table, TableBody,
         TableCell, TableContainer, TableHead, TableRow, Typography,
         Paper } from '@material-ui/core';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { getRequests, changeStatus } from '../../../redux/migrationRequestsReducer/migrationRequestsActions';
import Row from './Rows';

const CollapsibleTable = () => {
    const dispatch = useDispatch();
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

    handleClose = () => setOpen(false);

    const handleSelect = item => {
       !selected.find(el => el.id === item.id) 
       ? setSelected([...selected, item])
       : setSelected(selected.filter(el => el.id !== item.id))
    };

    const handleReply = () => {
        dispatch(changeStatus(selected, "accepted", cohort))
    }

    const handleDeny = () => {
        dispatch(changeStatus(selected, "rejected", cohort))
    }
    

    return (
        <Grid container direction="
        handleReplycolumn" justify="center" alignItems="space-evenly">
            <Grid item container direction="row" justify="center">
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                    <Button className={clsx(status === 'rejected' && classes.primary)} onClick={dispatch(getRequests('rejected'))}>
                        Rechazadas
                    </Button>
                    <Button className={clsx(status === 'pending' && classes.primary)} onClick={dispatch(getRequests('pending'))}>
                        Pendientes
                    </Button>
                    <Button className={clsx(status === 'accepted' && classes.primary)} onClick={dispatch(getRequests('accepted'))}>
                        Aceptadas
                    </Button>
                </ButtonGroup>
            </Grid>

            <Grid item container direction="row" justify="flex-end">
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <Paper elevation={3} className={styles.paper}>
                        <DialogTitle className={styles.title} id="form-dialog-title">¿Migrar?</DialogTitle>
                        <DialogContent>
                            <Select 
                                label="Cohorte"
                                id="cohorte"
                                value={cohorte}
                                onChange={e => setCohort(e.target.value)}
                            >
                                { cohorts.map(cohort => <MenuItem key={cohort.id} value={cohort.id} >{ cohort.name }</MenuItem>) }
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cerrar
                            </Button>
                            <Button onClick={handleDeny} color="primary">
                                Rechazar
                            </Button>
                            <Button onClick={handleReply} color="primary">
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
                            <TableCell align="right">Usuario</TableCell>
                            <TableCell align="right">Cohorte</TableCell>
                            <TableCell align="right">Nueva fecha de inicio</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map(req => (
                                <Row key={req.id} req={req} onClick={() => handleSelect(req)} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default CollapsibleTable;
