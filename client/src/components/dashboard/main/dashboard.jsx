import { AppBar, Container, Grid, Link, Paper, CssBaseline, Divider, Drawer, IconButton, List, 
ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from "@material-ui/icons/Person";
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
import { Link as RouterLink, Route, Switch } from "react-router-dom";
import Profile from '../../profile/Profile';
import UsersList from '../../users/UserList';

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
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar} >
          
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
            <ListItem button component={RouterLink} to="/dashboard/profile">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Mi Perfil" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/cohortes">
              <ListItemIcon>
                <GroupWorkIcon />
              </ListItemIcon>
              <ListItemText primary="Cohortes" />
            </ListItem>
            <ListItem button component={RouterLink} to="/dashboard/userslist">
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
      </Drawer>
      <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper} id="bill" >
                  <Switch>
                      <Route path="/dashboard/profile" component={Profile} />
                      <Route path="/dashboard/userslist" component={UsersList} />
                  </Switch>
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
        </div>
  );
}
