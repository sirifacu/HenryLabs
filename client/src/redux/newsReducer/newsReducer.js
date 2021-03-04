import {POST_NEWS, GET_NEWS, DELETE_JOBS} from './newsAction'

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
  }
}