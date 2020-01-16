import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import socket from '../../socket.io/socketConnection';

import { selectPlayerName } from '../../redux/player/player.selector';
import { selectCurrentGamePlayers } from '../../redux/games/games.selectors';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './currentUserHand.styles.css';

import UnoCard from '../unoCard/unoCard';

const CurrentUserHand = ({ playerName, currentGamePlayers }) => {
  const player = currentGamePlayers.find(player => player.name === playerName);

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
          switch (card.type) {
            case 'normal':
              return (
                <UnoCard
                  playCard={() => playCard(idx)}
                  key={idx}
                  color={card.color}
                  number={card.number}
                  cardType="normal"
                />
              );
            case 'skip':
              return (
                <UnoCard
                  playCard={() => playCard(idx)}
                  key={idx}
                  skipCard
                  color={card.color}
                  cardType="skip"
                />
              );
            case 'reverse':
              return (
                <UnoCard
                  playCard={() => playCard(idx)}
                  key={idx}
                  color={card.color}
                  cardType="reverse"
                />
              );
            case '+2':
              return (
                <UnoCard
                  playCard={() => playCard(idx)}
                  key={idx}
                  color={card.color}
                  cardType="+2"
                  number={card.number}
                />
              );
            case 'wild':
              return (
                <UnoCard
                  playCard={() => playCard(idx)}
                  key={idx}
                  color={card.color}
                  cardType="wild"
                />
              );
            case '+4':
              return (
                <UnoCard
                  playCard={() => playCard(idx)}
                  key={idx}
                  color={card.color}
                  cardType="+4"
                  number={card.number}
                />
              );
            default:
              return [];
          }
        })}
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  playerName: selectPlayerName,
  currentGamePlayers: selectCurrentGamePlayers
});

export default connect(mapStateToProps)(CurrentUserHand);
