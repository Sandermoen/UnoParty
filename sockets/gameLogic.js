const { io } = require('../servers');
const {
  generateRandomCard,
  sanitizePlayer,
  isPlayerTurn,
  updateCurrentPlayerTurnIndex,
  canPlayCard,
  colors
} = require('./gameLogic.utils');

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
          gameToStart.players[idx].cards.push({
            ...generateRandomCard(),
            key: i
          });
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

  socket.on('playCard', ({ cardIndex, colorIndex }) => {
    const roomId = Object.keys(socket.rooms)[0];
    const currentGame = currentGames[roomId];
    let { currentCard, players } = currentGame;
    const player = isPlayerTurn(currentGame, username);
    const playerIdx = currentGame.currentPlayerTurnIndex;

    if (!player) {
      return sendMessage('Error playing card', true, socket);
    }

    const cardToPlay = player.cards[cardIndex];

    if (!cardToPlay) {
      return sendMessage('Card does not exist', true, socket);
    }

    const playCard = card => {
      currentGame.currentPlayerTurnIndex = updateCurrentPlayerTurnIndex(
        currentGame
      );

      currentGame.currentCard = card;
      console.log(`${username} played ${JSON.stringify(card)}`);
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

    if (canPlayCard(cardToPlay, currentCard)) {
      const cardType = cardToPlay.type;
      switch (cardType) {
        case 'reverse':
        case 'skip': {
          if (cardType === 'reverse' && currentGame.players.length > 2) {
            currentGame.turnReverse = !currentGame.turnReverse;
          } else {
            currentGame.currentPlayerTurnIndex = updateCurrentPlayerTurnIndex(
              currentGame
            );
          }
          break;
        }
        case '+4':
        case '+2': {
          const playerToDrawIndex = updateCurrentPlayerTurnIndex(currentGame);
          const playerToDrawUsername = players[playerToDrawIndex].name;
          const randomCards = [];
          currentGame.currentPlayerTurnIndex = updateCurrentPlayerTurnIndex(
            currentGame
          );
          let cardsToGenerate = 2;

          if (cardType === '+4') {
            cardToPlay.color = colors[colorIndex];
            cardsToGenerate = 4;
          }

          for (let i = 0; i < cardsToGenerate; i++) {
            randomCards.push(generateRandomCard());
          }
          players[playerToDrawIndex].cards = [
            ...players[playerToDrawIndex].cards,
            ...randomCards
          ];
          io.to(roomId).clients((err, clients) => {
            clients.forEach(client => {
              const clientSocket = io.sockets.sockets[client];
              if (
                clientSocket.handshake.query.username === playerToDrawUsername
              ) {
                return clientSocket.emit('drawnCard', {
                  playerIdx: playerToDrawIndex,
                  randomCards
                });
              }
              return clientSocket.emit('drawnCard', {
                playerIdx: playerToDrawIndex,
                numCards: randomCards.length
              });
            });
          });
          break;
        }
        case 'wild': {
          cardToPlay.color = colors[colorIndex];
        }
      }
      playCard(cardToPlay);
    }
  });

  socket.on('requestCard', () => {
    const roomId = Object.keys(socket.rooms)[0];
    const currentGame = currentGames[roomId];
    const { currentCard } = currentGame;
    const player = isPlayerTurn(currentGame, username);
    const playerIdx = currentGame.currentPlayerTurnIndex;

    if (!player) {
      return sendMessage('Error drawing card', true, socket);
    }

    const randomCard = generateRandomCard();
    if (!canPlayCard(randomCard, currentCard)) {
      currentGame.currentPlayerTurnIndex = updateCurrentPlayerTurnIndex(
        currentGame
      );
    }

    currentGame.players[playerIdx].cards.push(randomCard);
    socket.emit('drawnCard', {
      playerIdx,
      randomCards: [randomCard]
    });
    socket.to(String(roomId)).emit('drawnCard', { playerIdx, numCards: 1 });
  });
}

module.exports = gameLogic;
