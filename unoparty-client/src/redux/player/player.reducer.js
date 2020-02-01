import playerTypes from './player.types';

const INITIAL_STATE = {
  name: '',
  status: {
    state: '',
    error: false
  }
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playerTypes.SET_PLAYER_NAME_PENDING:
      return {
        ...state,
        status: {
          state: 'pending',
          error: false
        }
      };
    case playerTypes.SET_PLAYER_NAME_ERROR:
      console.log(action.payload);
      return {
        ...state,
        status: {
          state: action.payload,
          error: true
        }
      };
    case playerTypes.SET_PLAYER_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload,
        status: {
          state: 'success',
          error: false
        }
      };
    default:
      return { ...state };
  }
};

export default playerReducer;
