import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import socket from './socket.io/socketConnection';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.styles.css';

import Logo from './components/logo/logo';
import GameBrowserPage from './pages/gameBrowserPage/gameBrowserPage';
import GameLobbyPage from './pages/gameLobbyPage/gameLobbyPage';

function App() {
  useEffect(() => {
    socket.on('availableGames', data => {
      console.log(data);
    });
  }, []);
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
      </Switch>
    </Container>
  );
}

export default App;
