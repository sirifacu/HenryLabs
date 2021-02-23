import { Container, Grid, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import HomeIcon from '@material-ui/icons/Home';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SchoolIcon from '@material-ui/icons/School';
import clsx from 'clsx';
import React, { useState } from 'react';
import SwitchMaterialUi from '@material-ui/core/Switch';
import { Link as RouterLink, Route, Switch } from 'react-router-dom';
import { Cohortes } from '../cohortes/Cohortes'
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { Register } from '../students/register/Register';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Invite } from '../cohortes/invite/Invite';
import EventIcon from '@material-ui/icons/Event';
import CodeIcon from '@material-ui/icons/Code';
import WorkIcon from '@material-ui/icons/Work';
import VideocamIcon from '@material-ui/icons/Videocam';
import WebIcon from '@material-ui/icons/Web';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
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
              color="B0B000"
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
            <Divider />
        <Typography variant="caption">Menu Render Admin/Staff</Typography>
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
          </div>
        </List>
        <Divider />
        {/* Menu alumnos */}
        <Typography variant="caption">Menu Render Estudiantes</Typography>
        <ListItem button component={RouterLink} to="/dashboard/students/register">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Registrate" />
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
        </ListItem>
        <ListItem button component={RouterLink} to="/dashboard/students/">
              <ListItemIcon>
              <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Ofertas de Trabajo" />
        </ListItem>

      </Drawer>
      <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper} >
                  <Switch>
                      <Route path="/dashboard/cohortes" component={Cohortes} />
                      <Route path="/dashboard/invite" component={Invite} />
                      <Route path="/dashboard/students/register" component={Register} />
                  </Switch>
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
    </div>
  );
}
