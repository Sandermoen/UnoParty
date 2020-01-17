import gamesTypes from './games.types';

export const updateAvailableGames = games => ({
  type: gamesTypes.UPDATE_AVAILABLE_GAMES,
  payload: games
});

export const updateCurrentGame = currentGame => ({
  type: gamesTypes.UPDATE_CURRENT_GAME,
  payload: currentGame
});

export const addPlayer = player => ({
  type: gamesTypes.ADD_PLAYER,
  payload: player
});

export const updateCurrentGameLobbyState = () => ({
  type: gamesTypes.UPDATE_CURRENT_GAME_LOBBY_STATE
});

export const updateCurrentGamePlayers = players => ({
  type: gamesTypes.UPDATE_CURRENT_GAME_PLAYERS,
  payload: players
});

export const updateCurrentGameCurrentCard = card => ({
  type: gamesTypes.UPDATE_CURRENT_GAME_CURRENT_CARD,
  payload: card
});

export const initGame = players => {
  return dispatch => {
    dispatch(updateCurrentGameLobbyState());
    dispatch(updateCurrentGamePlayers(players));
  };
};
