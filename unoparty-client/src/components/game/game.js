import React from 'react';

import Button from 'react-bootstrap/Button';

const Game = ({ gameName, players, host }) => {
  return (
    <tr>
      <td>{gameName}</td>
      <td>{players}/4</td>
      <td>{host}</td>
      <td>
        <Button variant="success">Join Game</Button>
      </td>
    </tr>
  );
};

export default Game;
