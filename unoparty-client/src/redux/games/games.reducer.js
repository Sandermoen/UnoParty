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
    case gamesTypes.UPDATE_CURRENT_GAME_PLAYERS:
      return {
        ...state,
        currentGame: {
          players: action.payload
        }
      };
    case gamesTypes.UPDATE_CURRENT_GAME_CURRENT_CARD:
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentCard: action.payload
        }
      };
    case gamesTypes.REMOVE_PLAYER_CARD:
      const { playerIdx, cardIdx } = action.payload;
      if (Array.isArray(state.currentGame.players[playerIdx].cards)) {
        state.currentGame.players[playerIdx].cards.splice(cardIdx, 1);
        return { ...state };
      }
      state.currentGame.players[playerIdx].cards--;
      return { ...state };
    default:
      return { ...state };
  }
};

export default gamesReducer;
