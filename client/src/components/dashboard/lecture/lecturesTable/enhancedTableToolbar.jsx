import { fade, lighten, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {InputBase, Toolbar, Typography, Grid, InputLabel, Select, FormControl} from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCohorts} from '../../../../redux/cohortReducer/cohortAction'
import {getLectures, filterLectures} from '../../../../redux/lectureReducer/lectureAction'


const styles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      marginTop: theme.spacing(2),
      flex: '1 1 100%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    search: {
      marginTop: theme.spacing(2),
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.grey[700], 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.grey[700], 0.45),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


const EnhancedTableToolbar = (props) => {
    const allCohorts = useSelector(state => state.cohortReducer.cohorts)
    const modulesFromCohort = useSelector(state => state.lectureReducer.modulesFromCohort)
    const dispatch = useDispatch()
    const classes = styles();
    const [ cohort, setCohort] = useState("")
    const [ module, setModule] = useState("")
    const [ search, setSearch] = useState("")

    useEffect(()=> {
      dispatch(getCohorts())
    },[])

    const handleChangeCohort = (cohortId) => {
      setCohort(cohortId)
      dispatch(getLectures(cohortId))
      setModule("")
      setSearch("")
    }

    const handleChangeModule = (moduleNumber) => {
      setModule(moduleNumber)
      if(!moduleNumber.length){
        dispatch(getLectures(cohort))
      }
      else{
        dispatch(getLectures(cohort, true, moduleNumber))
      }
      setSearch("")
    }

    const searchFunction = (value) => {
      setSearch(value)
      dispatch(filterLectures(search))
    }

    return (
      <Toolbar>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={2}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Clases
            </Typography> 
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel color="secondary" htmlFor="cohort-native-simple">Cohorte</InputLabel>
              <Select
                native
                color="secondary"
                value={cohort}
                onChange={(e) => handleChangeCohort(e.target.value)}
                inputProps={{
                  name: 'cohort',
                  id: 'cohort-native-simple',
                }}
              >
              <option aria-label="None" value="" />
              {allCohorts.map((item) => (<option value={item.id} key={item.id}>{`Cohorte ${item.number}`}</option>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl} disabled={!cohort.length ? true : false}>
              <InputLabel color="secondary" htmlFor="module-native-simple">Modulo</InputLabel >
              <Select
                color="secondary"
                native
                value={module}
                onChange={(e) => handleChangeModule(e.target.value)}
                inputProps={{
                  name: 'module',
                  id: 'module-native-simple',
                }}
              >
              <option aria-label="None" value="" />
              {modulesFromCohort.map((item, i) => (<option value={item} key={i}>{`Modulo ${item}`}</option>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search name..."
                value={search}
                onChange={(e) => searchFunction(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> 
          </Grid>
        </Grid>
    </Toolbar>
    );
  };

export default EnhancedTableToolbar