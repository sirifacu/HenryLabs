import { TableRow, Table, TableBody, TableCell, TableContainer, TableHead, Paper, ListItem } from '@material-ui/core';
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
  
  function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}  >
          <TableCell>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell component="th" scope="row" align="right">{row.number}</TableCell>
          <TableCell component="th" scope="row" align="right">zzz</TableCell>
          <TableCell component="th" scope="row" align="right">{row.state}</TableCell>
          <TableCell component="th" scope="row" align="right">{row.initialDate}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

const ShowCohorts = () => {
    const dispatch = useDispatch();
    const cohorts = useSelector(state => state.cohortReducer.cohorts)

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
            {cohorts.map((row) => (
              <Row key={row.title} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default ShowCohorts;