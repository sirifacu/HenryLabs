import React, { useEffect, useState } from 'react';
import { getCohort } from '../../../../redux/cohortReducer/cohortAction'
import { upgradeToPm, deleteRolPm } from '../../../../redux/userReducer/userAction'
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,
Typography, Paper,  IconButton } from "@material-ui/core/";
import { ToggleButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import  EnhancedTableHeadDetail  from './enhancedTableHeadDetail';
import EnhancedTableToolbar from '../groups/enhancedTableToolbar';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { listCohortStyles } from '../styles';
import moment from 'moment';
import Group from '../groups/Group';


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
  
export default function NewCohortDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const cohort = useSelector(state => state.cohortReducer.cohort);
    const classes = listCohortStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    useEffect(()=> {
      dispatch(getCohort(id))
    }, [id, dispatch])
    
    const handleToPm = (id) => {
      dispatch(upgradeToPm(id))
    }
    
    const handleDeletePm = (id) => {
      dispatch(deleteRolPm(id))
    }
    
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    // const handleSelectAllClick = (event) => {
    //   if (event.target.checked) {
    //     const newSelecteds = cohort.map((n) => n.id);
    //     setSelected(newSelecteds);
    //     return;
    //   }
    //   setSelected([]);
    // };

    // const handleClick = (event, id) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];
    
    //     if (selectedIndex === -1) {
    //       newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //       newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //       newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //       newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1),
    //       );
    //     }
    //     setSelected(newSelected);
    // };
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, cohort.length - page * rowsPerPage);
  
    return (
        <div className={classes.root}>
        <Group />
        <Paper className={classes.paper}>
          <EnhancedTableToolbar/>
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
                        <TableCell style={{color:'black'}} component="th" scope="row" id={labelId} >{row.firstName}</TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" align="right">{row.lastName}</TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" align="right"> {row.email}</TableCell>
                        <TableCell style={{color:'black'}} component="th" scope="row" align="right">
                          {moment(row.createdAt).format("MMM DD  YYYY")}
                        </TableCell>
                        {row.roles.map(rol => console.log('ORw', (row.roles.filter(rol => rol.name === "pm").length)))}
                        {row.roles.reduce(rol => rol.name === "pm") ?                         
                        <TableCell padding="checkbox">
                          <IconButton
                            onClick={(event)=> handleToPm(row.id)}
                            aria-label="Convertir a PM"
                            className={classes.margin}
                            style={{color:'black'}}
                          >
                            <DoneIcon />
                          </IconButton>
                        </TableCell>
                        :
                        <TableCell padding="checkbox">
                          <IconButton
                            onClick={(event)=> handleDeletePm(row.id)}
                            aria-label="Quitar rol PM"
                            className={classes.margin}
                            style={{color:'black'}}
                          >
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                        }
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
            count={cohort.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
}
