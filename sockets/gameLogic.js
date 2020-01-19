const { io } = require('../servers');

const colors = [
  'rgb(254, 39, 39)',
  'rgb(8, 186, 34)',
  'rgb(9, 158, 255)',
  'rgb(240, 206, 7)'
];

const generateRandomCard = () => {
  const randomType = Math.floor(Math.random() * 109) + 1;
  const randomNumber = Math.floor(Math.random() * 10);
  let randomColor = colors[Math.floor(Math.random() * 4)];
  let randomCard;

  switch (true) {
    case randomType < 3:
      return (randomCard = {
        type: '+4',
        color: 'rgb(42, 42, 42)',
        number: '+4'
      });
    case randomType < 5 && randomType > 2:
      return (randomCard = {
        type: 'wild',
        color: 'rgb(42, 42, 42)'
      });
    case randomType < 9 && randomType > 4:
      return (randomCard = {
        type: '+2',
        color: randomColor,
        number: '+2'
      });
    case randomType < 13 && randomType > 8:
      return (randomCard = {
        type: 'reverse',
        color: randomColor
      });
    case randomType < 17 && randomType > 12:
      return (randomCard = {
        type: 'skip',
        color: randomColor
      });
    case randomType > 16:
      return (randomCard = {
        type: 'normal',
        number: randomNumber,
        color: randomColor
      });
  }
  return randomCard;
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

function gameLogic(
  currentGames,
  socket,
  sendAvailableGames,
  username,
  sendMessage
) {
  socket.on('startGame', roomId => {
    if (
      currentGames[roomId] &&
      currentGames[roomId].hostSocket === String(socket.id) &&
      currentGames[roomId].playerCount > 1
    ) {
      const gameToStart = currentGames[roomId];
      gameToStart.inLobby = false;
      sendAvailableGames();

      gameToStart.players.forEach((player, idx) => {
        for (let i = 0; i < 7; i++) {
          gameToStart.players[idx].cards.push(generateRandomCard());
        }
      });

      return io.to(roomId).clients((err, clients) => {
        clients.forEach(client => {
          const clientSocket = io.sockets.sockets[client];
          const players = sanitizePlayer(
            gameToStart,
            clientSocket.handshake.query.username
          );
          clientSocket.emit('initGame', players);
        });

        const currentCard = generateRandomCard();
        gameToStart.currentCard = currentCard;
        io.to(roomId).emit('currentCard', currentCard);
      });
    }
    return sendMessage('Could not start game', true, socket);
  });

  socket.on('joinGame', ({ roomId }) => {
    if (currentGames[roomId]) {
      const gameToJoin = currentGames[roomId];
      if (gameToJoin.playerCount === gameToJoin.maxPlayers) {
        return sendMessage(
          'The game you are trying to join is full',
          true,
          socket
        );
      } else if (gameToJoin.passwordProtected) {
        return sendMessage('Please provide a password', true, socket);
      }
      socket.join(String(roomId));
      const player = {
        name: username,
        cards: 0,
        score: 0
      };

      io.to(String(roomId)).emit('playerJoin', player);
      gameToJoin.playerCount += 1;
      gameToJoin.players.push({ ...player, cards: [] });
      const { hostSocket, ...gameInfo } = gameToJoin;
      socket.emit('joinedGame', {
        ...gameInfo,
        isHost: false
      });

      return sendAvailableGames();
    }
    return sendMessage('This game does not exist', true, socket);
  });

  socket.on('playCard', cardIndex => {
    const roomId = Object.keys(socket.rooms)[0];
    const currentGame = currentGames[roomId];
    let { currentCard, currentPlayerTurnIndex, players } = currentGame;
    let playerIdx;
    const player = players.find((player, idx) => {
      if (player.name === username && idx === currentPlayerTurnIndex) {
        playerIdx = idx;
        return player;
      }
    });

    if (!player) {
      return sendMessage('Error playing card', true, socket);
    }

    const cardToPlay = player.cards[cardIndex];

    if (!cardToPlay) {
      return sendMessage('Card does not exist', true, socket);
    }

    const playCard = card => {
      currentPlayerTurnIndex + 1 > players.length - 1
        ? (currentGame.currentPlayerTurnIndex = 0)
        : (currentGame.currentPlayerTurnIndex += 1);
      currentGame.currentCard = card;
      console.log(`${username} played ${JSON.stringify(card)}`);
      console.log('current turn index: ', currentGame.currentPlayerTurnIndex);
      players.find(player => {
        player.name === username && player.cards.splice(cardIndex, 1);
      });

      io.in(roomId).emit('cardPlayed', {
        cardPlayerIndex: playerIdx,
        cardIndex,
        currentPlayerTurnIndex: currentGame.currentPlayerTurnIndex,
        currentCard: card
      });
    };

    switch (cardToPlay.type) {
      case '+2':
      case 'reverse':
      case 'skip':
        if (
          cardToPlay.color === currentCard.color ||
          cardToPlay.type === currentCard.type
        ) {
          playCard(cardToPlay);
        }
        break;
      case 'wild':
      case '+4':
        playCard(cardToPlay);
      default:
        if (
          cardToPlay.color === currentCard.color ||
          cardToPlay.number === currentCard.number
        ) {
          playCard(cardToPlay);
        }
        break;
    }
  });
}

module.exports = gameLogic;
