import { POST_BOOM, GET_BOOMS } from "./actionsBooms";

const initialState = {
  booms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_BOOM: {
      return {
        ...state,
        booms: state.booms.concat(action.payload.data),
      };
    }
    case GET_BOOMS: {
      return {
        ...state,
        booms: action.payload.data,
      };
    }
    default:
      return state;
  }
};
