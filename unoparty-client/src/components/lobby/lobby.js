import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import socket from '../../socket.io/socketConnection';
import { withRouter } from 'react-router-dom';

import { addPlayer, initGame } from '../../redux/games/games.actions';
import { updateCurrentGameCurrentCard } from '../../redux/games/games.actions';

import { selectCurrentGame } from '../../redux/games/games.selectors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import PlayerAvatar from '../playerAvatar/playerAvatar';

import './lobby.styles.css';

const startGame = roomId => {
  socket.emit('startGame', roomId);
};

const Lobby = ({
  currentGame: { maxPlayers, name, players, host, isHost, roomId, inLobby },
  addPlayer,
  initGame,
  history,
  updateCurrentGameCurrentCard
}) => {
  useEffect(() => {
    socket.on('initGame', data => {
      socket.on('currentCard', card => {
        updateCurrentGameCurrentCard(card);
      });
      initGame(data);
      history.push('/game');
    });
    socket.on('playerJoin', player => {
      addPlayer(player);
    });
  }, [addPlayer, history, initGame, updateCurrentGameCurrentCard]);
  return (
    <Row className="lobby">
      <Col xl="6" sm="12">
        <Jumbotron className="bg-dark lobby-jumbotron">
          <h1 className="lobby-name">Game: {name}</h1>
          <Row className="lobby-details">
            <Col sm="6" className="lobby-players">
              {players.map(player => (
                <PlayerAvatar key={player.name}>{player.name}</PlayerAvatar>
              ))}
            </Col>
            <Col sm="6">
              <h2>Game Info:</h2>
              <p>Host: {host}</p>
              <p>Max Players: {maxPlayers}</p>
              <p>Password Protected: false</p>
              <Badge variant="secondary">Waiting for host</Badge>
              {isHost ? (
                <Button onClick={() => startGame(roomId)} variant="success">
                  Start Game
                </Button>
              ) : null}
            </Col>
          </Row>
        </Jumbotron>
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame
});

const mapDispatchToProps = dispatch => ({
  addPlayer: player => dispatch(addPlayer(player)),
  initGame: players => dispatch(initGame(players)),
  updateCurrentGameCurrentCard: card =>
    dispatch(updateCurrentGameCurrentCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lobby));
