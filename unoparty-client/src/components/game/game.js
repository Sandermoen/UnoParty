import React from 'react';
import socket from '../../socket.io/socketConnection';

import Button from 'react-bootstrap/Button';

const handleClick = roomId => {
  socket.emit('joinGame', { roomId, name: 'Rob' });
};

const Game = ({ name, playerCount, host, maxPlayers, roomId }) => {
  console.log(roomId);
  return (
    <tr>
      <td>{name}</td>
      <td>
        {playerCount}/{maxPlayers}
      </td>
      <td>{host}</td>
      <td>
        <Button
          onClick={() => handleClick(roomId)}
          style={{ width: '100%' }}
          variant="success"
        >
          Join Game
        </Button>
      </td>
    </tr>
  );
};

export default Game;
