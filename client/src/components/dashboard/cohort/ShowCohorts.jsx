import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCohorts } from '../../../redux/cohortReducer/cohortAction';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  

const ShowCohorts = () => {
    const dispatch = useDispatch();
    const cohorts = useSelector(state => state.cohortReducer.cohorts)
    const classes = useRowStyles();

    useEffect(() => {
        dispatch(getCohorts())
    }, [dispatch])

    return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Titulo</TableCell>
                <TableCell align="right">Cohorte</TableCell>
                <TableCell align="right">Instructor</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Fecha de inicio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cohorts.map((row) => {
                return (
                <TableRow className={classes.root} key={row.id} >
                  <TableCell >
                  </TableCell>
                  <TableCell component="th" scope="row"  >
                    <Link to={`/dashboard/cohortes/${row.id}`}> {row.title} </Link>
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">{row.number}</TableCell>
                  <TableCell component="th" scope="row" align="right">{row.instructor_name}</TableCell>
                  <TableCell component="th" scope="row" align="right">{row.state}</TableCell>
                  <TableCell component="th" scope="row" align="right">{moment(row.initialDate).format('LL')}</TableCell>
              </TableRow>
              )})}
            </TableBody>
          </Table>
      </TableContainer>
    )
}

export default ShowCohorts;