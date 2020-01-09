import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './gameBrowser.styles.css';

import Games from '../games/games';
import CreateGameModal from '../createGameModal/createGameModal';

const GameBrowser = () => {
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  return (
    <Row className="game-browser">
      <CreateGameModal
        handleShow={showCreateGameModal}
        handleHide={() => setShowCreateGameModal(false)}
      />
      <Col xl="6" sm="12">
        <Jumbotron className="bg-dark">
          <div className="game-browser-info">
            <h1 className="game-browser-title">Browse Games</h1>
            <Button
              style={{ width: '20%' }}
              variant="secondary"
              onClick={() => setShowCreateGameModal(!showCreateGameModal)}
            >
              Create Game
            </Button>
          </div>
          <Games />
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default GameBrowser;
