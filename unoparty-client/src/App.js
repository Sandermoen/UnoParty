import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.styles.css';

import Logo from './components/logo/logo';
import GameBrowserPage from './pages/gameBrowserPage/gameBrowserPage';

function App() {
  return (
    <Container fluid className="app">
      <Logo />
      <Switch>
        <Route exact path="/">
          <GameBrowserPage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
