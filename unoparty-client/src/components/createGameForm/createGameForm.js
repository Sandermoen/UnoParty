import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { updateCurrentGame } from '../../redux/games/games.actions';

import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateGameForm = ({ history, updateCurrentGame, socket }) => {
  const [gameName, setGameName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [formError, setFormError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (gameName.length > 10) {
      return setFormError('A game name must be 10 characters or less');
    } else if (maxPlayers > 5 || maxPlayers < 2) {
      return setFormError(
        'You can have max 5 players and min 2 players per game'
      );
    } else if (gameName.length === 0 || maxPlayers.length === 0) {
      return setFormError('Please complete the fields before creating a game');
    }
    socket.emit('createGame', {
      name: gameName,
      maxPlayers: Number(maxPlayers),
      passwordProtected: false
    });
    socket.on('gameCreated', data => {
      updateCurrentGame(data);
      history.push('/lobby');
    });

    return () => {
      socket.off('gameCreated');
    };
  };

  return (
    <Form onSubmit={event => handleSubmit(event)}>
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
      <Button variant="success" type="submit">
        Create Game
      </Button>
    </Form>
  );
};

const mapDispatchToProps = dispatch => ({
  updateCurrentGame: game => dispatch(updateCurrentGame(game))
});

const mapStateToProps = createStructuredSelector({
  socket: selectSocketConnection
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGameForm));
