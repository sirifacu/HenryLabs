import { Grid, Paper, Divider, InputBase, IconButton, ListItem, ListItemText, List } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCohorts} from '../../../redux/cohortReducer/cohortAction'
import { fade, makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import ListLectures from './lecturesTable/listLectures';

const useStyles = makeStyles((theme) => ({
    card: {
     minWidth: "50%",
     maxWidth: "90%",
     margin: "auto",
     marginTop: "1rem",
     padding: "1%"
    },
    margin: {
     margin: theme.spacing(1),
    },
    title: {
    flex: '1 1 100%',
    },
    colorNames: {
    flex: '1 1 100%',
    fontWeight: "bolder"
    },
    inputs: {
        height: "50",
    },
    doneButton:{
        backgroundColor: theme.palette.success.main
    },
    cancelButton:{
        backgroundColor: theme.palette.error.main
    },
    button:{
        borderColor: theme.palette.primary.darker
    },
    list: {
        width: '100%',
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        backgroundColor: theme.palette.background.paper,
      },
    itemList:{
        '&:Focus': {
            backgroundColor: fade(theme.palette.grey[700], 0.45), 
        },
    },
    searchbar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
      },
      textInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        color: theme.palette.warning.main,
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      colorBox:{
            borderRadius: "30%",
            height:"25px",
            width:"25px",
      },
      bgGrey: {
          color: "red",         
        }
 }));

const ListAllLecures = () => {
    const classes = useStyles();
    const AllCohorts = useSelector(state => state.cohortReducer.cohorts)
    const [cohortName, setCohortName] = useState("")
    const [ cohort, setCohort] = useState({})

    const dispatch =  useDispatch()

    useEffect(() => {
        dispatch(getCohorts())
    },[])

    const handlePickCohort = (cohort) => {
        setCohort(cohort)
    }   


    return (
        <>
        <Grid container direction="column" justify="center" alignItems="center">

            <Grid item xs={12} container direction="row">
                <Grid item container xs={12} justify="center">
                    <Paper>
                        <div className={classes.searchbar}>
                            <InputBase
                                className={classes.input}
                                value={cohortName}
                                onChange={(e) => setCohortName(e.target.value)}
                                /* onChange={(e) => {dispatch(filterPalette(e.target.value)); setPaletteName(e.target.value)}} */
                                placeholder="Busca el Cohorte"
                            />
                        </div>
                        <List className={classes.list}>
                            {AllCohorts.map((item) => (
                                <ListItem button key={item.id} >
                                    <ListItemText 
                                        primary={item.title} 
                                        /* className={clsx(editor && item.name === palette.name && classes.bgGrey)}  */
                                        onClick={() => handlePickCohort(item)}
                                    />
                                </ListItem>))}
                        </List>
                    </Paper>
                </Grid>
                {/* <Grid item container xs={6}>

                </Grid> */}
            </Grid>
            <Grid item container xs={12} direction="row">
                <Grid item container>
                    <ListLectures/>
                </Grid>
            </Grid>
            

        </Grid>
            
        </>
    )
}

export default ListAllLecures
