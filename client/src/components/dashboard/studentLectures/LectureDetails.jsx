import React, {useEffect} from 'react';
import AddFeedback from '../feedback/AddFeedback';
import { Grid, Paper, Typography, Link, List, Divider, ListItem, ListItemAvatar, Avatar,ListItemText } from '@material-ui/core';
import useStyles from './styles';
import {useSelector, useDispatch} from 'react-redux'
import ReactPlayer from 'react-player'
import DividerWithText from '../../../assets/DividerWithText'
import {AiOutlineFileJpg, AiOutlineFilePdf, AiOutlineFileZip, AiOutlineFile} from 'react-icons/ai'
import {getFilesByLectures} from '../../../redux/lectureReducer/lectureAction'

const LectureDetails = ({lecture}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { id, title, videoURL, githubURL } = lecture
    const lectureFiles = useSelector(state => state.lectureReducer.lectureFiles)

    useEffect(() => {
        dispatch(getFilesByLectures(id))
    },[dispatch, id])

    const getIcon = (extension) =>{
        switch (extension){
            case "jpg":{
                return (<AiOutlineFileJpg/>)
            }
            case "png":{
                return (<AiOutlineFileJpg/>)
            }
            case "rar":{
                return (<AiOutlineFileZip/>)
            }
            case "zip":{
              return (<AiOutlineFileZip/>)
          }
            case "pdf":{
                return (<AiOutlineFilePdf/>)
            }
            default: return <AiOutlineFile/>
        }
    }

    return (
        <Paper elevation={9} className={classes.marginT}>
            <Paper elevation={9} className={classes.paperT} >
                <Grid container direction="column" spacing={3}>
                    <Grid item container direction="column" spacing={3}>
                        {/* Feedback button row */}
                        <Grid item container alignItems="center" justify="flex-end"  >
                            <Grid item style={{marginRight: "3%"}}>
                                <AddFeedback lectureId={id} />
                            </Grid>
                        </Grid>
                        {/* Title row */}
                        <Grid item container direction="row" alignItems="center" justify="center"  >
                            <Grid item container justify="center" xs={12}>
                                <Grid item>
                                    <Typography variant="h2"> {title} </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <DividerWithText>Video</DividerWithText>
                    </Grid>
                    {/* Description row */}
                    {
                        videoURL && videoURL.includes('http') ? 
                        <Grid item container direction="row" justify="center" xs={12}>
                            <Grid item >
                                <ReactPlayer url={videoURL} controls={true} height={"450px"} />
                            </Grid>
                        </Grid>
                        : 
                        <Grid item container direction="row" justify="center">
                            <Grid item xs={12}>
                                <Typography variant="h5"> Esta clase no tiene un video asociado. </Typography>
                            </Grid>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <DividerWithText>Repositorio</DividerWithText>
                    </Grid>
                        {/* Github link row */}
                    <Grid item container direction="row" alignItems="center" justify="center" spacing={2}>
                        {githubURL && 
                        <Grid item container xs={12} direction="column" justify="center" alignItems="center">
                            <Grid item>
                                <Typography variant="h5"> 
                                    <Link href={githubURL}
                                        rel="noreferrer" 
                                        target="_blank" 
                                        color="secondary" 
                                        //onClick={(e) => e.preventDefault}
                                        component="a"
                                    >
                                    <Typography variant="h6"> Repositorio Github</Typography>
                                    </Link> 
                                </Typography>
                            </Grid>
                        </Grid>}
                    </Grid>
                    <Grid item xs={12}>
                        <DividerWithText>Archivos</DividerWithText>
                    </Grid>
                    <Paper elevation={4} style={{margin:"5%"}} >
                        <Grid container justify="center" spacing={2}>
                            <Grid item container xs={10} direction={"column"}>
                                <div style={{display:"flex", justifyContent:"center"}}>
                                    <Typography variant="h6" className={classes.title}>
                                        Archivos de la clase
                                    </Typography>
                                </div>
                                <div className={classes.demo}>
                                    <List>
                                    <Divider></Divider>
                                    {lectureFiles.map((item) =>{
                                        return(
                                            <div key={item.id}>
                                                <ListItem >
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            {getIcon(item.extension)}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`${item.name}`}
                                                        secondary={
                                                        <Link href={`${item.url}`}
                                                            download
                                                            rel="noreferrer"
                                                            target="_blank"
                                                            color="inherit"
                                                            onClick={(e) => e.preventDefault}
                                                            component="a"
                                                        >
                                                            Descargar
                                                        </Link> }
                                                    />
                                                </ListItem>
                                                <Divider></Divider>
                                            </div>
                                        )
                                        })}
                                    </List>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Paper>
        </Paper>
    )
};

export default LectureDetails;
