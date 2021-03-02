import { AppBar, Collapse, Container, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import SwitchMaterialUi from '@material-ui/core/Switch';
import AddIcon from '@material-ui/icons/Add';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WorkIcon from '@material-ui/icons/Work';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, Route, Switch, useHistory } from 'react-router-dom';
import { changeTheme } from "../../../redux/darkModeReducer/actionsDarkMode";
import { userLogout } from "../../../redux/loginReducer/loginAction";
import Cohort from '../cohort/Cohort';
import CohortDetail from '../cohort/CohortDetail'; // HW
import PostJob from '../jobs/PostJob';
import AddLecture from '../lecture/AddLecture';
import { Register } from '../register/Register';
import { Invite } from '../students/invite/Invite';
import Students from '../students/Students';
import StudentsList from '../students/studentsList/StudentsList';
import JobList from '../jobs/JobList'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Dashboard() {

  const [openClasses, setOpenClasses] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.userLoggedIn.userInfo)
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });
  const classes = useStyles();
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
            <ListItem button component={RouterLink} to="/dashboard/register">
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="Registrar usuario" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/postjob">
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Publicar Trabajo" />
            </ListItem>
            
            {/* <ListItem button component={RouterLink} to="/dashboard/prep">
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
        </ListItem> */}
        <ListItem button component={RouterLink} to="/dashboard/listjobs/">
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
                      <Route exact path="/dashboard/cohortes" component={Cohort} />
                      <Route exact path="/dashboard/cohortes/:id" component={CohortDetail} />
                      <Route path="/dashboard/alumnos" component={Students} />
                      <Route path="/dashboard/invite" component={Invite} />
                      <Route path="/dashboard/studentslist" component={StudentsList} />
                      <Route path="/dashboard/postjob" component={PostJob} />
                      <Route path="/dashboard/register" component={Register} />
                      <Route path="/dashboard/listjobs" component={JobList}/>
                      
                   </Switch>
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
    </div>
  );
}
