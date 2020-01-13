import playerTypes from './player.types';

export const setPlayerName = name => ({
  type: playerTypes.SET_PLAYER_NAME,
  payload: name
});
