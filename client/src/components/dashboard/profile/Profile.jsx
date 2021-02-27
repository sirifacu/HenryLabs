import React, { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Grid, Avatar, Link, Card, CardActions,
  CardContent, Typography, Badge,
  Dialog, DialogTitle, Button, Paper, ListItemText, ListItemAvatar, ListItem,
  Divider, List } from "@material-ui/core";
import { useStyles, chipStyles} from "./styles";
import { Edit, LocalLibrary, Computer,Group, GroupWork} from '@material-ui/icons';
import AvatarEditor from 'react-avatar-editor'
import { getUsers } from "../../../redux/userReducer/userAction";
import UpdateProfile from "./UpdateProfile";
import githubIcon from "./assets/github.png"
import googleIcon from "./assets/google.png"
import profilePicture from "./assets/Lillo-R.png"






export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch()
  
  const user = useSelector(state=> state.userLoggedIn.userInfo)
  
  useEffect(() => {
    dispatch(getUsers(user));
  }, [dispatch]);
  
  
  return (
    < >
      <Dialog
        aria-labelledby="simple-dialog-title"
       open="">
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
                  <Typography
                    className={classes.pos}
                    color="textPrimary"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary">
                    Fecha de nacimiento
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary">
                    Dirección
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary">
                    Ciudad
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary">
                    Provincia
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary">
                    País
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary">
                    Nacionalidad
                  </Typography>
                  <Typography className={classes.pos} color="textPrimary">
                    Teléfono/Celular
                  </Typography>
                </CardContent>
                <CardActions className={classes.button}>
                  <UpdateProfile />
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
                  src={profilePicture}
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
                {/* {`${user.firstName} ${user.lastName}`} */}
                Nombre Apellido
              </Typography>
              <Grid item container justify="center" direction="row">
                <Link
                  target="_blank"
                  href="https://accounts.google.com/signin/v2/identifier?hl=en&passive=true&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                >
                  <Avatar className={classes.medium} src={googleIcon} />
                </Link>
                <Link target="_blank" href="https://github.com/CreativiTICs">
                  <Avatar className={classes.medium} src={githubIcon} />
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
                  color="textPrimary"
                >
                  {"numero de cohorte"}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
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
                  color="textPrimary"
                >
                  {"nombre del instructor"}
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
                  color="textPrimary"
                >
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
            primary="Pm's"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
                </Typography>
                <ListItemText>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
                </Typography>
                
                </ListItemText>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    < />
  );
}
