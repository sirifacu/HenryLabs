import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import React from "react";

const headCells = [
  { id: "student", numeric: false, disablePadding: true, label: "Estudiante" },
  { id: "status", numeric: true, disablePadding: true, label: "Estado" },
  { id: "createdAt", numeric: true, disablePadding: false, label: "Fecha" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (headCell.id !== "edit" && headCell.id !== "delete") {
            return (
              <TableCell
                key={headCell.id}
                align="left"
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <TableCell key={headCell.id}></TableCell>;
          }
        })}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}


export default EnhancedTableHead;
