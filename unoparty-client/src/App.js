import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { updateAvailableGames } from './redux/games/games.actions';
import { updateCurrentGame } from './redux/games/games.actions';
import { selectCurrentGame } from './redux/games/games.selectors';
import { selectSocketConnection } from './redux/socket/socket.selectors';
import { setPlayerName } from './redux/player/player.actions';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.styles.css';

import Logo from './components/logo/logo';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import GameBrowserPage from './pages/gameBrowserPage/gameBrowserPage';
import GameLobbyPage from './pages/gameLobbyPage/gameLobbyPage';
import GamePage from './pages/gamePage/gamePage';
import LoginForm from './components/loginForm/loginForm';

const App = ({
  updateAvailableGames,
  updateCurrentGame,
  history,
  currentGame: { inLobby },
  socket
}) => {
  const [alert, setAlert] = useState({});
  useEffect(() => {
    if (socket) {
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
    }
  }, [updateAvailableGames, updateCurrentGame, history, socket]);

  return (
    <Container fluid className="app">
      {alert.message && (
        <Alert variant={alert.error ? 'danger' : 'dark'}>{alert.message}</Alert>
      )}
      <Logo
        watermark={history.location.pathname === '/' || inLobby ? false : true}
      />
      {socket ? (
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
        <LoginForm />
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
  socket: selectSocketConnection
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
