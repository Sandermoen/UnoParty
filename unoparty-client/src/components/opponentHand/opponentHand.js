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
  const renderOpponentCards = () => {
    const cards = players
      .filter(player => player.name !== playerName && player.cards > 0)
      .map((player, idx) => {
        let cards = [];
        for (let i = 0; i < player.cards; i++) {
          cards.push(<UnoCardBackside key={i} />);
        }
        return (
          <Col key={idx} className="opponent-hand-col">
            <div className="opponent-hand">
              <PlayerAvatar
                additionalStyles={{ margin: '0 auto', marginBottom: '10px' }}
              >
                {player.name}
              </PlayerAvatar>
              <div className="opponent-hand-cards">{cards}</div>
            </div>
          </Col>
        );
      });
    return cards;
  };

  return <Row className="opponent-hand-container">{renderOpponentCards()}</Row>;
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame,
  playerName: selectPlayerName
});

export default connect(mapStateToProps)(OpponentHand);
