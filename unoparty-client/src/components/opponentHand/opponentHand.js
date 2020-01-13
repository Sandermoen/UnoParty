import React from 'react';

import './opponentHand.styles.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UnoCardBackside from '../unoCardBackside/unoCardBackside';
import PlayerAvatar from '../playerAvatar/playerAvatar';

const OpponentHand = () => {
  return (
    <Row className="opponent-hand-container">
      <Col className="opponent-hand-col">
        <div className="opponent-hand">
          <PlayerAvatar
            additionalStyles={{ margin: '0 auto', marginBottom: '10px' }}
          >
            Snader
          </PlayerAvatar>
          <div className="opponent-hand-cards">
            <UnoCardBackside />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
          </div>
        </div>
      </Col>
      <Col className="opponent-hand-col">
        <div className="opponent-hand">
          <PlayerAvatar
            additionalStyles={{ margin: '0 auto', marginBottom: '10px' }}
          >
            Snader
          </PlayerAvatar>
          <div className="opponent-hand-cards">
            <UnoCardBackside />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
            <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default OpponentHand;
