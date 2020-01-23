import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAvailableGames } from '../../redux/games/games.selectors';
import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import Table from 'react-bootstrap/Table';

import Game from '../game/game';

const Games = ({ availableGames, socket }) => {
  useEffect(() => {
    socket.emit('requestAvailableGames');
  }, [socket]);
  return (
    <Fragment>
      <Table striped bordered hover borderless variant="dark">
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
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  availableGames: selectAvailableGames,
  socket: selectSocketConnection
});

export default connect(mapStateToProps)(Games);
