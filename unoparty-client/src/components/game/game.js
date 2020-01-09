import React from 'react';

import Button from 'react-bootstrap/Button';

const Game = ({ name, playerCount, host, maxPlayers }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {playerCount}/{maxPlayers}
      </td>
      <td>{host}</td>
      <td>
        <Button style={{ width: '100%' }} variant="success">
          Join Game
        </Button>
      </td>
    </tr>
  );
};

export default Game;
