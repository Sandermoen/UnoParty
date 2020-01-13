import { combineReducers } from 'redux';

import gamesReducer from './games/games.reducer';
import playerReducer from './player/player.reducer';

const rootReducer = combineReducers({
  games: gamesReducer,
  player: playerReducer
});

export default rootReducer;
