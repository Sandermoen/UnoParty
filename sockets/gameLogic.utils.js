const uniqid = require('uniqid');

const colors = [
  'rgb(254, 39, 39)',
  'rgb(8, 186, 34)',
  'rgb(9, 158, 255)',
  'rgb(240, 206, 7)'
];

const generateRandomCard = key => {
  const randomType = Math.floor(Math.random() * 109) + 1;
  const randomNumber = Math.floor(Math.random() * 10);
  let randomColor = colors[Math.floor(Math.random() * 4)];
  let randomCard;

  switch (true) {
    case randomType < 3:
      randomCard = {
        type: '+4',
        color: 'rgb(42, 42, 42)',
        number: '+4'
      };
      break;
    case randomType < 5 && randomType > 2:
      randomCard = {
        type: 'wild',
        color: 'rgb(42, 42, 42)'
      };
      break;
    case randomType < 9 && randomType > 4:
      randomCard = {
        type: '+2',
        color: randomColor,
        number: '+2'
      };
      break;
    case randomType < 13 && randomType > 8:
      randomCard = {
        type: 'reverse',
        color: randomColor
      };
      break;
    case randomType < 17 && randomType > 12:
      randomCard = {
        type: 'skip',
        color: randomColor
      };
      break;
    default:
      randomCard = {
        type: 'normal',
        number: randomNumber,
        color: randomColor
      };
      break;
  }
  return { key: uniqid(), ...randomCard };
};

const sanitizePlayer = (currentGame, username) => {
  return currentGame.players.map(player => {
    if (player.name === username) {
      return player;
    }
    return {
      ...player,
      cards: player.cards.length
    };
  });
};

const isPlayerTurn = (currentGame, username) => {
  const { players } = currentGame;
  return players.find((player, idx) => {
    if (
      player.name === username &&
      idx === currentGame.currentPlayerTurnIndex
    ) {
      return player;
    }
  });
};

const canPlayCard = (cardToPlay, currentCard) => {
  switch (cardToPlay.type) {
    case '+2':
    case 'reverse':
    case 'skip':
      if (
        cardToPlay.color === currentCard.color ||
        cardToPlay.type === currentCard.type
      ) {
        return true;
      }
      return false;
    case 'wild':
    case '+4':
      if (!cardToPlay.color) {
        return false;
      }
      return true;
    case 'normal':
      if (
        cardToPlay.color === currentCard.color ||
        cardToPlay.number === currentCard.number
      ) {
        return true;
      }
      return false;
    default:
      return false;
  }
};

const updateCurrentPlayerTurnIndex = currentGame => {
  let { currentPlayerTurnIndex, players } = currentGame;
  if (currentGame.turnReverse) {
    currentPlayerTurnIndex - 1 < 0
      ? (currentPlayerTurnIndex = players.length - 1)
      : (currentPlayerTurnIndex -= 1);
  } else {
    currentPlayerTurnIndex + 1 > players.length - 1
      ? (currentPlayerTurnIndex = 0)
      : (currentPlayerTurnIndex += 1);
  }
  console.log('current turn index: ', currentGame.currentPlayerTurnIndex);
  return currentPlayerTurnIndex;
};

module.exports = {
  generateRandomCard,
  sanitizePlayer,
  isPlayerTurn,
  canPlayCard,
  updateCurrentPlayerTurnIndex,
  colors
};
