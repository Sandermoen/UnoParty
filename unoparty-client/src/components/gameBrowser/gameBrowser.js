import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './gameBrowser.styles.css';

import Games from '../games/games';

const GameBrowser = () => {
  return (
    <Row className="game-browser">
      <Col xl="6" sm="12">
        <Jumbotron className="bg-dark">
          <h1 className="game-browser-title">Browse Games</h1>
          <Games />
          <Button variant="secondary">Create Game</Button>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default GameBrowser;
