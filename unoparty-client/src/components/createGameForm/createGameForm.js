import React, { useState } from 'react';
import socket from '../../socket.io/socketConnection';
import { withRouter } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateGameForm = ({ history }) => {
  const [gameName, setGameName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(1);
  const [formError, setFormError] = useState('');

  const handleSubmit = () => {
    if (gameName.length > 15 || gameName.includes(' ')) {
      return setFormError(
        'A displayname can be max 15 characters long and cant include a space'
      );
    } else if (maxPlayers > 5) {
      return setFormError('The max amount of players allowed in one game is 5');
    } else if (gameName.length === 0 || maxPlayers.length === 0) {
      return setFormError('Please complete the fields before creating a game');
    }
    socket.emit('createGame', {
      name: gameName,
      maxPlayers,
      host: 'snader',
      passwordProtected: false
    });
    socket.on('gameCreated', data => {
      // game has been created set current game in redux store to data in callback and redirect to lobby
      history.push('/lobby');
    });
  };

  return (
    <Form>
      {formError ? <p style={{ color: 'red' }}>{formError}</p> : null}
      <Row style={{ padding: '10px 0' }}>
        <Col>
          <Form.Control
            onChange={event => setGameName(event.target.value)}
            placeholder="Game Name"
          />
        </Col>
        <Col>
          <Form.Control
            onChange={event => setMaxPlayers(event.target.value)}
            placeholder="Max Players"
            type="number"
            max="5"
          />
        </Col>
      </Row>
      <Button onClick={() => handleSubmit()} variant="success">
        Create Game
      </Button>
    </Form>
  );
};

export default withRouter(CreateGameForm);
