import {CHANGE_THEME} from "./actionsDarkMode"

const initialState = {
    palette: {
      status: 'active',
      name: "default",
      type: 'light',
      primaryMain: '#FFFF01',
      primaryDarker: '#303f9f',
      secondaryMain: '#273746',
      secondaryDarker: '#17202A',
      background: '',
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case CHANGE_THEME: {
      if(action.payload){ // true o false
        return {
          ...state,
          palette:{
            status: 'active',
            name: "default",
            type: 'dark',
            primaryMain: '#F4E6E3',
            primaryDarker: '#303f9f',
            secondaryMain: '#C9002D',
            secondaryDarker: '#932020',
            background: '#303030',
          }
        }
      } else {
        return {...state, palette: {
          status: 'active',
          name: "default",
          type: 'light',
          primaryMain: '#FFFF01',
          primaryDarker: '#303f9f',
          secondaryMain: '#f50057',
          secondaryDarker: '#c51162',
          background: '',
      }}
      }
    }
    default: return state
  }
}