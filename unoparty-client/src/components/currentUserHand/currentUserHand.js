import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import socket from '../../socket.io/socketConnection';

import { selectPlayerName } from '../../redux/player/player.selector';
import { selectCurrentGame } from '../../redux/games/games.selectors';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './currentUserHand.styles.css';

import UnoCard from '../unoCard/unoCard';

const CurrentUserHand = ({ playerName, currentGame: { players } }) => {
  const player = players.find(player => player.name === playerName);

  const playCard = cardIndex => {
    if (!player.cards[cardIndex]) {
      return alert('card does not exist');
    }
    socket.emit('playCard', cardIndex);
  };

  return (
    <Row style={{ height: '33.3vh' }} className="fixed-bottom">
      <Col className="current-user-hand fixed-bottom" sm="12">
        {player.cards.map((card, idx) => {
          let cardProps = {
            playCard: () => playCard(idx),
            key: idx,
            color: card.color,
            cardType: card.type
          };
          if (card.number !== undefined) cardProps.number = card.number;

          return <UnoCard {...cardProps} />;
        })}
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  playerName: selectPlayerName,
  currentGame: selectCurrentGame
});

export default connect(mapStateToProps)(CurrentUserHand);
