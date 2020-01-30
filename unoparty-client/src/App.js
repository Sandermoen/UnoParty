import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useTransition } from 'react-spring';

import { selectCurrentGame } from './redux/games/games.selectors';
import { selectSocketConnection } from './redux/socket/socket.selectors';
import { selectPlayerName } from './redux/player/player.selector';

import {
  updateAvailableGames,
  updateCurrentGame
} from './redux/games/games.actions';
import { setPlayerName } from './redux/player/player.actions';

import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.styles.css';

import Logo from './components/logo/logo';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import GameBrowserPage from './pages/gameBrowserPage/gameBrowserPage';
import GameLobbyPage from './pages/gameLobbyPage/gameLobbyPage';
import GamePage from './pages/gamePage/gamePage';
import LoginForm from './components/loginForm/loginForm';
import Alert from './components/alert/alert';

const App = ({
  updateAvailableGames,
  updateCurrentGame,
  history,
  currentGame: { inLobby },
  socket,
  playerName
}) => {
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.on('connected', () => {
        socket.emit('requestAvailableGames');
        socket.on('availableGames', data => {
          updateAvailableGames(data);
        });
        socket.on('joinedGame', game => {
          updateCurrentGame(game);
          history.push('/lobby');
        });
        socket.on('message', message => {
          setAlert(message);
        });
      });
    }
  }, [updateAvailableGames, updateCurrentGame, history, socket]);
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert]);

  const transitions = useTransition(alert, alert.key, {
    config: { mass: 1, tension: 500, friction: 26 },
    from: { bottom: '-200px', opacity: 0 },
    enter: { bottom: '15px', opacity: 1 },
    leave: { bottom: '-200px', opacity: 0 }
  });

  return (
    <Container fluid className="app">
      {transitions.map(({ item, key, props }) => {
        return (
          item.message && (
            <Alert key={key} error additionalStyles={props}>
              {item.message}
            </Alert>
          )
        );
      })}
      <Logo
        watermark={history.location.pathname === '/' || inLobby ? false : true}
      />
      {socket && playerName ? (
        <Switch>
          <Route exact path="/">
            <GameBrowserPage />
          </Route>
          <ProtectedRoute path="/lobby">
            <GameLobbyPage />
          </ProtectedRoute>
          <ProtectedRoute condition={inLobby} redirect="/lobby" path="/game">
            <GamePage />
          </ProtectedRoute>
        </Switch>
      ) : (
        <LoginForm setAlert={setAlert} />
      )}
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  updateAvailableGames: games => dispatch(updateAvailableGames(games)),
  updateCurrentGame: game => dispatch(updateCurrentGame(game)),
  setPlayerName: name => dispatch(setPlayerName(name))
});

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame,
  socket: selectSocketConnection,
  playerName: selectPlayerName
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
