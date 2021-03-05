import React, { useEffect, useState } from 'react';
import { getCohort } from '../../../../redux/cohortReducer/cohortAction'
import { upgradeToPm } from '../../../../redux/userReducer/userAction'
import { deleteRolPm } from '../../../../redux/userReducer/userAction'
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,
Typography, Paper,  IconButton } from "@material-ui/core/";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import  EnhancedTableHeadDetail  from './enhancedTableHeadDetail'
import  EnhancedTableToolbarDetail  from './EnhancedTableToolbarDetail'
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

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
  
export default newCohortDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const cohort = useSelector(state => state.cohortReducer.cohort)
    const classes = listCohortStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(()=> {
      dispatch(getCohort(id))
    }, [id, dispatch])
    
    const handleToPm = () => {
      dispatch(upgradeToPm())
    }

    const handleDeletePm = () => {
      dispatch(deleteRolPm())
    }
  
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
  
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, allCohort.length - page * rowsPerPage);
  
    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbarDetail/>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHeadDetail
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={cohort.length}
              />
              <TableBody>
                {stableSort(cohort, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow style={{color:'black'}} key={row.id}>
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" id={labelId} >{row.title}</TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" align="right">{row.number}</TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" align="right"> {row.instructor_name}</TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" align="right">{row.state}</TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" align="right">
                          {moment(row.createdAt).format("MMM Do YY")}
                        </TableCell>
                        <TableCell padding="checkbox">
                          <IconButton
                            onClick={handleToPm()}
                            aria-label="Convertir a PM"
                            className={classes.margin}
                            style={{color:'black'}}
                          >
                            <DoneIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <IconButton
                            onclick={handleDeletePm()}
                            aria-label="Quitar rol PM"
                            className={classes.margin}
                            style={{color:'black'}}
                          >
                            <ClearIcon />
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
            count={allCohort.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
}
