import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Collapse, Box, Typography } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useRowStyles } from './styles';

function Row({ req }) {
    const [ open, setOpen ] = useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {req.users[0].fullName}
          </TableCell>
          <TableCell align="right">{req.cohorts[0].name}</TableCell>
          <TableCell align="right">{req.wishedStartingDate}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h5" gutterBottom component="div">
                  Razón para migrar
                </Typography>
                <Typography variant="h6">
                  {req.reason}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

export default Row;
