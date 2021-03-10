import { CardActionArea, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNews } from "../../../redux/newsReducer/newsAction";

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
    marginLeft: theme.spacing(3),
    alignItems: "center"
  },
  button:{
    width: "5%",
    marginLeft: theme.spacing(2),
  },
  right:{
    marginRight: theme.spacing(3),
  }
}));


const NewsList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const newsState = useSelector((state) => state.newsReducer.news);
  moment.locale('es')  

  useEffect(() => {
    dispatch(getNews());
    // eslint-disable-next-line
  }, []);

  
 
  return (
    <>
       {newsState && newsState.map((notice) =>{return (
         
         <CardActionArea key={notice._id} onClick={() => history.push(`/panel/noticia/list/${notice._id}`)}>           
            <Grid container className={classes.root}  > 
              <Grid xs={8} item container justify="flex-start">
                <Grid item container direction="column">
                  <Grid item>
                    <Typography gutterBottom variant="h5" >
                      {notice.title}
                    </Typography>   
                  </Grid>
                  <Grid item container direction="row" justify="flex-start">
                    <Grid xs={4} item>
                      <Typography variant="body2" >
                        {notice.link }
                      </Typography>
                    </Grid>
                    <Grid xs={4} item container justify="flex-end">
                      <Grid item>
                        <Typography className={classes.type} variant= 'body2'>
                            {notice.type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={4} item container justify="flex-end">
                <Grid item container direction="column" alignItems="flex-end" justify="flex-end">
                  <Grid item>
                    <Typography className={classes.right} variant='caption' color='textSecondary' >
                      {moment(notice.createdAt).subtract(0, 'days').calendar()}
                    </Typography>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>
            <Divider variant="fullWidth"/>
         </CardActionArea>
      
            
         )
        })}
     </>
   );

}

export default NewsList;
