import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentGame } from '../../redux/games/games.selectors';

import './opponentHand.styles.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UnoCardBackside from '../unoCardBackside/unoCardBackside';
import PlayerAvatar from '../playerAvatar/playerAvatar';

const OpponentHand = ({ currentGame: { players } }) => {
  return (
    <Row className="opponent-hand-container">
      {players.map(player => {
        return (
          <Col className="opponent-hand-col">
            <div className="opponent-hand">
              <PlayerAvatar
                additionalStyles={{ margin: '0 auto', marginBottom: '10px' }}
              >
                {player.name}
              </PlayerAvatar>
              <div className="opponent-hand-cards">
                <UnoCardBackside />
                <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
                <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
                <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
                <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
                <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
                <UnoCardBackside additionalStyles={{ marginLeft: '-120px' }} />
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame
});

export default connect(mapStateToProps)(OpponentHand);
