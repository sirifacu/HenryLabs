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
import { getLectures } from '../../../../redux/lectureReducer/lectureAction.js';
import { listLecturesStyles } from '../styles';
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

export default function ListLectures() {
  const classes = listLecturesStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch()
  const allLectures = useSelector(state => state.lectureReducer.filteredLectures)

  useEffect( () => {
      dispatch(getLectures())
  },[dispatch]);


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


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, allLectures.length - page * rowsPerPage);

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
              rowCount={allLectures.length}
            />
            <TableBody>
              {stableSort(allLectures, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        size={"small"}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="right" size={"small"} padding={"none"}>{row.module}</TableCell>
                      <TableCell align="right" size={"small"}> 
                        {row.description}
                      </TableCell>
                      <TableCell align="right">{row.videoURL}</TableCell>
                      <TableCell padding="checkbox">
                        {moment(row.createdAt).format("MMM Do YY")}
                      </TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          component={Link}
                          to={`/panel/clase/${row.id}/editar`}
                          aria-label="update"
                          className={classes.margin}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          component={Link}
                          to={`/panel/clase/${row.id}/detalle`}
                          aria-label="detail"
                          className={classes.margin}
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allLectures.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}