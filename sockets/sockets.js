const { io } = require('../servers');
const Game = require('../classes/Game');
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
    const game = new Game(maxPlayers, name, roomId, username);
    currentGames[roomId] = {
      ...game,
      hostSocket: socket.id
    };
    socket.join(`${roomId}`);
    socket.emit('gameCreated', {
      ...game,
      isHost: true
    });
    sendAvailableGames();
  });

  socket.on('disconnect', reason => {
    console.log(`Socket disconnected: ${reason}`);
  });

  gameLogic(currentGames, socket, sendAvailableGames, username, sendMessage);
});
