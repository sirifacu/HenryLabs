import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
	Grid, 
         Paper, TextField, Typography } from '@material-ui/core/';
import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { IoRocketSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_DONE, getFeedbackFromUser, postFeedback } from '../../../redux/feedbackReducer/feedbackAction';
import { addFeedbackStyles } from './styles';

const AddFeedback = props => {
    const dispatch = useDispatch();
    const styles = addFeedbackStyles();
    const { lectureId } = props;
    const [ lectureRating, setLectureRating ] = useState(0);
	const [ instructorRating, setInstructorRating ] = useState(0);
    const [ lectureComment, setLectureComment ] = useState('');
	const [ instructorComment, setInstructorComment ] = useState('');
    const [open, setOpen] = useState(false);
    const done = useSelector(state => state.feedbackReducer.done);
    const userId = useSelector(state => state.userLoggedIn.userInfo.id)

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getFeedbackFromUser(lectureId, userId));
    }, [dispatch, userId, lectureId]);

    const handleChangeLectureRating = e => setLectureRating(parseInt(e.target.value));

	const handleChangeInstructorRating = e => setInstructorRating(parseInt(e.target.value))

    const handleChangeLectureComment = e => setLectureComment(e.target.value);

	const handleChangeInstructorComment = e => setInstructorComment(e.target.value);

    const handleAddFeedback = () => {
        dispatch(postFeedback(userId, lectureRating, lectureComment, instructorRating, instructorComment, lectureId)); // userId left;
        dispatch({type: CHANGE_DONE});
		setLectureComment('');
        setInstructorComment('');
        setLectureRating(0);
		setInstructorRating(0);
        setOpen(false)
    };

    return (
        <div>
            <Button variant="contained" disabled={done} color="primary" onClick={handleClickOpen}>
                Agregar reseña
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Paper elevation={3} className={styles.paper}>
					<DialogTitle className={styles.title} id="form-dialog-title">Agregar reseña</DialogTitle>
					<DialogContent className={styles.description} >
						<DialogContentText >
							Aprovechá la oportunidad de ayudarnos a mejorar haciendo una crítica constructiva de esta clase. Acordate que una vez que envíes tu reseña, no la vas a poder editar.
						</DialogContentText>
					</DialogContent>
					<Grid container direction="row" className={styles.feedbacks} >
						<Grid item>
							<DialogContent>
								<Typography>Reseña de la lecture</Typography>
								<Rating
									name='lectureRating'
									value={lectureRating}
									onChange={handleChangeLectureRating}
									icon={<IoRocketSharp />}
								/>
								<TextField
									autoFocus
									margin="dense"
									id="class comment"
									label="Agrega un comentario"
									type="text"
									variant="outlined"
									fullWidth
									value={lectureComment}
									onChange={handleChangeLectureComment}
								/>
							</DialogContent>
						</Grid>
						<Grid item >
							<DialogContent>
								<Typography>Reseña del instructor</Typography>
								<Rating
									name='instructorRating'
									value={instructorRating}
									onChange={handleChangeInstructorRating}
									icon={<IoRocketSharp />}
								/>
								<TextField
									autoFocus
									margin="dense"
									id="instructor comment"
									label="Agrega un comentario"
									type="text"
									variant="outlined"
									fullWidth
									value={instructorComment}
									onChange={handleChangeInstructorComment}
								/>
							</DialogContent>
						</Grid>
					</Grid>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" className={styles.button} >
                            Cancelar
                        </Button>
                        <Button onClick={handleAddFeedback} color="primary" className={styles.button} >
                            Agregar
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        </div>
    );
};

export default AddFeedback;
