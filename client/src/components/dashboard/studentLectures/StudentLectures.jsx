import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { getStudentCohort, getLectures, getLectureDetail, cleanLectures } from '../../../redux/studentLecturesReducer/studentLecturesAction'
import { Grid, Typography } from '@material-ui/core';
import ModuleCard from './ModuleCard';
import LectureFolders from './LectureFolders';
import LectureDetails from './LectureDetails';
import { modulesData } from './styles';

const StudentLectures = () => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userLoggedIn.userInfo.id)
    const modules = useSelector(state => state.studentLecturesReducer.modules)
    const lectures = useSelector(state => state.studentLecturesReducer.lectures)
    const lectureDetail = useSelector(state => state.studentLecturesReducer.lectureDetail)
    const message = useSelector(state => state.studentLecturesReducer.message)

    useEffect(() => {
        dispatch(getStudentCohort(userId));
        dispatch(cleanLectures())
    }, [])

    return (
        /* 3 Columns - Cards / Folders / Details */
        !message.length ?
        <Grid container direction="column" justify="center" alignItems="center" spacing={2} >
            {/* Module cards */}
            <Grid item container direction="row" justify="flex-start" alignItems="stretch" spacing={2} >
                {modules.map((item, i) => (
                        <Grid item xs={3} key={i} onClick={() => dispatch(getLectures(item))}>
                            <ModuleCard data={modulesData[item[0].module - 1]} lectures={item[item[0].module - 1]}  />
                        </Grid>
                    )
                )}
            </Grid>
            {/* Lecture folders */}
            <Grid item container direction="row" justify="flex-start" alignItems="center" >
                { lectures && lectures.map(item => (
                    <Grid item key={item.id} onClick={() => dispatch(getLectureDetail(item))}>
                        <LectureFolders lecture={item} />
                    </Grid>
                ))}
            </Grid>
            {/* Lecture Detail */}
            <Grid item container direction="row" justify="center">
                {lectureDetail.id ? 
                <Grid item xs={12}>
                    <LectureDetails lecture={lectureDetail} />
                </Grid>
                : null}
            </Grid>
        </Grid>
        :
        <Grid container justify="center">
            <Grid item>
                <Typography variant="h3">{message}</Typography>
            </Grid>
        </Grid>
    )
}

export default StudentLectures