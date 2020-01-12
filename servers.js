const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const socketio = require('socket.io');
const apiRouter = require('./api/api');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 9000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/', apiRouter);

const expressServer = app.listen(PORT);
const io = socketio(expressServer);

mongoose.connect(
  'mongodb://localhost/unoparty',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('Connected to database');
  }
);

console.log(`Express and Socket.io are listening on port ${PORT}`);

module.exports = {
  app,
  io
};