import playerTypes from './player.types';
import axios from 'axios';

const setPlayerNamePending = () => ({
  type: playerTypes.SET_PLAYER_NAME_PENDING
});

const setPlayerNameError = err => ({
  type: playerTypes.SET_PLAYER_NAME_ERROR,
  payload: err
});

const setPlayerNameSuccess = username => ({
  type: playerTypes.SET_PLAYER_NAME_SUCCESS,
  payload: username
});

export const setPlayerName = username => dispatch => {
  dispatch(setPlayerNamePending());
  axios
    .post('/api/auth', {
      username
    })
    .then(() => {
      dispatch(setPlayerNameSuccess(username));
    })
    .catch(err =>
      dispatch(
        setPlayerNameError(err.response.data ? err.response.data : err.message)
      )
    );
};
