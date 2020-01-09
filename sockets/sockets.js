const { io } = require('../servers');
const Games = require('../models/Games');

io.on('connect', socket => {
  console.log('a client has connected');
  Games.find({}, (err, games) => {
    if (err) return err;
    if (games) {
      socket.emit('availableGames', [
        {
          id: 994328,
          name: 'Test Game',
          playerCount: 2,
          maxPlayers: 4,
          host: 'snader',
          passwordProtected: false
        }
      ]);
    }
  });
});
