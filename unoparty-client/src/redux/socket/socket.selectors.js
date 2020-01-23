import { createSelector } from 'reselect';

const selectSocket = state => state.socket;

export const selectSocketConnection = createSelector(
  [selectSocket],
  socket => socket.connection
);
