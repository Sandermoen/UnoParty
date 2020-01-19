import { createSelector } from 'reselect';

const selectGames = state => state.games;

export const selectAvailableGames = createSelector(
  [selectGames],
  games => games.availableGames
);

export const selectCurrentGame = createSelector(
  [selectGames],
  games => games.currentGame
);
