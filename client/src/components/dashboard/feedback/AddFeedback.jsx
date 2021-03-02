import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFeedback, getFeedbackFromUser, postFeedback, CHANGE_DONE } from '../../../redux/feedbackReducer/feedbackAction';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/';
import { Rating } from '@material-ui/lab';
import { addFeedbackStyles } from './styles';

const AddFeedback = props => {
    const dispatch = useDispatch();
    const styles = addFeedbackStyles();
    const { lectureId } = props;
    const [ rating, setRating ] = useState(0);
    const [ comment, setComment ] = useState('');
    const [open, setOpen] = React.useState(false);
    const feedback = useSelector(state => state.feedbackReducer.feedBackUser);
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
        <Button variant="outlined" disabled={done} color="primary" onClick={handleClickOpen}>
        Agregar reseña
         </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar reseña</DialogTitle>
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
      </Dialog>
    </div>
    );
};

export default AddFeedback;
