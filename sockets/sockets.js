const { io } = require('../servers');
const gameLogic = require('./gameLogic');
const { sendAvailableGames } = require('./gameLogic.utils');

let currentGames = {};

const sendMessage = (message, error, socket) => {
  socket.emit('message', {
    message,
    error
  });
};

io.on('connect', socket => {
  console.log('a client has connected', socket.id);
  const username = socket.handshake.query.username;

  socket.on('requestAvailableGames', () => {
    sendAvailableGames(currentGames);
  });

  gameLogic(currentGames, socket, username, sendMessage);
});
