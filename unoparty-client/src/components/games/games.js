import React from 'react';

import Table from 'react-bootstrap/Table';

import Game from '../game/game';

const Games = () => {
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
        <Game gameName="Test Game" players={2} host="snader" />
        <Game gameName="Juden" players={3} host="snosk" />
      </tbody>
    </Table>
  );
};

export default Games;
