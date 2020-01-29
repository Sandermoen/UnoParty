class Game {
  constructor(maxPlayers, name, roomId, host, players) {
    this.passwordProtected = false;
    this.playerCount = players ? players.length : 1;
    this.maxPlayers = maxPlayers;
    this.name = name;
    this.roomId = roomId;
    this.inLobby = true;
    this.host = host;
    this.players = players
      ? players
      : [
          {
            name: host,
            cards: [],
            score: 0,
            uno: false
          }
        ];
    this.currentPlayerTurnIndex = 0;
    this.turnReverse = false;
    this.restrictDraw = false;
  }
}

module.exports = Game;
