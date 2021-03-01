import { AppBar, CssBaseline, Collapse, Container, Divider, Drawer, Grid, IconButton, List,
ListItem, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useStylesDashboard } from './styles'
import ListIcon from '@material-ui/icons/List';
import EventIcon from '@material-ui/icons/Event';
import CodeIcon from '@material-ui/icons/Code';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ClassIcon from '@material-ui/icons/Class';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import HomeIcon from '@material-ui/icons/Home';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SchoolIcon from '@material-ui/icons/School';
import VideocamIcon from '@material-ui/icons/Videocam';
import WebIcon from '@material-ui/icons/Web';
import WorkIcon from '@material-ui/icons/Work';
import clsx from 'clsx';
import React, { useState } from 'react';
import Cohort from '../cohort/Cohort'
import CohortDetail from '../cohort/CohortDetail'; // HW
import Students from '../students/Students'
import StudentsList from '../students/studentsList/StudentsList';
import PostJob from '../jobs/PostJob'
import Profile from "../profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, Route, Switch, useHistory } from 'react-router-dom';
import { changeTheme } from "../../../redux/darkModeReducer/actionsDarkMode";
import { userLogout } from "../../../redux/loginReducer/loginAction";
import { Invite } from '../students/invite/Invite';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import SwitchMaterialUi from '@material-ui/core/Switch';
import AddLecture from '../lecture/AddLecture'


export default function Dashboard() {
  
  const [openClasses, setOpenClasses] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(store => store.userLoggedIn.userInfo.id)
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });
  const classes = useStylesDashboard();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
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
            color="inherit"
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
            color="inherit"
            noWrap
            className={classes.title}
          >
            Admin Panel
          </Typography>
          <Brightness2Icon />
          <SwitchMaterialUi
            checked={state.checkedB}
            onChange={handleChange}
            color="secondary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
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
          
            <ListItem button component={RouterLink} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={RouterLink} to={`/dashboard/perfil/${userId}`}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>
            <ListItem button onClick={handleClick} to="/dashboard">
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Clases" />
              {openClasses ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openClasses} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={RouterLink} to="/dashboard/lista_clases">
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Todas las Clases" />
                </ListItem>
                <ListItem button className={classes.nested} component={RouterLink} to="/dashboard/agregar_clase">
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subir Clase" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button component={RouterLink} to="/dashboard/cohortes">
              <ListItemIcon>
                <GroupWorkIcon />
              </ListItemIcon>
              <ListItemText primary="Cohortes" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/alumnos">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Alumnos" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/prep">
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Prep Course" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/bootcamp">
              <ListItemIcon>
                <LaptopChromebookIcon />
              </ListItemIcon>
              <ListItemText primary="Bootcamp" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/labs">
              <ListItemIcon>
                <LabelImportantIcon />
              </ListItemIcon>
              <ListItemText primary="Labs" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/graduados">
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Graduados" />
            </ListItem>
            {/* Menu alumnos */}
            <ListItem button component={RouterLink} to="/dashboard/students/">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Calendario" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/students/">
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Henry Blog" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/students/">
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Pair Programming" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/students/">
              <ListItemIcon>
                <VideocamIcon />
              </ListItemIcon>
              <ListItemText primary="Ver Clases Grabadas" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/students/">
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Ofertas de Trabajo" />
            </ListItem>
            <Divider></Divider>
            <ListItem button onClick={logOutHandler}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
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
                      <Route path='/dashboard/agregar_clase' component={AddLecture} />
                      <Route path='/dashboard/perfil/:id' component={Profile}/>
                      <Route exact path="/dashboard/cohortes" component={Cohort} />
                      <Route exact path="/dashboard/cohortes/:id" component={CohortDetail} />
                      <Route path="/dashboard/alumnos" component={Students} />
                      <Route path="/dashboard/invite" component={Invite} />
                      <Route path="/dashboard/studentslist" component={StudentsList} />
                   </Switch>
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
    </div>
  );
}
