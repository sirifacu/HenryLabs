import {
  IconButton, Paper, Table, TableBody,
  TableCell, TableContainer, TablePagination, TableRow
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getGroups} from '../../../../redux/groupReducer/actionsGroup'
import { listCohortStyles } from '../styles';
import EnhancedTableHead from './enhancedTableHead.jsx';
import EnhancedTableToolbar from './enhancedTableToolbar.jsx';


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
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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

export default function ListGroups() {
  const classes = listCohortStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch()
  const allGroups = useSelector(state => state.groupReducer.groups)

  useEffect( () => {
      dispatch(getGroups())
  },[])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, allGroups.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={allGroups.length}
            />
            <TableBody>
              {stableSort(allGroups, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow style={{color:'black'}} key={row.id}>
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell style={{color:'black'}} component="th" scope="row" id={labelId} >{row.number}</TableCell>
                      <TableCell style={{color:'black'}} component="th" scope="row" align="right">{row.pm1}</TableCell>
                      <TableCell style={{color:'black'}} component="th" scope="row" align="right"> {row.pm1}</TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          /* component={Link}
                          to={`/dashboard/clase/${row.id}/edit`} */
                          aria-label="update"
                          className={classes.margin}
                          style={{color:'black'}}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          component={Link}
                          to={`/dashboard/cohortes/${row.id}`} 
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
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.Pagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allGroups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}