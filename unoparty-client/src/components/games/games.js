import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import socket from '../../socket.io/socketConnection';

import { selectAvailableGames } from '../../redux/games/games.selectors';

import Table from 'react-bootstrap/Table';

import Game from '../game/game';

const Games = ({ availableGames }) => {
  useEffect(() => {
    console.log(availableGames);
    socket.emit('requestAvailableGames');
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
          <Game key={roomId} roomId={roomId} {...props} />
        ))}
      </tbody>
    </Table>
  );
};

const mapStateToProps = createStructuredSelector({
  availableGames: selectAvailableGames
});

export default connect(mapStateToProps)(Games);
