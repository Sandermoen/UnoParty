const { io } = require('../servers');

let currentGames = [];

const sendMessage = (message, error, socket) => {
  socket.emit(error ? 'errorMessage' : 'message', message);
};

const sendAvailableGames = () => {
  const availableGames = currentGames.map(
    ({ playerCount, maxPlayers, name, passwordProtected, host, roomId }) => ({
      roomId,
      playerCount,
      maxPlayers,
      name,
      passwordProtected,
      host
    })
  );
  io.emit('availableGames', availableGames);
};

io.on('connect', socket => {
  console.log('a client has connected', socket.id);
  socket.on('requestAvailableGames', () => {
    sendAvailableGames();
  });

  socket.on('createGame', ({ maxPlayers, name, host }) => {
    if (!maxPlayers || !name || !host)
      return sendMessage('Please provide all the info needed', true, socket);
    const roomId = `${Math.floor(Math.random() * 9999) + 1}`;
    const gameSettings = {
      passwordProtected: false,
      playerCount: 1,
      maxPlayers,
      name,
      roomId,
      inLobby: true,
      host,
      players: [
        {
          name: host,
          cards: 0,
          score: 0
        }
      ]
    };
    currentGames.push({ ...gameSettings, hostSocket: socket.id });
    socket.join(`${roomId}`);
    socket.emit('gameCreated', {
      ...gameSettings,
      isHost: true
    });
    sendAvailableGames();
  });

  socket.on('startGame', roomId => {
    const isHost = currentGames.find(game => {
      if (game.roomId === roomId && game.hostSocket === String(socket.id)) {
        return true;
      }
      return false;
    });

    if (isHost) {
      return socket.emit('initGame', 'game started');
    }
    return sendMessage('You are not the host of this game', true, socket);
  });

  socket.on('joinGame', ({ roomId, name }) => {
    return currentGames.find((game, idx) => {
      if (game.roomId) {
        if (game.playerCount === game.maxPlayers) {
          return sendMessage('The game is full', true, socket);
        } else if (game.passwordProtected) {
          return sendMessage('Please provide a password', true, socket);
        }
        socket.join(String(roomId));
        io.to(String(roomId)).emit('playerJoin', {
          name: 'Rob',
          cards: 0,
          score: 0
        });

        currentGames[idx].playerCount += 1;

        socket.emit('joinedGame', {
          playerCount: game.playerCount,
          maxPlayers: game.maxPlayers,
          name: game.name,
          roomId: game.roomId,
          inLobby: game.inLobby,
          host: game.host,
          players: [...game.players, { name, cards: 0, score: 0 }],
          isHost: false
        });

        return sendAvailableGames();
      }
      return sendMessage('This game does not exist', true, socket);
    });
  });
});
