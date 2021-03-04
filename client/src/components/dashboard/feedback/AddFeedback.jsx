import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField } from '@material-ui/core/';
import { Rating } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_DONE, getFeedbackFromUser, postFeedback } from '../../../redux/feedbackReducer/feedbackAction';
import { addFeedbackStyles } from './styles';

const AddFeedback = props => {
    const dispatch = useDispatch();
    const styles = addFeedbackStyles();
    const { lectureId } = props;
    const [ rating, setRating ] = useState(0);
    const [ comment, setComment ] = useState('');
    const [open, setOpen] = useState(false);
    const done = useSelector(state => state.feedbackReducer.done);
    const userId = useSelector(state => state.userLoggedIn.userInfo.id)

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getFeedbackFromUser(lectureId, userId));
    }, [dispatch, userId, lectureId]);

    const handleChangeRating = e => setRating(parseInt(e.target.value));

    const handleChangeComment = e => setComment(e.target.value);

    const handleAddFeedback = () => {
        dispatch(postFeedback(userId, rating, comment, lectureId)); // userId left;
        dispatch({type: CHANGE_DONE});
        setComment('');
        setRating(0);
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
            <DialogContent>
              <DialogContentText className={styles.description}>
                Aprovechá la oportunidad de ayudarnos a mejorar haciendo una crítica constructiva de esta clase. Acordate que una vez que envíes tu reseña, no la vas a poder editar.
              </DialogContentText>
                    <Rating
                        name='rating'
                        value={rating}
                        onChange={handleChangeRating}
                    />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                value={comment}
                onChange={handleChangeComment}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddFeedback} color="primary">
                Agregar
              </Button>
            </DialogActions>
          </Paper>
        </Dialog>
    </div>
    );
};

export default AddFeedback;
