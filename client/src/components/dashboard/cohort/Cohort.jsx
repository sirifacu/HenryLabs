import CreateCohortForm from './CreateCohortForm'
import  ShowCohorts  from './ShowCohorts';
import CohortDetail from './CohortDetail';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Cohort = () => {
  const cohorts = useSelector(state => state.cohortReducer.cohorts)

  useEffect(()=> {
  },[cohorts])

  return (
    <>
      <CreateCohortForm />
      <ShowCohorts />
      <CohortDetail />
    </>
  );
};

export default Cohort;