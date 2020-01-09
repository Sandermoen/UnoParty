const { io } = require('../servers');
const Games = require('../models/Games');

const sendMessage = (message, error, socket) => {
  socket.emit(error ? 'error' : 'message', message);
};

const sendAvailableGames = socket => {
  Games.find({}, (err, games) => {
    if (err) return err;
    if (games) {
      io.emit(
        'availableGames',
        games.map(
          ({
            playerCount,
            maxPlayers,
            name,
            passwordProtected,
            host,
            roomId
          }) => {
            return {
              roomId,
              playerCount,
              maxPlayers,
              name,
              passwordProtected,
              host: host.name
            };
          }
        )
      );
    }
  });
};

io.on('connect', socket => {
  console.log('a client has connected');
  socket.on('requestAvailableGames', () => {
    sendAvailableGames(socket);
  });

  socket.on('createGame', async ({ maxPlayers, name, host }) => {
    if (!maxPlayers || !name || !host)
      return sendMessage('Please provide all the info needed', true, socket);
    const roomId = `${Math.floor(Math.random() * 9999) + 1}`;
    const gameSettings = {
      playerCount: 1,
      maxPlayers,
      name,
      roomId,
      players: [
        {
          name: 'snader',
          cards: [],
          score: 0
        }
      ]
    };
    const newGame = new Games({
      ...gameSettings,
      host: {
        name: 'snader',
        socketId: socket.id
      }
    });
    await newGame.save();
    socket.join(`${roomId}`);
    socket.emit('gameCreated', { ...gameSettings, host: host.name });
    // sendAvailableGames(socket); unsure if this is really needed because you dont care which servers are available when youre in a lobby
  });
});
