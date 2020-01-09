import React, { useEffect, useState } from 'react';
import socket from '../../socket.io/socketConnection';

import Table from 'react-bootstrap/Table';

import Game from '../game/game';

const Games = () => {
  const [availableGames, setAvailableGames] = useState([]);
  useEffect(() => {
    socket.emit('requestAvailableGames');
    socket.on('availableGames', data => {
      console.log(data);
      setAvailableGames(data);
    });
  }, []);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Game Name</th>
          <th>Players</th>
          <th>Host</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {availableGames.map(({ roomId, ...props }) => (
          <Game key={roomId} {...props} />
        ))}
      </tbody>
    </Table>
  );
};

export default Games;
