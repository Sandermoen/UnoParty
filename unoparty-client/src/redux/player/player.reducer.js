import playerTypes from './player.types';

const INITIAL_STATE = {
  name: ''
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playerTypes.SET_PLAYER_NAME:
      return {
        ...state,
        name: action.payload
      };
    default:
      return { ...state };
  }
};

export default playerReducer;
