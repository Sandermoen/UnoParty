import socketTypes from './socket.types';

const INITIAL_STATE = {
  connection: null
};

const socketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case socketTypes.SET_SOCKET:
      return {
        ...state,
        connection: action.payload
      };
    default:
      return state;
  }
};

export default socketReducer;
