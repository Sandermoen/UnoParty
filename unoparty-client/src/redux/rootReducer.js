import { combineReducers } from 'redux';

import gamesReducer from './games/games.reducer';

const rootReducer = combineReducers({
  games: gamesReducer
});

export default rootReducer;
