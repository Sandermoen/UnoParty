import gamesTypes from './games.types';

const INITIAL_STATE = {
  availableGames: [],
  currentGame: []
};

const gamesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case gamesTypes.UPDATE_AVAILABLE_GAMES:
      return {
        ...state,
        availableGames: action.payload
      };
    case gamesTypes.UPDATE_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.payload
      };
    case gamesTypes.ADD_PLAYER:
      const addedPlayer = [...state.currentGame.players, action.payload];
      return {
        ...state,
        currentGame: { ...state.currentGame, players: addedPlayer }
      };
    case gamesTypes.UPDATE_CURRENT_GAME_LOBBY_STATE:
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          inLobby: !state.currentGame.inLobby
        }
      };
    default:
      return { ...state };
  }
};

export default gamesReducer;
