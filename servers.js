const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const apiRouter = require('./api/api');
const enforce = require('express-sslify');
const compression = require('compression');
const path = require('path');

const PORT = process.env.PORT || 9000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'unoparty-client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'unoparty-client/build', 'index.html'));
  });
} else {
  require('dotenv').config();
}

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('Connected to database');
  }
);

mongoose.connection.dropDatabase();

const expressServer = app.listen(PORT);
const io = socketio(expressServer);

console.log(`Express and Socket.io are listening on port ${PORT}`);

module.exports = {
  app,
  io
};
