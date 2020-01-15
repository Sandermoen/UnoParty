const { io } = require('../servers');

let currentGames = [];

const sendMessage = (message, error, socket) => {
  socket.emit('message', {
    message,
    error
  });
};

const sendAvailableGames = () => {
  const availableGames = Object.values(currentGames).map(
    ({
      playerCount,
      maxPlayers,
      name,
      passwordProtected,
      host,
      roomId,
      inLobby
    }) => {
      if (inLobby) {
        return {
          roomId,
          playerCount,
          maxPlayers,
          name,
          passwordProtected,
          host,
          inLobby
        };
      }
      return;
    }
  );
  io.emit('availableGames', availableGames);
};

io.on('connect', socket => {
  console.log('a client has connected', socket.id);
  const username = socket.handshake.query.username;

  socket.on('requestAvailableGames', () => {
    sendAvailableGames();
  });

  socket.on('createGame', ({ maxPlayers, name }) => {
    if (!maxPlayers || !name)
      return sendMessage('Please provide all the info needed', true, socket);
    const roomId = `${Math.floor(Math.random() * 9999) + 1}`;
    const gameSettings = {
      passwordProtected: false,
      playerCount: 1,
      maxPlayers,
      name,
      roomId,
      inLobby: true,
      host: username,
      players: [
        {
          name: username,
          cards: [],
          score: 0
        }
      ]
    };
    currentGames.roomId = {
      ...gameSettings,
      hostSocket: socket.id
    };
    socket.join(`${roomId}`);
    socket.emit('gameCreated', {
      ...gameSettings,
      isHost: true
    });
    sendAvailableGames();
  });

  socket.on('startGame', roomId => {
    if (
      currentGames.roomId &&
      currentGames.roomId.hostSocket === String(socket.id) &&
      currentGames.roomId.playerCount > 1
    ) {
      const gameToStart = currentGames.roomId;
      gameToStart.inLobby = false;
      sendAvailableGames();

      const colors = ['red', 'green', 'blue', 'yellow'];
      gameToStart.players.forEach((player, idx) => {
        for (let i = 0; i < 7; i++) {
          const randomType = Math.floor(Math.random() * 109) + 1;
          const randomNumber = Math.floor(Math.random() * 10);
          let randomColor = colors[Math.floor(Math.random() * 4)];

          switch (true) {
            case randomType < 3:
              gameToStart.players[idx].cards.push({
                type: '+4',
                color: 'black'
              });
              break;
            case randomType < 5 && randomType > 2:
              gameToStart.players[idx].cards.push({
                type: 'wild',
                color: 'black'
              });
              break;
            case randomType < 9 && randomType > 4:
              gameToStart.players[idx].cards.push({
                type: '+2',
                color: randomColor
              });
              break;
            case randomType < 13 && randomType > 8:
              gameToStart.players[idx].cards.push({
                type: 'reverse',
                color: randomColor
              });
              break;
            case randomType < 17 && randomType > 12:
              gameToStart.players[idx].cards.push({
                type: 'skip',
                color: randomColor
              });
              break;
            case randomType > 16:
              gameToStart.players[idx].cards.push({
                type: 'normal',
                number: randomNumber,
                color: randomColor
              });
              break;
          }
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
      });
    }
    return sendMessage('Could not start game', true, socket);
  });

  socket.on('joinGame', ({ roomId }) => {
    if (currentGames.roomId) {
      const gameToJoin = currentGames.roomId;
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
});
