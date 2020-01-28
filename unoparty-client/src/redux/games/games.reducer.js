import gamesTypes from './games.types';
import { deepCopyArray } from './games.utils';

const INITIAL_STATE = {
  availableGames: [],
  currentGame: []
};

const gamesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case gamesTypes.UPDATE_AVAILABLE_GAMES: {
      return {
        ...state,
        availableGames: action.payload
      };
    }
    case gamesTypes.UPDATE_CURRENT_GAME: {
      return {
        ...state,
        currentGame: action.payload
      };
    }
    case gamesTypes.SET_CURRENT_GAME_HOST: {
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          isHost: true,
          host: action.payload
        }
      };
    }
    case gamesTypes.ADD_PLAYER: {
      const addedPlayer = [...state.currentGame.players, action.payload];
      return {
        ...state,
        currentGame: { ...state.currentGame, players: addedPlayer }
      };
    }
    case gamesTypes.REMOVE_PLAYER: {
      const players = deepCopyArray(state.currentGame.players);
      players.splice(action.payload, 1);
      return {
        ...state,
        currentGame: { ...state.currentGame, players }
      };
    }
    case gamesTypes.UPDATE_CURRENT_GAME_LOBBY_STATE: {
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          inLobby: !state.currentGame.inLobby
        }
      };
    }
    case gamesTypes.UPDATE_CURRENT_GAME_PLAYERS: {
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          players: action.payload
        }
      };
    }
    case gamesTypes.UPDATE_CURRENT_GAME_CURRENT_CARD: {
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          currentCard: action.payload
        }
      };
    }
    case gamesTypes.CLEAR_CURRENT_GAME: {
      return { ...state, currentGame: [] };
    }
    case gamesTypes.REMOVE_PLAYER_CARD: {
      const { playerIdx, cardIdx } = action.payload;
      const players = deepCopyArray(state.currentGame.players);
      if (Array.isArray(state.currentGame.players[playerIdx].cards)) {
        players[playerIdx].cards.splice(cardIdx, 1);
      } else {
        players[playerIdx].cards--;
      }
      return { ...state, currentGame: { ...state.currentGame, players } };
    }
    case gamesTypes.ADD_PLAYER_CARD: {
      const { playerIdx, cards, numCards } = action.payload;
      const players = deepCopyArray(state.currentGame.players);
      if (cards) {
        const playerCards = state.currentGame.players[playerIdx].cards;
        const player = players[playerIdx];
        player.cards = [...playerCards, ...cards];
        players[playerIdx] = player;
      } else {
        players[playerIdx].cards += numCards;
      }
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          players
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default gamesReducer;
