import {CHANGE_THEME} from "./actionsDarkMode"

const initialState = {
    palette: {
      status: 'active',
      name: "default",
      type: 'light',
      primaryLight: '#ffef62',
      primaryMain: '#ffeb3b',
      primaryDarker: '#b2a429',
      secondaryLight: '#616161',
      secondaryMain: '#424242',
      secondaryDarker: '#212121',
      background: '',
  }
}

const darkModeReducer = (state = initialState, action) => {
  switch(action.type){
    case CHANGE_THEME: {
      if(action.payload){ // true o false
        return {
          ...state,
          palette:{
            status: 'active',
            name: "default",
            type: 'dark',
            primaryLight: '#f6ebe8',
            primaryMain: '#212121',
            primaryDarker: '#aaa19e',
            secondaryLight: '#ffff00',
            secondaryMain: '#ffea00',
            secondaryDarker: '#ffd600',
            background: '#303030',
          }
        }
      } else {
        return {...state, palette: {
          status: 'active',
          name: "default",
          type: 'light',
          primaryLight: '#ffef62',
          primaryMain: '#ffeb3b',
          primaryDarker: '#b2a429',
          secondaryLight: '#616161',
          secondaryMain: '#424242',
          secondaryDarker: '#212121',
          background: '',
      }}
      }
    }
    default: return state
  }
};

export default darkModeReducer;
