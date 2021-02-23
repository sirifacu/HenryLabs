import { TableRow, Table, TableBody, TableCell, TableContainer, TableHead, Paper, ListItem } from '@material-ui/core';
import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
  function createData(name, cohort, instructor, state, day) {
    return {
      name,
      cohort,
      instructor,
      state,
      day,
      history: [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
      ],
    };
  }
  
  function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
          </TableCell>
          <ListItem button>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
        </ListItem>
          <TableCell align="right">{row.cohort}</TableCell>
          <TableCell align="right">{row.instructor}</TableCell>
          <TableCell align="right">{row.state}</TableCell>
          <TableCell align="right">{row.day}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      cohort: PropTypes.number.isRequired,
      instructor: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  //get de todos los cohortes
  const rows = [
    createData('Fullstack Js', 14, "Franco", "active", "22/02/2021"),
    createData('Java', 15, "Agustin", "created", "13/03/2021"),
    createData('FullStack Js',  7, "Toni", "finished", "17/09/2020"),
    createData('Phyton', 16, "Diego", "created", "18/04/2021"),
  ];

const ShowCohorts = () => {
    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell align="right">Cohort</TableCell>
              <TableCell align="right">Instructor</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Initial Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default ShowCohorts;