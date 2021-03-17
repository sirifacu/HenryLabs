import {
	AppBar, Collapse, Container, CssBaseline, Divider, Drawer, Grid, IconButton, List,
	ListItem, ListItemIcon, ListItemText, Paper, Toolbar, Typography, Avatar
} from '@material-ui/core';
import SwitchMaterialUi from '@material-ui/core/Switch';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddIcon from '@material-ui/icons/Add';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import WorkIcon from '@material-ui/icons/Work';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, Redirect, Switch, useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import { changeTheme } from "../../../redux/darkModeReducer/actionsDarkMode";
import { stopNotification, userLogout } from "../../../redux/loginReducer/loginAction";
import BoomDetail from "../booms/BoomDetail";
import BoomList from "../booms/boomsTable/BoomList";
import PostBoom from "../booms/PostBoom";
import Cohort from '../cohort/Cohort';
import CohortDetailTable from '../cohort/cohortDetailTable/CohortDetailTable';
import ApplyList from '../jobs/ApplyList';
import JobDetail from '../jobs/JobDetail';
import JobList from '../jobs/JobList';
import PostJob from '../jobs/PostJob';
import AddLecture from '../lecture/AddLecture';
import EditLectures from '../lecture/EditLectures';
import LectureDetail from '../lecture/LectureDetail';
import ListLectures from '../lecture/lecturesTable/listLectures';
import NewsDetail from '../news/NewsDetail';
import NewsAndBoomsList from '../news/NewsAndBoomsList';
import NewsPost from '../news/NewsPost';
import Profile from "../profile/Profile";
import { Register } from '../register/Register';
import StudentLectures from '../studentLectures/StudentLectures';
import { Invite } from '../students/invite/Invite';
import Students from '../students/Students';
import { PrivateRoute } from '../../ProtectedRoute';
import NewCalendar from '../calendar/Calendar'
import { useStyles } from './styles'
import RequestsList from '../migrationRequests/RequestsList'
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import axios from 'axios';
import blackPeke from '../../../assets/blackPeke.png'
import yellowPeke from '../../../assets/yellowPeke.png'
import cumplañito from '../../../assets/cumplañito.jpg'
import NewsList from '../news/newsTable/NewsList';


const showAlert = (message) => {
	return Swal.fire({
		title: `Feliz cumplañito ${message}.`,
		text: 'De parte de todo el equipo de henry te deseamos un feliz cumpleaños y un prospero año nuevo.',
		width: 550,
		imageUrl: cumplañito,
		imageAlt: "cumplañito",
		imageWidth: 300,
		padding: '3em',
		backdrop: `rgba(182, 179, 179, 0.4)`,
		showConfirmButton: false,
	});
};

export default function Dashboard() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const [openClasses, setOpenClasses] = useState(false);
	const [openNews, setOpenNews] = useState(false);
	const [openBooms, setOpenBooms] = useState(false)
	const [openJobs, setOpenJobs] = useState(false)
	const user = useSelector(store => store.userLoggedIn.userInfo) || "";
	const type = useSelector(state => state.darkModeReducer.palette.type);
	const cumplañito = useSelector(store => store.userLoggedIn.cumplañito);
	const [avatar, setAvatar] = useState('')
	const force = sessionStorage.getItem('force')
	const [state, setState] = useState({
		checkedA: false,
		checkedB: false,
	});
	const [open, setOpen] = useState(true);
 
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
		setOpenClasses(false)
	};

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
		dispatch(changeTheme(event.target.checked))
	};

	const logOutHandler = () => {
		dispatch(userLogout())
		history.push('/')
	};

	const handleClick = () => {
		setOpenClasses(!openClasses);
	};
	
	let roles = [];
	user.roles && user.roles.forEach(role => {
		return roles.push(role.name)
	})
 
	useEffect(() => {
		if (user && force) {
		history.push('/completar-perfil')
		}
		if(user && !force){
		cumplañito && showAlert(user.firstName)
		dispatch(stopNotification())
		}
		if(user.id){
			axios.get(`/users/getAvatar/${user.id}`)
			.then(res => setAvatar(res.data))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history, user]);

  	return (
    	<div className={classes.root}>
      		<CssBaseline />
      		<AppBar
        		position="absolute"
        		className={clsx(classes.appBar, open && classes.appBarShift)}
      		>
        	<Toolbar className={classes.toolbar}>
				<IconButton
					edge="start"
					color="primary"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					className={clsx(
					classes.menuButton,
					open && classes.menuButtonHidden
					)}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					component="h1"
					variant="h6"
					color="primary"
					noWrap
					className={classes.title}
				>
				{state.checkedB === false ? <img src={blackPeke} /> : <img src={yellowPeke} /> }
				</Typography>
				<Paper elevation={12} className={classes.paperProfile}>
					<Grid container spacing={2} justify="space-between" className={classes.noWrap} alignItems="center" onClick={()=>history.push(`/panel/perfil/${user.id}`)}>
						<Grid item container spacing={1} >
							<Grid item>
								<Typography variant="body2">{`${user.firstName}`}</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2">{`${user.lastName}`}</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Avatar alt={user.name} src={avatar}/>
						</Grid>
					</Grid>
				</Paper>
				{ type === 'dark' ? <Brightness7Icon color="primary" /> : <Brightness2Icon color="primary"/> }
				<SwitchMaterialUi
					checked={state.checkedB}
					onChange={handleChange}
					color="primary"
					name="checkedB"
					inputProps={{ 'aria-label': 'primary checkbox' }}
				/>
				<ExitToAppOutlinedIcon onClick={logOutHandler} fontSize="large" className={classes.logOut} />
        	</Toolbar>
      	</AppBar>
      	<Drawer
			variant="permanent"
			classes={{
			paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
			}}
			open={open}
		>
			<div className={classes.toolbarIcon}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				<div>
					<ListItem button component={RouterLink} to="/panel">
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Inicio" />
					</ListItem>

					<ListItem button component={RouterLink} to={`/panel/calendario`}>
               <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Calendario" />
            </ListItem>{
						roles.includes('student') ? (
							<>
							<ListItem button component={RouterLink} to="/panel/lista-trabajos/">
							<ListItemIcon>
								<WorkIcon />
							</ListItemIcon>
							<ListItemText primary="Ofertas de Trabajo" />
						    </ListItem>
							<ListItem button component={RouterLink} to="/panel/mis-clases/">
								<ListItemIcon>
									<AccountBalanceIcon/>
								</ListItemIcon>
								<ListItemText primary="Mis Clases"/>
							</ListItem>
							</>
						) : null
					}
					{
						roles.includes('staff') || roles.includes('admin') ? (
							<>
							<ListItem button onClick={()=> setOpenNews(!openNews)} >
								<ListItemIcon>
									<AnnouncementIcon />
								</ListItemIcon>
								<ListItemText primary="Noticias" />
								{openNews ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
								<Collapse in={openNews} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem button className={classes.nested} component={RouterLink} to='/panel/noticias'>
											<ListItemIcon>
												<ListIcon />
											</ListItemIcon>
											<ListItemText primary="Todas las Noticias" />
										</ListItem>
										<ListItem button className={classes.nested} component={RouterLink} to='/panel/agregar-noticia'>
											<ListItemIcon>
												<PostAddIcon />
											</ListItemIcon>
											<ListItemText primary="Publicar noticia" />
										</ListItem>
									</List>
								</Collapse>
								<ListItem button onClick={()=> setOpenBooms(!openBooms)} >
								<ListItemIcon>
									<NewReleasesIcon />
								</ListItemIcon>
								<ListItemText primary="Booms" />
								{openBooms ? <ExpandLess /> : <ExpandMore />}
							    </ListItem>
								<Collapse in={openBooms} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem button className={classes.nested} component={RouterLink} to='/panel/lista-booms'>
											<ListItemIcon>
												<ListIcon />
											</ListItemIcon>
											<ListItemText primary="Todos los Booms" />
										</ListItem>
										<ListItem button className={classes.nested} component={RouterLink} to="/panel/agregar-boom">
										  <ListItemIcon>
									         <FlightTakeoffIcon />
								          </ListItemIcon>
								          <ListItemText primary="Publicar Boom" />
										</ListItem>
									</List>
								</Collapse>
								<ListItem button onClick={()=> setOpenJobs(!openJobs)} >
								<ListItemIcon>
								    <WorkIcon />
								</ListItemIcon>
								<ListItemText primary="Trabajos" />
								{openJobs ? <ExpandLess /> : <ExpandMore />}
							    </ListItem>
								<Collapse in={openJobs} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem button className={classes.nested} component={RouterLink} to='/panel/lista-trabajos'>
											<ListItemIcon>
												<ListIcon />
											</ListItemIcon>
											<ListItemText primary="Todos las Ofertas" />
										</ListItem>
										<ListItem button className={classes.nested} component={RouterLink} to="/panel/agregar-trabajo">
										   <ListItemIcon>
								              <WorkIcon />
								           </ListItemIcon>
								           <ListItemText primary="Publicar Trabajo" />
										</ListItem>
									</List>
								</Collapse>
							<ListItem button component={RouterLink} to="/panel/registro">
								<ListItemIcon>
									<LockOpenIcon />
								</ListItemIcon>
								<ListItemText primary="Registrar usuario" />
							</ListItem>
							</>
						) : null
					}
					{
						roles.includes('instructor') || roles.includes('staff') || roles.includes('admin') ? (
							<>
								<ListItem button onClick={handleClick} >
									<ListItemIcon>
										<ClassIcon />
									</ListItemIcon>
									<ListItemText primary="Clases" />
									{openClasses ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse in={openClasses} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem button className={classes.nested} component={RouterLink} to="/panel/lista-clases">
											<ListItemIcon>
												<ListIcon />
											</ListItemIcon>
											<ListItemText primary="Todas las Clases" />
										</ListItem>
										<ListItem button className={classes.nested} component={RouterLink} to="/panel/agregar-clase">
											<ListItemIcon>
												<AddIcon />
											</ListItemIcon>
											<ListItemText primary="Subir Clase" />
										</ListItem>
									</List>
								</Collapse>
								<ListItem button component={RouterLink} to="/panel/cohortes">
									<ListItemIcon>
										<GroupWorkIcon />
									</ListItemIcon>
									<ListItemText primary="Cohortes" />
								</ListItem>
								<ListItem button component={RouterLink} to="/panel/alumnos">
									<ListItemIcon>
										<PeopleAltIcon />
									</ListItemIcon>
									<ListItemText primary="Alumnos" />
								</ListItem>
								<ListItem button component={RouterLink} to="/panel/migraciones">
									<ListItemIcon>
										<SwapHorizontalCircleIcon />
									</ListItemIcon>
									<ListItemText primary="Migraciones" />
								</ListItem>
							</>
						) : null
					}
					<Divider />
				</div>
        	</List>
    	</Drawer>
      		<main className={classes.content}>
            	<div className={classes.appBarSpacer} />
            	<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={12} lg={12}>
							<Paper className={classes.paper} >
								<Switch>
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path='/panel' component={NewsAndBoomsList}/>
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} path='/panel/perfil/:id' component={Profile}/>
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path="/panel/lista-trabajos/:id" component={JobDetail}/>
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path="/panel/lista-trabajos" component={JobList}/>
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path="/panel/noticia/:id" component={NewsDetail}/>
									<PrivateRoute roles={['staff', 'admin']} path="/panel/noticias" component={NewsList}/>
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} path='/panel/clase/:id/detalle' component={LectureDetail} />
									<PrivateRoute roles={['student']} path='/panel/mis-clases' component={StudentLectures} />
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path="/panel/lista-booms" component={BoomList} />
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path="/panel/agregar-boom" component={PostBoom} />
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path="/panel/lista-booms/:id" component={BoomDetail}/>
									<PrivateRoute roles={['staff', 'admin']} path="/panel/agregar-trabajo" component={PostJob} />
									<PrivateRoute roles={['staff', 'admin']} path="/panel/registro" component={Register} />
									<PrivateRoute roles={['staff', 'admin']} path="/panel/agregar-noticia" component={NewsPost} />
									<PrivateRoute roles={['instructor', 'staff', 'admin']} path="/panel/invitar" component={Invite} />
									<PrivateRoute roles={['student', 'instructor', 'staff', 'admin']} exact path="/panel/calendario" component={NewCalendar}/>
									<PrivateRoute roles={['instructor', 'staff', 'admin']} path='/panel/lista-clases' component={ListLectures} />
									<PrivateRoute roles={['instructor', 'staff', 'admin']} path='/panel/agregar-clase' component={AddLecture} />
									<PrivateRoute roles={['instructor', 'staff', 'admin']} path='/panel/clase/:lectureId/editar' component={EditLectures} />
									<PrivateRoute roles={['instructor', 'staff', 'admin']} exact path="/panel/cohortes" component={Cohort} />
									<PrivateRoute roles={['instructor', 'staff', 'admin']} exact path="/panel/cohortes/:id" component={CohortDetailTable} />
									<PrivateRoute roles={['instructor', 'staff', 'admin']} path="/panel/alumnos" component={Students} />
									<PrivateRoute roles={['staff', 'admin']} exact path="/panel/postulantes/:id" component={ApplyList}/>
									<PrivateRoute roles={['instructor', 'staff', 'admin']} path="/panel/migraciones" component={RequestsList} />
									{force === 'pending' && <Redirect to='/completar-perfil'/>}
								</Switch>
							</Paper>
						</Grid>
					</Grid>
            	</Container>
        	</main>
    	</div>
  	);
};
