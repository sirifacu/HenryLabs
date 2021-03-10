import { Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1)
  },
  card:{
    display: 'flex',
    flexDirection: 'row',
  },
  type:{
    display: 'flex',
    flexDirection: 'row',
    marginLeft: theme.spacing(0),
    alignItems: "center"
  },
  button:{
    width: "5%",
    marginLeft: theme.spacing(0),
  },
  right:{
    marginRight: theme.spacing(3),
  }
}));

const ApplyList = () => {
  const classes = useStyles();
  const [applies, setApplies] = useState([])
  const {id} = useParams()


  useEffect(() => {
    axios.get(`/apply/list/${id}`)
    .then((res) => {
      setApplies(res)
    })
    // eslint-disable-next-line
  }, []);

  
     return (
      <>
      {applies.data && applies.data.map((apply) =>{return (
                     
        <Grid container className={classes.root}  key={apply.id} > 
          <Grid xs={8} item container justify="flex-start">
            <Grid item container direction="column">
              <Grid item>
                <Typography gutterBottom variant="h6" >
                  {apply.user.firstName} {apply.user.lastName}
                </Typography>   
              </Grid>
              <Grid item container direction="row" justify="flex-start">
                <Grid xs={6} item container justify="flex-start">
                  <Grid item>
                    <Typography className={classes.type} variant="body2" >
                      Nivel de Ingles: {apply.english } <br></br> {apply.webProfile}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid xs={6} item container justify="flex-start">
                  <Grid item>
                  
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={4} item container justify="flex-end">
            <Grid item container direction="column" alignItems="flex-end" justify="flex-end">
              <Grid item>
                  <Typography className={classes.right}  variant= 'body2'>
                    {apply.user.email}
                  </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.right} variant='caption' color='textSecondary' >
                  {moment(apply.createdAt).subtract(0, 'days').calendar()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider variant="fullWidth"/>
        </Grid>
     
     )
    })}
       </>
     );

}

export default ApplyList;