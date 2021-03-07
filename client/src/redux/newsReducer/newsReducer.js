import {POST_NEWS, GET_NEWS, DELETE_NOTICE} from './newsAction'

const initialState = {
  news:[]
}

export default (state = initialState, action) => {
  switch(action.type){
    case POST_NEWS:{
      return{
        ...state,
        news: state.news.concat(action.payload.data)
      }
    }
    case GET_NEWS:{
      return{
        ...state,
        news: action.payload.data
      }
    }
    case DELETE_NOTICE:{
      return {
        ...state,
        news: state.news
      }
    }
    default: return state
  }
}