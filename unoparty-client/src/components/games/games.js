import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import socket from '../../socket.io/socketConnection';

import { selectAvailableGames } from '../../redux/games/games.selectors';

import Table from 'react-bootstrap/Table';

import Game from '../game/game';

const Games = ({ availableGames }) => {
  useEffect(() => {
    socket.emit('requestAvailableGames');
  }, []);
  return (
    <Fragment>
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
      {!availableGames.length > 0 && (
        <div style={{ color: 'white', textAlign: 'center' }}>
          <h3>
            Seems like there are no available games{' '}
            <span role="img" aria-label="sadFace">
              😕
            </span>
          </h3>
          <h4>
            Why not create one yourself?{' '}
            <span role="img" aria-label="happyFace">
              😀
            </span>
          </h4>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  availableGames: selectAvailableGames
});

export default connect(mapStateToProps)(Games);
