import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentGame } from '../../redux/games/games.selectors';
import { selectPlayerName } from '../../redux/player/player.selector';

import './opponentHand.styles.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UnoCardBackside from '../unoCardBackside/unoCardBackside';
import PlayerAvatar from '../playerAvatar/playerAvatar';

const OpponentHand = ({ currentGame: { players }, playerName }) => {
  return (
    <Row className="opponent-hand-container">
      {players.map(player => {
        if (player.name !== playerName) {
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
                  <UnoCardBackside
                    additionalStyles={{ marginLeft: '-120px' }}
                  />
                  <UnoCardBackside
                    additionalStyles={{ marginLeft: '-120px' }}
                  />
                  <UnoCardBackside
                    additionalStyles={{ marginLeft: '-120px' }}
                  />
                  <UnoCardBackside
                    additionalStyles={{ marginLeft: '-120px' }}
                  />
                  <UnoCardBackside
                    additionalStyles={{ marginLeft: '-120px' }}
                  />
                  <UnoCardBackside
                    additionalStyles={{ marginLeft: '-120px' }}
                  />
                </div>
              </div>
            </Col>
          );
        }
        return;
      })}
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame,
  playerName: selectPlayerName
});

export default connect(mapStateToProps)(OpponentHand);
