import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Table, TableBody, TableCell, TableContainer,  
         TablePagination, TableRow, Paper, 
         Checkbox,  IconButton, Grid, Typography 
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EnhancedTableToolbar from './EnhancedTableToolbar.jsx';
import EnhancedTableHead from './EnhancedTableHead.jsx';
import EnhancedTableFilter from './EnhancedTableFilter.jsx';
import { getFilteredStudentsByCohort } from '../../../../redux/studentReducer/studentAction';
import {useParams} from 'react-router-dom'
import { getCohortDetails } from '../../../../redux/cohortReducer/cohortAction.js';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const CohortDetailTable = () => {
  const {id} = useParams()
  const classes = useStyles();
  const dispatch = useDispatch()
  const students  = useSelector(state => state.studentReducer.studentsCohort)
  const cohort  = useSelector(state => state.cohortReducer.cohortDeatil)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);  

  useEffect(() => {
      dispatch(getCohortDetails(id))
      dispatch(getFilteredStudentsByCohort(id))
  },[dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');

    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const getMigrationsQuantity = (student) => !student.cohorts.length ? "Aun no ingreso" : `${student.migrationsQuantity}`

  const getCheckPointState = (number, student) => {
    let state = student[`checkpoint${number}`]
    if(state === null){
      return "N/R"
    }
    else if(state === false){
      return "D"
    }
    else{
      return "A"
    }
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Grid container justify="center" style={{marginTop:"3%", marginBottom:"3%",}}>
        <Grid item>
          <Typography variant="h3">{cohort.number ? `Cohorte ${cohort.number}` : "Cohorte"}</Typography>
        </Grid>
      </Grid>
      <Paper className={classes.paper} elevation={15}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
        <EnhancedTableFilter cohortId={id} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={students.length}
            />
            <TableBody>
              {stableSort(students, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${row.id}`;
                  let name = `${row.firstName} ${row.lastName}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="left" component="th" id={labelId} scope="row"> {row.email}
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{row.githubUser}</TableCell>
                      <TableCell align="left">{getMigrationsQuantity(row)}</TableCell>
                      <TableCell align="left">{getCheckPointState(1,row)}</TableCell>
                      <TableCell align="left">{getCheckPointState(2,row)}</TableCell>
                      <TableCell align="left">{getCheckPointState(3,row)}</TableCell>
                      <TableCell align="left">{getCheckPointState(4,row)}</TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          component={Link}
                          to={`/dashboard/perfil/${row.id}`} 
                          aria-label="detail"
                          className={classes.margin}
                          style={{color:'black'}}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 45 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default CohortDetailTable;
