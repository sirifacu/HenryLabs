import React from "react";
import { makeStyles, Grid, Avatar, Link, Card, CardActions, CardContent, Typography, Badge, Dialog, DialogTitle, Button, Paper, StylesProvider, } from "@material-ui/core";
import UpdateProfile from "./UpadateProfile";
import EditIcon from '@material-ui/icons/Edit';
import AvatarEditor from 'react-avatar-editor'
import imagen from "./assets/Lillo-R.png";
import google from "./assets/google.png";
import github from "./assets/github.png";

const useStyles = makeStyles((theme) => ({
  PaperModal: {
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  root: {
    border: 10,
    borderRadius: 20,
    marginTop: 18,
    minWidth: 350,
  },
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 7,
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

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

export default function Profile() {
  const classes = useStyles();

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
      <Grid item container justify="center" direction="column">
        <Grid item container justify="center">
          <Grid item container justify="center" xs={7}>
            <Grid item sm={3}>
              <Card className={classes.root} variant="outlined" Box boxShadow={3}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
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
                Nombre Apellido
                </Typography>
              <Grid item container justify="center" direction="row">
                <Link
                  target="_blank"
                  href="https://accounts.google.com/signin/v2/identifier?hl=en&passive=true&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAZAmgQ&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                >
                  <Avatar className={classes.medium} src={google} />
                </Link>
                <Link target="_blank" href="https://github.com/CreativiTICs">
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
