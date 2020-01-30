const { io } = require('../servers');
const gameLogic = require('./gameLogic');
const { sendAvailableGames } = require('./gameLogic.utils');
const User = require('../models/User');

let currentGames = {};

const sendMessage = (message, error, socket) => {
  socket.emit('message', {
    message,
    error
  });
};

io.on('connect', async socket => {
  console.log('a client has connected', socket.id);
  const username = socket.handshake.query.username;
  await User.findOne({ username: username }, async (err, user) => {
    if (err) throw new Error(err);
    if (user) return socket.disconnect(true);

    const userModel = new User({
      username
    });
    await userModel.save((err, username) => {
      if (err) return socket.disconnect(true);
    });
  });
  socket.emit('connected');

  socket.on('requestAvailableGames', () => {
    sendAvailableGames(currentGames);
  });

  gameLogic(currentGames, socket, username, sendMessage);
});
