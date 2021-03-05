import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import React from "react";

const headCells = [
  { id: "firstName", numeric: false, disablePadding: false, label: "Nombre" },
  { id: "LastName", numeric: true, disablePadding: true, label: "Apellido" },
  { id: "idGroup", numeric: true, disablePadding: false, label: "Grupo" },
  { id: "setPm", numeric: true, disablePadding: true, label: "" },
  { id: "quitPm", numeric: true, disablePadding: true, label: "" },
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
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => {
          if (headCell.id !== "edit" && headCell.id !== "delete") {
            return (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
                style={{fontWeight: "600", color:'black'}}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  style={{fontWeight: "600", color:'black'}}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden} style={{color:'black'}}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <TableCell key={headCell.id}></TableCell>;
          }
        })}
      </TableRow>
    </TableHead>
  );
}


export default EnhancedTableHead;
