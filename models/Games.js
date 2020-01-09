const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  playerCount: Number,
  maxPlayers: Number,
  name: String,
  host: String,
  passwordProtected: Boolean
});

const gamesModel = mongoose.model('games', gamesSchema);

module.exports = gamesModel;
