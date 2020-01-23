import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import Button from 'react-bootstrap/Button';

const Game = ({ name, playerCount, host, maxPlayers, roomId, socket }) => {
  const handleClick = roomId => {
    socket.emit('joinGame', { roomId });
  };
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

const mapStateToProps = createStructuredSelector({
  socket: selectSocketConnection
});

export default connect(mapStateToProps)(Game);
