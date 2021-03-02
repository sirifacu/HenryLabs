import { Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, 
TablePagination, TableRow, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getPm, getStudents } from '../../../../redux/userReducer/userAction';
import { useStylesProfile } from '../../profile/styles';


const columnStudents = [
    { id: 'email', label: 'Email', minWidth: 55, maxWidth: 55 },
    { id: 'firstName', label: 'Nombre', minWidth: 45, maxWidth: 45 },
    { id: 'lastName', label: 'Apellido', minWidth: 45, maxWidth: 45 },
    { id: 'cellphone', label: 'Teléfono', minWidth: 40, maxWidth: 40 },
    { id: 'pm', label: 'PM', mindWidth: 30, maxWidth: 30 }
]

export const StudentsList = () => {
    const classes = useStylesProfile();
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const students = useSelector(state => state.userReducer.students);
    const pm = useSelector(state => state.userReducer.pm);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [studentPm, setStudentPm] = useState()


    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

     useEffect(() => {
        dispatch(getStudents());
        dispatch(getPm());
    }, [dispatch]);

    useEffect(() => {
        setRows(students.map(row => { return { ...row } }));
        setStudentPm(pm.map(row => { return { ...row } }))
    }, [students, pm]);


    return (
        <Container>
            <Typography variant='h6' align='center'>Lista de Estudiantes</Typography>
            <Container>
                <Grid container>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columnStudents.map((colum) => (
                                        <TableCell
                                            key={colum.id}
                                            align={colum.align}
                                            style={{ minWidth: colum.minWidth, maxWidth: colum.maxWidth }}
                                            
                                        >
                                            {colum.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map
                                    (row => {

                                        if (students != row.id) {
                                            return (
                                                <TableRow className={classes.linked} component={RouterLink} to={`/dashboard/perfil/${row.id}`} hover role="checkbox" tabIndex={-1} key={`${row.code} ${row.id}`}>
                                                    {columnStudents.slice(0).map((colum) => {
                                                        const value = row[colum.id];
                                                        if (colum.id === 'pm') {
                                                            const pms = studentPm.filter(spm => spm.id === row.id)
                                                            return (<TableCell key={`${colum.id} ${row.id}`} align={colum.align} >
                                                                
                                                                {pms.length > 0 ? 'Si' : 'No'}
                                                                </TableCell>)
                                                        }
                                                        return (
                                                            <TableCell key={`${colum.id} ${row.id}`} align={colum.align}>
                                                                {value?.toString()}
                                                            </TableCell>
                                                        );
                                                    })}


                                                </TableRow>
                                            )
                                        }
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
            </Container>
        </Container>
    )
};



export default StudentsList
