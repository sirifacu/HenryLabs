import { Card, CardActionArea, CardContent, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNewsAndBooms } from "../../../redux/newsReducer/newsAction";
import noImage from "../../../assets/noImage.png";
import { useStylesNewsList, useStylesBoomList } from './styles'


const NewsAndBoomsList = () => {
  const dispatch = useDispatch();
  const classesNews = useStylesNewsList();
  const classesBooms = useStylesBoomList()
  const history = useHistory();
  const newsState = useSelector((state) => state.newsReducer.news);
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  moment.locale('es')  

  useEffect(() => {
    dispatch(getNewsAndBooms());
    // eslint-disable-next-line
  }, []);

 
  return (
    <>
     <Grid container className={classesNews.intro} direction="column">
       <Grid item>
          <Typography variant='h3'>{"Hola," + " " + userLoggedIn.firstName + " " + userLoggedIn.lastName + "!"}</Typography>
       </Grid>
       <Grid item>
          <Typography variant='h4' style={{marginLeft:"0.5%"}}>Esto es lo ultimo en noticias: </Typography>
       </Grid>
     </Grid>
       {newsState && newsState.map((notice) =>{
         return (
           <React.Fragment key={notice._id} >
           {notice.type &&
           <Card variant="outlined" elevation={9} style={{marginBottom: "5%"}} component={Paper} >
           <CardActionArea 
             onClick={() => history.push(`/panel/noticia/${notice._id}`)} 
             className={classesNews.card}
           >           
             <Grid container> 
              <Grid item container justify="flex-start">
                <Grid item lg={6} sm={6} sx={12}>
                  <img src={notice.image || noImage}  className={classesNews.image}/>  
                </Grid>
                  <Grid item className={classesNews.column} lg={5} sm={5} sx={12}>
                  <Typography gutterBottom variant="h5" >
                          {notice.title}
                  </Typography>   
                  <Typography variant="body2" >
                          {notice.link }
                  </Typography>
                  <Typography variant="body2" >
                          {notice.type}
                  </Typography>
                  <Typography className={classesNews.texts} variant='caption' color='textSecondary' >
                          Publicado {moment(notice.createdAt).subtract(0, 'days').calendar()}
                  </Typography>
                  </Grid>                   
              </Grid>
            </Grid>
           </CardActionArea>
           </Card> || 
           notice.student&&
           <Card variant="outlined" elevation={9} style={{marginBottom: "5%"}} component={Paper} >
           <CardActionArea
              key={notice._id}
              className={classesBooms.card}
              onClick={() => history.push(`/panel/lista-booms/${notice._id}`)
            }
            >
              <Grid container item className={classesBooms.title}>
                <Typography gutterBottom variant="h4" align="center">
                  {`🚀💥 Boom de ${notice.student} 💥 🚀`}
                </Typography>
              </Grid>
              <Grid container item spacing={0} className={classesBooms.info}>
                <Grid item zs={12}>
                  <CardContent>
                    <Grid item container direction="row" alignItems="flex-end" spacing={1}>
                      <Grid item>
                        <Typography variant="h6" style={{fontWeight:"bold"}}>
                          Contratado como: 
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">
                        {notice.position}.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container direction="row" alignItems="flex-end" spacing={1}>
                      <Grid item>
                        <Typography variant="h6" style={{fontWeight:"bold"}}>
                          Para: 
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">
                        {notice.company}.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container direction="row" alignItems="flex-end" spacing={1}>
                      <Grid item>
                        <Typography variant="h6" style={{fontWeight:"bold"}}>
                          En: 
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">
                          {notice.country}.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container direction="row" alignItems="flex-end" spacing={1}>
                      <Grid item>
                        <Typography variant="h6" style={{fontWeight:"bold"}}>
                          Estudios previos:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6">
                          {notice.previousStudies}.
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>
                <Grid item container spacing={1} xs={12}>
                <Card variant="outlined" elevation={4} style={{width:"100%"}}component={Paper} >
                  <CardContent>
                    <Typography variant="h5">
                      Contanos un poco mas!
                    </Typography>
                    <br/>
                    <Typography variant="body2">
                      {notice.whatYouDidBefore}.
                    </Typography>
                    <br/>
                    <Typography variant="body2">
                      {notice.incomeImprovement}.
                    </Typography>
                    <br/>
                    <Typography variant="body2">
                      {notice.thanks}
                    </Typography>
                    <br/>
                    <Typography variant="body2">
                      {notice.comments}
                    </Typography>
                    <br/>
                    <Typography className={classesNews.texts} variant='caption' color='textSecondary' >
                          Publicado {moment(notice.createdAt).subtract(0, 'days').calendar()}
                    </Typography>
                  </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardActionArea>
            </Card>}
           </React.Fragment>
         )
        })}
     </>
   );

}

export default NewsAndBoomsList;
