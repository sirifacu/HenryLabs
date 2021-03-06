import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Collapse, Box, Typography } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useRowStyles } from './styles';
import clsx from 'clsx';

function Row({ req, handleSelect, selected }) {
    const [ open, setOpen ] = useState(false);
    const classes = useRowStyles();
    return (
      <React.Fragment>
        <TableRow className={clsx(selected?.find(({id}) => id === req.id) ? classes.rootSelected : classes.root)} onClick={() => handleSelect(req)} >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {req.users[0].fullName}
          </TableCell>
          <TableCell align="right">{ req.users.length && req.users[0].cohorts.length && req.users[0].cohorts[0].title}</TableCell>
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
