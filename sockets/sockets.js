const { io } = require('../servers');

let currentGames = [];

const sendMessage = (message, error, socket) => {
  socket.emit(error ? 'errorMessage' : 'message', message);
};

const sendAvailableGames = () => {
  const availableGames = currentGames.map(
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
    const validGame = currentGames.find((game, idx) => {
      if (
        game.roomId === roomId &&
        game.hostSocket === String(socket.id) &&
        game.playerCount > 1
      ) {
        currentGames[idx].inLobby = false;
        return true;
      }
      return false;
    });

    if (validGame) {
      return io.to(String(roomId)).emit('initGame', 'game started');
    }
    return sendMessage('Could not start the game', true, socket);
  });

  socket.on('joinGame', ({ roomId }) => {
    return currentGames.find((game, idx) => {
      if (game.roomId) {
        if (game.playerCount === game.maxPlayers) {
          return sendMessage('The game is full', true, socket);
        } else if (game.passwordProtected) {
          return sendMessage('Please provide a password', true, socket);
        }
        socket.join(String(roomId));
        io.to(String(roomId)).emit('playerJoin', {
          name: username,
          cards: 0,
          score: 0
        });

        const updatedGame = (currentGames[idx] = {
          ...currentGames[idx],
          playerCount: currentGames[idx].playerCount + 1,
          players: [
            ...currentGames[idx].players,
            {
              name: username,
              cards: 0,
              score: 0
            }
          ]
        });

        const { hostSocket, ...gameInfo } = updatedGame;

        socket.emit('joinedGame', {
          ...gameInfo,
          isHost: false
        });

        return sendAvailableGames();
      }
      return sendMessage('This game does not exist', true, socket);
    });
  });
});
