import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { addPlayer, initGame } from '../../redux/games/games.actions';
import { updateCurrentGameCurrentCard } from '../../redux/games/games.actions';

import { selectCurrentGame } from '../../redux/games/games.selectors';
import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import PlayerAvatar from '../playerAvatar/playerAvatar';
import CustomJumbotron from '../customJumbotron/customJumbotron';

import './lobby.styles.css';

const Lobby = ({
  currentGame: { maxPlayers, name, players, host, isHost, roomId, inLobby },
  addPlayer,
  initGame,
  history,
  updateCurrentGameCurrentCard,
  socket
}) => {
  const startGame = roomId => {
    socket.emit('startGame', roomId);
  };

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

    return () => {
      socket.off('initGame');
      socket.off('playerJoin');
    };
  }, [addPlayer, history, initGame, updateCurrentGameCurrentCard, socket]);
  return (
    <Row className="lobby">
      <Col xl="6" sm="12">
        <CustomJumbotron className="bg-dark lobby-jumbotron">
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
        </CustomJumbotron>
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame,
  socket: selectSocketConnection
});

const mapDispatchToProps = dispatch => ({
  addPlayer: player => dispatch(addPlayer(player)),
  initGame: players => dispatch(initGame(players)),
  updateCurrentGameCurrentCard: card =>
    dispatch(updateCurrentGameCurrentCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lobby));
