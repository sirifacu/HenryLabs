import { Grid, Paper, Table, TableBody, TableContainer, TableRow, TableCell, IconButton, TablePagination } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBooms } from "../../../../redux/boomsReducer/actionsBooms";
import { useStylesBoomList } from "../styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EnhancedTableToolbar from './enhancedTableToolbar';
import EnhancedTableHead from './enhancedTableHead';
import moment from 'moment';

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


const BoomList = () => {
  const dispatch = useDispatch();
  const classes = useStylesBoomList();
  const boomState = useSelector((state) => state.boomReducer.booms);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, boomState.length - page * rowsPerPage);

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

  useEffect(() => {
    dispatch(getBooms());
  }, []);

  return (
    <>
      <Grid className={classes.root}>
          <Paper className={classes.paper}>  
           <EnhancedTableToolbar/>
           <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table"
              className={classes.table}
            >
              <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={boomState.length}
            />
                <TableBody>
              {stableSort(boomState , getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        id={labelId}
                        scope="row"
                        size={"small"}
                      >
                        {row.student}
                      </TableCell>
                      <TableCell align="left" size={"small"}> 
                        {row.status}
                      </TableCell>
                      <TableCell size={"small"}>
                        {moment(row.createdAt).format("YYYY/MM/DD HH:MM")}
                      </TableCell>                     
                      <TableCell size={"small"}>
                        <IconButton
                          component={Link}
                          to={`/panel/lista-booms/${row._id}`}
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
              count={boomState.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
    </>
  );
};

export default BoomList;
