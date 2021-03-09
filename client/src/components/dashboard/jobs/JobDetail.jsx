import { Box, Divider, Grid, Modal } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userLogin } from '../../../redux/loginReducer/loginAction';
import Apply from './Apply';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CancelIcon from '@material-ui/icons/Cancel';
import { deleteJobs } from '../../../redux/jobsReducer/actionsJobs';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
    marginTop: 10,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const JobDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [job, setJob] = useState([]);
  const { id } = useParams();
  
  const userId = useSelector(state => state.userLoggedIn.userInfo.id)
 

  useEffect(() => {
    axios.get(`jobs/list/${id}`)
    .then((res) => {
      setJob(res.data);
    })
    dispatch(userLogin())
    // eslint-disable-next-line
  }, []);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(job)

  const deleteJob = () => {
    dispatch(deleteJobs(job.id))
    history.push('/dashboard/joblist')
  }


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Apply id={id} userId={userId}/>
      <Box className={classes.root}>
      <Button onClick={handleClose} type="button" color="secondary">
        Cancelar
      </Button>
      </Box>
    </div>
  );

     return (
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {job.title}
          </Typography>
          <Typography variant='h5' color="textPrimary">
            {job.type} | {job.contract} | {job.seniority}
          </Typography>
          <br></br>
              {/* RENDERIZAR SOLO SI ES ADMIN/STAFF */}
              <Grid>
                  <Button size="small" startIcon={<VisibilityIcon />}>Postulantes</Button>
                  <Button size="small" onClick={()=> deleteJob()}startIcon={<CancelIcon />}>Eliminar busqueda</Button>
              </Grid>

          {job.applyType == "apply" && (
            <div>
            <Button variant='outlined' href={`${job.webProfile}`} target="_blank" >
            Aplica en: <br></br> {job.webProfile} </Button>
            </div>
          ) }
          {job.applyType == "easyApply" && (
            <div>
            <Box className={classes.root}>
                    <Button
                      type="button"
                      color="secondary"
                      variant="outlined"
                      onClick={handleOpen}
                    >
                      Postularse
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                      {body}
                    </Modal>
            </Box>
            </div>
          ) }      
          <br></br>
          <Divider></Divider>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Descripción del cargo:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.description}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Beneficios:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.benefits}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Requisitos Tecnicos:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.requirements}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Idiomas:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.language}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Otros:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.others}
          </Typography>
          <br></br>
          <Divider></Divider>
          <br></br>
          <Typography variant="h5" color="textSecondary" component="p">
            Salario: ${job.salary}
          </Typography>
        </CardContent>
      <CardActions>
          
      </CardActions>
    </Card>
       );
       
      }
      
export default JobDetail;
