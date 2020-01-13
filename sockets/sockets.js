const { io } = require('../servers');

let currentGames = [];

const sendMessage = (message, error, socket) => {
  socket.emit(error ? 'errorMessage' : 'message', message);
};

const sendAvailableGames = () => {
  const availableGames = currentGames.map(
    ({
      playerCount,
      maxPlayers,
      name,
      passwordProtected,
      host,
      roomId,
      inLobby
    }) => {
      if (inLobby) {
        return {
          roomId,
          playerCount,
          maxPlayers,
          name,
          passwordProtected,
          host,
          inLobby
        };
      }
      return;
    }
  );
  io.emit('availableGames', availableGames);
};

io.on('connect', socket => {
  console.log('a client has connected', socket.id);
  const username = socket.handshake.query.username;

  socket.on('requestAvailableGames', () => {
    sendAvailableGames();
  });

  socket.on('createGame', ({ maxPlayers, name }) => {
    if (!maxPlayers || !name)
      return sendMessage('Please provide all the info needed', true, socket);
    const roomId = `${Math.floor(Math.random() * 9999) + 1}`;
    const gameSettings = {
      passwordProtected: false,
      playerCount: 1,
      maxPlayers,
      name,
      roomId,
      inLobby: true,
      host: username,
      players: [
        {
          name: username,
          cards: [],
          score: 0
        }
      ]
    };
    currentGames.push({ ...gameSettings, hostSocket: socket.id });
    socket.join(`${roomId}`);
    socket.emit('gameCreated', {
      ...gameSettings,
      isHost: true
    });
    sendAvailableGames();
  });

  socket.on('startGame', roomId => {
    const colors = ['red', 'green', 'blue', 'yellow'];
    currentGames.find((game, idx) => {
      if (
        game.roomId === roomId &&
        game.hostSocket === String(socket.id) &&
        game.playerCount > 1
      ) {
        currentGames[idx].inLobby = false;
        currentGames[idx].players.forEach((player, playerIdx) => {
          for (let i = 0; i < 7; i++) {
            const randomType = Math.floor(Math.random() * 109) + 1;
            const randomNumber = Math.floor(Math.random() * 10);
            let randomColor = colors[Math.floor(Math.random() * 4)];

            switch (true) {
              case randomType < 3:
                currentGames[idx].players[playerIdx].cards.push('+4');
                break;
              case randomType < 5 && randomType > 2:
                currentGames[idx].players[playerIdx].cards.push('wild');
                break;
              case randomType < 9 && randomType > 4:
                currentGames[idx].players[playerIdx].cards.push('+2');
                break;
              case randomType < 13 && randomType > 8:
                currentGames[idx].players[playerIdx].cards.push('reverse');
                break;
              case randomType < 17 && randomType > 12:
                currentGames[idx].players[playerIdx].cards.push('skip');
                break;
              case randomType > 16:
                currentGames[idx].players[playerIdx].cards.push(
                  `normal color ${randomColor} number: ${randomNumber}`
                );
                break;
            }
          }
        });
        return io.to(String(roomId)).emit(
          'initGame',
          currentGames[idx].players.map(player => {
            if (player.name !== socket.handshake.query.username) {
              return {
                ...player,
                cards: player.cards.length
              };
            }
            return player;
          })
        );
      }
      return sendMessage('Could not start the game', true, socket);
    });
  });

  socket.on('joinGame', ({ roomId }) => {
    return currentGames.find((game, idx) => {
      if (game.roomId) {
        if (game.playerCount === game.maxPlayers) {
          return sendMessage('The game is full', true, socket);
        } else if (game.passwordProtected) {
          return sendMessage('Please provide a password', true, socket);
        }
        socket.join(String(roomId));
        const player = {
          name: username,
          cards: [],
          score: 0
        };

        io.to(String(roomId)).emit('playerJoin', player);

        const updatedGame = (currentGames[idx] = {
          ...currentGames[idx],
          playerCount: currentGames[idx].playerCount + 1,
          players: [
            ...currentGames[idx].players,
            {
              ...player
            }
          ]
        });

        const { hostSocket, ...gameInfo } = updatedGame;

        socket.emit('joinedGame', {
          ...gameInfo,
          isHost: false
        });

        return sendAvailableGames();
      }
      return sendMessage('This game does not exist', true, socket);
    });
  });
});
