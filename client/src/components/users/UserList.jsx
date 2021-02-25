import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, IconButton, TablePagination,
TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import { getUsers } from '../../redux/user/actionUser';

// const students =  {
//         id: 1,
//         firstName: "Lean",
//         lastName: "Nicolau",
//         email: "diego@gmail.com",
//         cellphone: "3517728831",
//         role: "Student",
//         pm: false,
// }


const columnStudents = [
    {id: 'email', label: 'Email', minWidth: 55, maxWidth: 55},
    {id: 'firstName', label: 'Nombre', minWidth: 45, maxWidth: 45},
    {id: 'lastName', label: 'Apellido', minWidth: 45, maxWidth: 45},
    {id: 'cellphone', label: 'Teléfono', minWidth: 40, maxWidth: 40},
    {id: 'role', label: 'Rol', mindWidth: 30, maxWidth: 30},
    {id: 'pm', label: 'PM', mindWidth: 30, maxWidth: 30}
]

function UsersList() {
    const dispatch = useDispatch();
        const [ rows, setRows ] = useState([]);
        const students = useSelector(state=> state.userListReducer.userList);
        const [ page, setPage ] = useState(0);
        const [ rowsPerPage, setRowsPerPage ] = useState(10);

        const handleChangePage = (e, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = event => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };
        

        useEffect(() => {
            dispatch(getUsers(students));
        }, [dispatch]);

        useEffect(() => {
            setRows(students.map(row => { return {...row}}));
        },[students]);



            return (
                <Container>
                    <Typography variant='h3' align='center'>Lista de Estudientaes</Typography>
                    <Container>
                        <Grid container>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columnStudents.map((colum)=>(
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
                                        { rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map
                                        (row =>{
                                        
                                            if(students != row.id){
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={`${row.code} ${row.id}`}>
                                                    {columnStudents.slice(0).map((colum)=>{                                                
                                                        const value = row[colum.id];
                                                        if(colum.id === 'pm'){
                                                            return ( <TableCell key={`${colum.id} ${row.id}`} align={colum.align}>
                                                            {value?.toString() === 'true'? 'Si': 'No'}                                                         </TableCell> )
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
    
    
    
    export default UsersList
    