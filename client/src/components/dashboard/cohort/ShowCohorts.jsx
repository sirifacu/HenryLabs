import { TableRow, Table, TableBody, TableCell, TableContainer, TableHead, Paper } from '@material-ui/core';
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCohorts } from '../../../redux/cohortReducer/cohortAction'
import { Link } from 'react-router-dom'

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
    const newCohort = useSelector(state => state.cohortReducer.newCohort)
    const classes = useRowStyles();

    useEffect(() => {
        dispatch(getCohorts())
    }, [dispatch, newCohort])

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
            {cohorts && cohorts.map((row) => (
               <TableRow className={classes.root} key= {row.id} >
               <TableCell >
               </TableCell>
               <TableCell component="th" scope="row"  >
                 <Link to={`/dashboard/cohortes/${row.id}`}>{row.title} </Link>
               </TableCell>
               <TableCell component="th" scope="row" align="right">{row.number}</TableCell>
               <TableCell component="th" scope="row" align="right"> </TableCell>
               <TableCell component="th" scope="row" align="right">{row.state}</TableCell>
               <TableCell component="th" scope="row" align="right">{row.initialDate}</TableCell>
             </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default ShowCohorts;