import { makeStyles, Divider, Toolbar, IconButton,Paper, Button, InputBase, Tooltip, Typography, lighten, Grid, Select, FormControl, InputLabel } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import React, {useState} from 'react';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
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
      flex: '1 1 100%',
    },
    paperSearch: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    highlight: 
      theme.palette.type === 'light'
        ?{
          backgroundColor: theme.palette.grey[300]
        }
        : {},
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    chips:{
      margin: "1%"
    }
  }));

const filters = [
  {name: "Nombre", value: "name"},
  {name: "Email", value: "email"},
  {name: "Cohorte", value: "cohort"},
  {name: "Migraciones", value: "migrationsQuantity"}
]



const EnhancedTableFilter = () => {
    const classes = useToolbarStyles();
    const [actualFilter, setActualFilter] = useState("")
    const [dataSearch, setDataSearch] = useState("")
    const [querySearch, setQuerySearch] = useState({
      name: "",
      email: "",
      cohort: "",
      migrationsQuantity: "",
    })

    const handleSelectFilter = (value) => {
      setDataSearch("")
      setActualFilter(value)
    }

    const handleAddFilter = () => {
      setDataSearch("")
      setQuerySearch({...querySearch, [actualFilter]: dataSearch})
    }

    const handleDelete = (nameValue) => {
      setQuerySearch({...querySearch, [nameValue]: ""})
    }

    const handleSearch = () => {
      console.log("buscar")
    }

    const getSearchName = (value) => {
      switch(value){
        case "name": return "nombre"
        case "email": return "email"
        case "cohort": return "cohorte"
        case "migrationsQuantity": return "migraciones"
        default: return ""
      }
    }

    return (
      <Toolbar
        className={classes.root}
      >
        <Grid container direction="column" alignItems="center">
          <Grid item container xs={12} direction="row" alignItems="center" style={{marginTop: "1%", marginBottom: "1%"}}>
            <Grid item xs={2}>
              <Typography className={classes.title} color="primary" variant="h6" id="tableTitle" component="div">
                  Filtro
              </Typography>
            </Grid>
            <Grid item container xs={8} justify="center">
              <Paper className={clsx(classes.paperSearch, classes.highlight)}>
                <FormControl color="secondary" className={classes.formControl}>
                  <Select
                    color="secondary"
                    native
                    value={actualFilter}
                    onChange={(e) => handleSelectFilter(e.target.value)}
                    inputProps={{
                      id: 'select-multiple-native',
                    }}
                  > 
                    <option aria-label="None" value="" />
                    {filters.map(({value, name},i) => (
                      <option key={i} value={value} label={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <InputBase        
                  className={classes.input}
                  color="secondary"
                  value={dataSearch}
                  placeholder={actualFilter ? `Buscar por ${getSearchName(actualFilter)}` : "Seleccione un filtro"}
                  onChange={(e) => setDataSearch(e.target.value)}
                  inputProps={{ 'aria-label': 'search' }}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="search" onClick={handleAddFilter}>
                  <AddCircleIcon color="secondary" />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                onClick={handleSearch}
                endIcon={<SearchIcon/>}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
          <Grid item container style={{marginBottom:"1%"}} alignItems="center" justify="space-evenly">
            {querySearch.name 
              ? (<Chip
                color="primary"
                className={classes.chips}
                label={`Nombre: ${querySearch.name}`}
                onDelete={() => handleDelete('name')}
                deleteIcon={<DeleteIcon color="secondary" />}
              />)
              : null}
            {querySearch.email 
              ? (<Chip
                color="primary"
                label={`Email: ${querySearch.email}`}
                onDelete={() => handleDelete('email')}
                deleteIcon={<DeleteIcon color="secondary" />}
              />)
              : null}
            {querySearch.cohort 
              ? (<Chip
                color="primary"
                label={`Cohorte: ${querySearch.cohort}`}
                onDelete={() => handleDelete('cohort')}
                deleteIcon={<DeleteIcon color="secondary" />}
              />)
              : null}
            {querySearch.migrationsQuantity 
              ? (<Chip
                color="primary"
                label={`Migraciones: ${querySearch.migrationsQuantity}`}
                onDelete={() => handleDelete('migrationsQuantity')}
                deleteIcon={<DeleteIcon color="secondary" />}
              />)
              : null}
          </Grid>
        </Grid>
  
      </Toolbar>
    );
  };
  

  export default EnhancedTableFilter;