const { io } = require('../servers');
const gameLogic = require('./gameLogic');

let currentGames = {};

const sendMessage = (message, error, socket) => {
  socket.emit('message', {
    message,
    error
  });
};

const sendAvailableGames = () => {
  const availableGames = Object.values(currentGames).filter(
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
    }
  );
  io.emit('availableGames', availableGames ? availableGames : []);
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
      ],
      currentPlayerTurnIndex: 0,
      turnReverse: false,
      restrictDraw: false
    };
    currentGames[roomId] = {
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

  socket.on('leaveGame', () => {
    const roomId = Object.keys(socket.rooms)[0];
    if (!currentGames[roomId]) {
      return console.log('could not find the room');
    }
    console.log(
      currentGames[roomId].players.filter(player => player.name === username)
    );
    const players = currentGames[roomId].players;
    let playerIdx = players.findIndex(player => player.name === username);

    if (!playerIdx) {
      return console.log('couldnt find player');
    }
    currentGames[roomId].players.splice(playerIdx, 1);

    socket.leave(roomId, err => {
      if (err) {
        throw new Error(err);
      }
      console.log('player left room ', roomId);
    });

    io.to(roomId).emit('playerLeave', playerIdx);
  });

  socket.on('disconnect', reason => {
    console.log(`Socket disconnected: ${reason}`);
  });

  gameLogic(currentGames, socket, sendAvailableGames, username, sendMessage);
});
