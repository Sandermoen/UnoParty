const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  playerCount: Number,
  maxPlayers: Number,
  name: String,
  host: Object,
  passwordProtected: {
    type: Boolean,
    default: false
  },
  roomId: Number,
  players: {
    type: Array,
    default: []
  }
});

const gamesModel = mongoose.model('games', gamesSchema);

module.exports = gamesModel;
