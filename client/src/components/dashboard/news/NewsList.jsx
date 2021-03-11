import { CardActionArea, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNews } from "../../../redux/newsReducer/newsAction";
import noImage from "../../../assets/noImage.png"

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
  texts:{
    paddingTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  column:{
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
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
         <CardActionArea key={notice._id} onClick={() => history.push(`/panel/noticia/lista/${notice._id}`)}>           
            <Grid container > 
            <Grid item container direction="row" justify="flex-start">
              <img src={noImage} />   
                  <Grid item direction="column" className={classes.column}>
                  <Typography gutterBottom variant="h5" >
                          {notice.title}
                  </Typography>   
                  <Typography variant="body2" >
                          {notice.link }
                  </Typography>
                  <Typography variant="body2" >
                          {notice.type}
                  </Typography>
                  <Typography className={classes.texts} variant='caption' color='textSecondary' >
                          {moment(notice.createdAt).subtract(0, 'days').calendar()}
                  </Typography>
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


