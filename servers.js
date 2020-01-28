const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const socketio = require('socket.io');
const apiRouter = require('./api/api');

const PORT = process.env.PORT || 9000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/', apiRouter);

const expressServer = app.listen(PORT);
const io = socketio(expressServer);

console.log(`Express and Socket.io are listening on port ${PORT}`);

module.exports = {
  app,
  io
};
