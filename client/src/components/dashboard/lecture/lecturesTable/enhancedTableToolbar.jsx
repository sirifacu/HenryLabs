import { enhancedTableToolbarStyles } from './../styles'
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, Toolbar, Typography, Grid, InputLabel, Select, FormControl } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCohorts} from '../../../../redux/cohortReducer/cohortAction'
import {getLectures, filterLectures} from '../../../../redux/lectureReducer/lectureAction'

const EnhancedTableToolbar = () => {
    const allCohorts = useSelector(state => state.cohortReducer.cohorts)
    const modulesFromCohort = useSelector(state => state.lectureReducer.modulesFromCohort)
    const dispatch = useDispatch()
    const classes = enhancedTableToolbarStyles();
    const [ cohort, setCohort] = useState("")
    const [ module, setModule] = useState("")
    const [ search, setSearch] = useState("")

    useEffect(()=> {
      dispatch(getCohorts())
    },[dispatch]);

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
      dispatch(filterLectures(value))
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
              {modulesFromCohort.sort((a, b) => (a - b)).map((item, i) => (<option value={item} key={i}>{`Modulo ${item}`}</option>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                disabled={cohort ? false :  true}
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

export default EnhancedTableToolbar;
