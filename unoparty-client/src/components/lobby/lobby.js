import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import './lobby.styles.css';

const Lobby = () => {
  return (
    <Row className="lobby">
      <Col xl="6" sm="12">
        <Jumbotron className="bg-dark">
          <h1 className="lobby-name">Lobby Name</h1>
          <Row className="lobby-details">
            <Col sm="6" className="lobby-players">
              <h2>Players:</h2>
              <p>Rob</p>
              <p>Snader</p>
            </Col>
            <Col sm="6">
              <h2>Game Info:</h2>
              <p>Host: Snader</p>
              <p>Ping: 20ms</p>
              <Button variant="success">Start Game</Button>
            </Col>
          </Row>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default Lobby;
