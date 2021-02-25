export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (data) => (dispatch) => {
  dispatch({
    type: CHANGE_THEME,
    payload: data
  })
} 
