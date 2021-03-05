
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Grid, Avatar, Link, Card, CardActions, CardContent, Typography, Badge, Tooltip,
  ListItemText, ListItemAvatar, ListItem, Divider, List, IconButton, LinearProgress,
} from "@material-ui/core";
import {
  Business, Cake, Computer, Edit, Email, Group, GroupWork,
  Language, LocalLibrary,
  LocationCity, PhoneIphone, PinDrop, Public
} from '@material-ui/icons';
import { useStylesProfile, chipStyles} from "./styles";
import { getInfoUserCohort, getUser} from "../../../redux/userReducer/userAction";
import { formatDate } from "./utils";
import UpdateProfile from "./UpdateProfile";
import github from "./assets/github.png"
import google from "./assets/google.png"
import linkedin from './assets/linkedin.jpg'
import firebase from '../../../firebase/index'
import { storage } from '../../../firebase/index'
import { consoleLog } from "../../../services/consoleLog";
import axios from "axios";



export default function Profile() {
  const classes = useStylesProfile();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  const userData = useSelector(state=> state.userReducer.user)
  const infoCohort = useSelector(state=> state.userReducer.infoUserCohort)
  const cohortMessage = useSelector(state => state.userReducer.cohortMessage)
  const [uploadValue, setUploadValue] =  useState(0);
  const [picture, setPicture] =  useState("" );
  const [upload, setUpload] = useState(false)
  const image = picture || userData.avatar;
  
  useEffect(() => {
    dispatch(getUser(userLoggedIn.id));
    dispatch(getInfoUserCohort(userLoggedIn.id));
  }, [dispatch, userLoggedIn.id]);
  
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const storageRef = firebase.storage().ref(`/user/${userLoggedIn.id}/${image?.name}`).put(image)
  
    storageRef.on(
      'state_changed',
      snapshot => {
        setUploadValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setUpload(true)
      },
      error => {
        console.log(error.message)
      },
      async () => {
        await storage
          .ref(`/user/${userLoggedIn.id}`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            axios.put(`/users/update/${userLoggedIn.id}`, { avatar: url })
              .then(() => {
                setPicture( url )
                if(image){
                 setUploadValue(100)
                }
                setUpload(false)
              })
              .catch(error => {consoleLog(error)})
          });
      })
  }
  
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
  
  return (
    <React.Fragment>
      <Grid item container justify="flex-start" direction="column">
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
          <Grid item container justify="center" xs={12} sm={8} md={6} direction="column" alignItems="center">
            <Grid item container justify="center">
                <Badge
                  badgeContent=
                  {
                    <div style={chipStyles} >
                      <Tooltip title="Cambiar imagen" placement="right-end">
                        <IconButton onClick={handleEditPicture}  className="button"><Edit color="secondary"/></IconButton>
                      </Tooltip>
                    </div>
                  }
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange}/>
                  <Avatar src={ image } className={classes.large} />
              </Badge>
            </Grid>
            <Grid container justify="center" >
              {
                upload && <LinearProgress variant="determinate" value={uploadValue} className={classes.progress} color='primary' />
              }
            </Grid>
            <Grid item container justify="center" alignItems="center">
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {`${userData.firstName} ${userData.lastName}`}
              </Typography>
              <Grid item container spacing={2} justify="center" direction="row" alignItems="center">
                <Grid item>
                <Link
                  target="_blank"
                  href="https://accounts.google.com/signin/v2/challenge/pwd?
                  flowName=GlifWebSignIn&
                  flowEntry=ServiceLogin&
                  cid=1&
                  navigationDirection=forward&
                  TL=AM3QAYYdfdc7MiZiXqmE32EqxEymjzvasFAQa0kdh5CXiZ7xalL00wLV0tyZNMw2"
                >
                  <Avatar className={classes.medium} src={google} />
                </Link>
                </Grid>
                <Grid item>
                <Link target="_blank" href={`https://github.com/${userData.githubUser}`}>
                  <Avatar className={classes.medium} src={github} />
                </Link>
                </Grid>
                <Grid item>
                <Link target="_blank" href={`https://www.linkedin.com/in/${userData.linkedinUser}/`}>
                  <Avatar className={classes.medium} src={linkedin} />
                </Link>
                </Grid>
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
        {/* <Divider variant="inset" component="li" />
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
        </ListItem> */}
      </List> : cohortMessage }
    </React.Fragment>
  );
}
