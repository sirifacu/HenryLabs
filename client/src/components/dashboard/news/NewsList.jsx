import { CardActionArea, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNews } from "../../../redux/newsReducer/newsAction";
import noImage from "../../../assets/noImage.png";
import { useStylesNewsList } from './styles'


const NewsList = () => {
  const dispatch = useDispatch();
  const classes = useStylesNewsList();
  const history = useHistory();
  const newsState = useSelector((state) => state.newsReducer.news);
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  moment.locale('es')  

  useEffect(() => {
    dispatch(getNews());
    // eslint-disable-next-line
  }, []);

 
  return (
    <>
     <Grid className={classes.intro}>
       <Typography variant='h3'>{"Bienvenido" + " " + userLoggedIn.firstName + " " + userLoggedIn.lastName}</Typography>
       <Typography variant='h4' style={{marginLeft:"5%"}}>Esto es lo ultimo en noticias: </Typography>
     </Grid>
       {newsState && newsState.map((notice) =>{
         return (
           <CardActionArea key={notice._id} onClick={() => history.push(`/panel/noticia/${notice._id}`)} className={classes.card}>           
             <Grid container> 
              <Grid item container justify="flex-start">
                <Grid item lg={5} sm={5} sx={12}>
                  <img src={notice.image || noImage}  className={classes.image}/>  
                </Grid>
                  <Grid item direction="column" className={classes.column} lg={5} sm={5} sx={12}>
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
                          Publicado {moment(notice.createdAt).subtract(0, 'days').calendar()}
                  </Typography>
                  </Grid>                   
              </Grid>
            </Grid>
           </CardActionArea>
         )
        })}
     </>
   );

}

export default NewsList;
