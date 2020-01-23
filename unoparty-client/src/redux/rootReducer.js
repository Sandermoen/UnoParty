import { combineReducers } from 'redux';

import gamesReducer from './games/games.reducer';
import playerReducer from './player/player.reducer';
import socketReducer from './socket/socket.reducer';

const rootReducer = combineReducers({
  games: gamesReducer,
  player: playerReducer,
  socket: socketReducer
});

export default rootReducer;
