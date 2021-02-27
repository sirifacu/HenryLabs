import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Grid, Avatar, Link, Card, CardActions, CardContent, Typography, 
Badge, Dialog, DialogTitle, Button, Paper } from "@material-ui/core";
import { useStylesProfile } from './styles'
import { getUser } from '../../../redux/userReducer/userAction';
import UpdateProfile from "./UpadateProfile";
import EditIcon from '@material-ui/icons/Edit';
import AvatarEditor from 'react-avatar-editor'
import decode from "jwt-decode";
import imagen from "./assets/Lillo-R.png";
import google from "./assets/google.png";
import github from "./assets/github.png";


const chipStyles = {
  backgroundColor: '#d4cfc9',
  borderRadius: '200px 200px 200px 200px',
  width: '35px',
  height: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
}

export default function Profile(props) {
  const classes = useStylesProfile();
  const dispatch = useDispatch();

  const id = props.match.params.id
  const user = useSelector(state=> state.userReducer.user);
  
  useEffect(() => {
    dispatch(getUser(id));
}, [dispatch]);

  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
      >
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
              <Grid item xs={4}>
                Zoom:
                </Grid>
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
              <Grid item xs={4}>
                Rotation:
                </Grid>
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
              <Button
                variant="outlined"
                color="primary"
              >
                Save
                </Button>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
      <Grid item container justify="left" direction="column">
        <Grid item container justify="left">
          <Grid item container justify="left" xs={7}>
            <Grid item sm={3}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Grid className={classes.info}>
                    <Typography variant="h5">Datos Personales</Typography>
                    <UpdateProfile />
                    </Grid>
                  <Typography
                    className={classes.pos}
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                  >
                    Email: {user?.email}
                          </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="h6">
                    Fecha de nacimiento: {user?.dateOfBirth}
                          </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="h6">
                    Dirección: {user?.address}
                          </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="h6">
                    Ciudad: {user?.city}
                          </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="h6">
                    Provincia: {user?.state}
                          </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="h6">
                    País: {user?.country}
                          </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="h6">
                    Nacionalidad: {user?.nationality}
                          </Typography>
                  <Typography className={classes.pos} color="textPrimary" variant="h6">
                    Teléfono/Celular: {user?.cellphone}
                  </Typography>
                </CardContent>
                <CardActions className={classes.button}>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={4} direction="column">
            <Grid item container justify="center">
              <Badge
                badgeContent={
                  <div
                    style={chipStyles}
                  >
                    <EditIcon />
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
                {`${user.firstName} ${user.lastName}`}
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
                <Link target="_blank" href={`https://github.com/${user.githubUser}`}>
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
    </>
  );
}
