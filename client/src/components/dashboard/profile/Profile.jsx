import {
  Avatar, Badge,
  Button, Card, CardActions, CardContent,
  Dialog, DialogTitle,
  Divider, Grid, Link,
  List, ListItem, ListItemAvatar, ListItemText, Paper, Typography
} from "@material-ui/core";
import {
  Business, Cake, Computer, Edit, Email, Group, GroupWork,
  Language, LocalLibrary,
  LocationCity, PhoneIphone, PinDrop, Public
} from '@material-ui/icons';
import React, { useEffect } from "react";
import AvatarEditor from 'react-avatar-editor';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUserCohort, getUser } from "../../../redux/userReducer/userAction";
import github from "./assets/github.png";
import google from "./assets/google.png";
import imagen from "./assets/Lillo-R.png";
import { chipStyles, useStylesProfile } from "./styles";
import UpdateProfile from "./UpdateProfile";
import { formatDate } from "./utils";

export default function Profile() {
  const classes = useStylesProfile();
  const dispatch = useDispatch()
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  const userData = useSelector(state=> state.userReducer.user)
  const infoCohort = useSelector(state=> state.userReducer.infoUserCohort)
  const cohortMessage = useSelector(state => state.userReducer.cohortMessage)
  
  useEffect(() => {
    dispatch(getUser(userLoggedIn.id));
    dispatch(getInfoUserCohort(userLoggedIn.id));
  }, [dispatch, userLoggedIn.id]);
  
  return (
    <React.Fragment>
      <Dialog aria-labelledby="simple-dialog-title" open={false}>
        <DialogTitle id="simple-dialog-title">Edit Avatar</DialogTitle>
        <Paper elevation={3} className={classes.PaperModal}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <AvatarEditor
                width={250}
                height={250}
                border={50}
                borderRadius={150}
                color={[0, 0, 0, 0.5]} // RGBA
              />
            </Grid>
            <Grid container item direction="row" justify="space-between">
              <Grid item xs={4}>Zoom:</Grid>
              <Grid item xs={8}>
                <input
                  style={{ width: "100%" }}
                  name="scale"
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  defaultValue="1"
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" justify="space-between">
              <Grid item xs={4}>Rotation:</Grid>
              <Grid item xs={8}>
                <input
                  style={{ width: "100%" }}
                  name="scale"
                  type="range"
                  min="0"
                  max="180"
                  step="1"
                  defaultValue="0"
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
  
      <Grid container justify="flex-start" direction="column">
        <Grid item container justify="flex-start">
          <Grid item container justify="flex-start" xs={12} sm={8} md={6}>
            <Grid item sm={3}>
              <Card className={classes.root} variant="outlined">
                <CardContent className={classes.dataUser}>
                  <Grid container direction="column" className={classes.info}>
                    <Grid item container direction="row" alignItems="center" >
                      <Typography variant="h5">Datos Personales</Typography>
                      <UpdateProfile />
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <Email color="secondary" className={classes.icons} />
                      <Typography
                        className={classes.titles}
                        color="textPrimary"
                        gutterBottom
                        variant="body1"
                      >
                        Email: {userData?.email}
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <Cake color="secondary" className={classes.icons} />
                      <Typography color="textPrimary" variant="body1" className={classes.titles} >
                        Fecha de nacimiento: {userData? formatDate(userData.dateOfBirth): ""}
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <Business color="secondary" className={classes.icons} />
                      <Typography color="textPrimary" variant="body1" className={classes.titles} >
                        Dirección: {userData?.address}
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <LocationCity color="secondary" className={classes.icons} />
                      <Typography color="textPrimary" variant="body1" className={classes.titles} >
                        Ciudad: {userData?.city}
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <PinDrop color="secondary" className={classes.icons} />
                      <Typography color="textPrimary" variant="body1" className={classes.titles} >
                        Provincia: {userData?.state}
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <Public color="secondary" className={classes.icons} />
                      <Typography color="textPrimary" variant="body1" className={classes.titles} >
                        País: {userData?.country}
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <Language  color="secondary" className={classes.icons} />
                      <Typography color="textPrimary" variant="body1" className={classes.titles} >
                        Nacionalidad: {userData?.nationality}
                      </Typography>
                    </Grid>
                    <Grid item container direction="row" alignItems="center" className={classes.pos} >
                      <PhoneIphone color="secondary" className={classes.icons} />
                      <Typography color="textPrimary" variant="body1" className={classes.titles} >
                        Teléfono/Celular: {userData?.cellphone}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.button}>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={12} sm={8} md={6} direction="column">
            <Grid item container justify="center">
              <Badge
                badgeContent={
                  <div style={chipStyles}>
                    <Edit />
                  </div>
                }
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  src={imagen}
                  className={classes.large}
                />
              </Badge>
            </Grid>
            <Grid item container justify="center">
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {`${userData.firstName} ${userData.lastName}`}
              </Typography>
              <Grid item container justify="center" direction="row">
                <Link
                  target="_blank"
                  href="https://accounts.google.com/signin/v2/
                  identifier?hl=en&passive=true&continue=https%3A%2F%2Fwww.google.
                  com%2F&ec=GAZAmgQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                >
                  <Avatar className={classes.medium} src={google} />
                </Link>
                <Link target="_blank" href={`https://github.com/${userData.githubUser}`}>
                  <Avatar className={classes.medium} src={github} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="space-around"
          direction="row"
          sm={12}
          style={{ marginTop: "2%" }}
        >
          <Grid item sm={10}>
          </Grid>
        </Grid>
      </Grid>
      { !cohortMessage ? 
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Computer />
          </ListItemAvatar>
          <ListItemText
            primary="Cohorte"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  {infoCohort.number}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <LocalLibrary />
          </ListItemAvatar>
          <ListItemText
            primary="Instructor"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  {infoCohort.instructor}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <GroupWork />
          </ListItemAvatar>
          <ListItemText
            primary="Grupo Stand Up"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  to Scott, Alex, Jennifer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Group />
          </ListItemAvatar>
          <ListItemText
            primary="Pm"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  Sandra Adams
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">
                  Sandra Adams
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List> : cohortMessage }
    </React.Fragment>
  );
}
