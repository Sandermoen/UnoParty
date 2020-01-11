import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import socket from './socket.io/socketConnection';
import { withRouter } from 'react-router-dom';

import { updateAvailableGames } from './redux/games/games.actions';
import { updateCurrentGame } from './redux/games/games.actions';

import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.styles.css';

import Logo from './components/logo/logo';
import GameBrowserPage from './pages/gameBrowserPage/gameBrowserPage';
import GameLobbyPage from './pages/gameLobbyPage/gameLobbyPage';
import GamePage from './pages/gamePage/gamePage';

const App = ({ updateAvailableGames, updateCurrentGame, history }) => {
  useEffect(() => {
    socket.on('availableGames', data => {
      updateAvailableGames(data);
    });
    socket.on('joinedGame', game => {
      updateCurrentGame(game);
      history.push('/lobby');
    });
  }, [updateAvailableGames]);

  return (
    <Container fluid className="app">
      <Logo />
      <Switch>
        <Route exact path="/">
          <GameBrowserPage />
        </Route>
        <Route path="/lobby">
          <GameLobbyPage />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
      </Switch>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  updateAvailableGames: games => dispatch(updateAvailableGames(games)),
  updateCurrentGame: game => dispatch(updateCurrentGame(game))
});

export default connect(null, mapDispatchToProps)(withRouter(App));
