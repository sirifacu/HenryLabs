
import {
  Avatar, Badge, Card, CardActions, CardContent,
  Divider, Grid,
  IconButton, LinearProgress, Link,
  List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography, Paper, Button
} from "@material-ui/core";
import {
  Business, Cake, Computer, Edit, Email,
  Language, LocalLibrary,
  LocationCity, PhoneIphone, PinDrop, Public
} from '@material-ui/icons';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import linkedin from './assets/linkedin.jpg'
import firebase, { storage } from '../../../firebase/index';
import { getInfoUserCohort, getUser } from "../../../redux/userReducer/userAction";
import { consoleLog } from "../../../services/consoleLog";
import github from "./assets/github.png";
import google from "./assets/google.png";
import { chipStyles, useStylesProfile } from "./styles";
import UpdateProfile from "./UpdateProfile";
import ProfileMigrationForm from './ProfileMigrationForm';
import { formatDate } from "./utils";
import { checkRoles } from '../../../services/checkRoles'
import {Link as RouterLink} from 'react-router-dom'
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';


export default function Profile(props) {
  const classes = useStylesProfile();
  const dispatch = useDispatch();
  const { match: { params: { id } } } = props;
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  const userData = useSelector(state=> state.userReducer.user)
  const infoCohort = useSelector(state=> state.userReducer.infoUserCohort)
  const cohortMessage = useSelector(state => state.userReducer.cohortMessage)
  const token = useSelector(store => store.userLoggedIn.token)
  const [uploadValue, setUploadValue] =  useState(0);
  const [picture, setPicture] =  useState("");
  const [upload, setUpload] = useState(false)
  const [admin, setAdmin] = useState(false)
  const image = picture || userData.avatar;
  
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getInfoUserCohort(id));
  }, [dispatch, id]);

  useEffect(() => {
    /* if(userData.hasOwnProperty("roles")){
      if(userData.roles.length){
        if(userData.roles.find(({name}) => name === "staff" || name === "instructor")){
          setAdmin(true)
        }
      }
    } */
    setAdmin(checkRoles(userData,['staff','instructor']))
  }, [userData])
  
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
        consoleLog(error.message)
      },
      async () => {
        await storage
          .ref(`/user/${userLoggedIn.id}`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            axios.put(`/users/update/${userLoggedIn.id}`, { avatar: url },
              { headers: {'Authorization': 'Bearer ' + token }})
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

  const getCheckPointState = (number, student) => {
    let state = student[`checkpoint${number}`]
    if(state === null){
      return "No rendiste aun"
    }
    else if(state === "failed"){
      return "Desaprobado"
    }
    else{
      return "Aprobado"
    }
  }

  const cohortMsg = () => {
    return admin ? null 
    : ( <Grid container direction="row" >
        { !cohortMessage ?
          <Grid item xs={6} >
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
                  <Filter1Icon />
              </ListItemAvatar>
              <ListItemText
                primary={`Checkpoint 1:  ${getCheckPointState(1,userData)}`}
              />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Filter2Icon />
              </ListItemAvatar>
              <ListItemText
                primary={`Checkpoint 2:  ${getCheckPointState(2,userData)}`}
              />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Filter3Icon />
              </ListItemAvatar>
              <ListItemText
                primary={`Checkpoint 3:  ${getCheckPointState(3,userData)}`}
              />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Filter4Icon />
              </ListItemAvatar>
              <ListItemText
                primary={`Checkpoint 4:  ${getCheckPointState(4,userData)}`}
              />
              </ListItem>

            </List>
          </Grid>
        : cohortMessage }
      </Grid>)
  }


  
  return (
    <React.Fragment>
      <Grid item container justify="flex-start" direction="column">
        <Grid item container justify="flex-start" spacing={3}>
          <Grid item container justify="center" alignItems="center" xs={12} md={6}>
            <Grid item sm={11}>
              <Paper elevation={15} >
                <Grid container direction="column" className={classes.info}>
                  <Grid item container direction="row" alignItems="center" >
                    <Typography variant="h5">Datos Personales</Typography>
                    <UpdateProfile idParams={id} />
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
              </Paper>
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={12} md={6} direction="column" alignItems="center">
            <Grid item container justify="center">
                <Badge
                  badgeContent=
                  {
                   userLoggedIn.id === id ? <div style={chipStyles} >
                      <Tooltip title="Cambiar imagen" placement="right-end">
                        <IconButton onClick={handleEditPicture}  className="button"><Edit color="secondary"/></IconButton>
                      </Tooltip>
                    </div> : ""
                  }
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange}/>
                  <Avatar src={image ? image : "" } className={classes.large} />
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
              {admin ? null 
              : (
                <>
                <Grid item container justify="space-around" alignItems="center" style={{marginTop: "5%"}}>
                  <Grid item xs={6} >
                    <ProfileMigrationForm id={id} minCohort={infoCohort && infoCohort.number} />
                  </Grid>
                  <Grid item xs={5}>
                    <Button variant="contained" className={classes.RejectButton} color="primary" component={RouterLink} to="/panel/agregar-boom">
                    🚀 Boom 🚀
                  </Button>
                  </Grid>
                </Grid>
                </>
              )}
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
      {cohortMsg()}      
    </React.Fragment>
  );
}
