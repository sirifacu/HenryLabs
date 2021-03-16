import React from 'react';
import CreateCohortForm from './CreateCohortForm';
import SeeAllFeedbacksCohort from '../feedback/generalFeedbacks/SeeAllFeedbacksCohort';
import ListCohort from './cohortTable/ListCohort'
import { Grid } from '@material-ui/core';

const Cohort = () => {

  return (
    <>
      <Grid container direction='row' spacing={5} justify='center'>
        <Grid container item xs={6} justify='center'>
          <CreateCohortForm />
          <SeeAllFeedbacksCohort />
        </Grid>
        <Grid container item xs={12}>
          <ListCohort/>
        </Grid>
      </Grid>
      
      
    </>
  );
};

export default Cohort;