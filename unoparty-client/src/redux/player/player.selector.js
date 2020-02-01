import { createSelector } from 'reselect';

const selectPlayer = state => state.player;

export const selectPlayerName = createSelector(
  [selectPlayer],
  player => player.name
);

export const selectPlayerStatus = createSelector(
  [selectPlayer],
  player => player.status
);
