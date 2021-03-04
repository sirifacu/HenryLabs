import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import PropTypes from 'prop-types';
import { consoleLog } from '../../../../services/consoleLog';



const headCells = [
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', toolTip: "Email" },
    { id: 'name', numeric: false, disablePadding: false, label: 'Nombre', toolTip: "Nombre y Apellido" },
    { id: 'githubUser', numeric: false, disablePadding: false, label: 'Github', toolTip: "Usuario Github" },
    { id: 'migrationsQuantity', numeric: false, disablePadding: false, label: 'Mig', toolTip: "Migraciones" },
    { id: 'checkpoint1', numeric: false, disablePadding: false, label: 'CP-1', toolTip: "Checkpoint 1" },
    { id: 'checkpoint2', numeric: false, disablePadding: false, label: 'CP-2', toolTip: "Checkpoint 2" },
    { id: 'checkpoint3', numeric: false, disablePadding: false, label: 'CP-3', toolTip: "Checkpoint 3" },
    { id: 'checkpoint4', numeric: false, disablePadding: false, label: 'CP-4', toolTip: "Checkpoint 4" },
    { id: 'view', numeric: false, disablePadding: false, label: '', toolTip: "Ver Alumno" },
  ];
  
const EnhancedTableHead = (props) => {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <Tooltip disableFocusListener placement="bottom-start" key={headCell.id} disableTouchListener title={`${headCell.toolTip}`}>
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            </Tooltip>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  export default EnhancedTableHead;
  