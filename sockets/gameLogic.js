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
          const players = gameToStart.players.map(player => {
            if (player.name === clientSocket.handshake.query.username) {
              return player;
            }
            return {
              ...player,
              cards: player.cards.length
            };
          });
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
    const currentRoom = currentGames[roomId];
    let { currentCard, currentPlayerTurnIndex, players } = currentRoom;
    const player = players.find(
      (player, idx) =>
        player.name === username && idx === currentPlayerTurnIndex
    );
    const cardToPlay = player.cards[cardIndex];

    if (!player) {
      return sendMessage('Error playing card', true, socket);
    }

    if (!cardToPlay) {
      return sendMessage('Card does not exist', true, socket);
    }

    switch (cardToPlay.type) {
      case 'normal':
        if (
          cardToPlay.number === currentCard.number ||
          cardToPlay.color === currentCard.color
        ) {
          currentPlayerTurnIndex + 1 > players.length
            ? (currentRoom.currentPlayerTurnIndex = 0)
            : (currentRoom.currentPlayerTurnIndex += 1);
          currentRoom.currentCard = cardToPlay;
          return players.find(player => {
            player.name === username && player.cards.splice(cardIndex, 1);
            console.log(JSON.stringify(player.cards));
          });
        }
    }
  });
}

module.exports = gameLogic;
