import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlayerName } from '../../redux/player/player.selector';
import { selectCurrentGamePlayers } from '../../redux/games/games.selectors';
import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './currentUserHand.styles.css';

import UnoCard from '../unoCard/unoCard';
import ColorSelector from '../colorSelector/colorSelector';

const CurrentUserHand = ({ playerName, currentGamePlayers, socket }) => {
  const INITIAL_COLOR_SELECTOR_DATA = {
    show: false,
    cardIndex: ''
  };
  const [colorSelectorData, setColorSelectorData] = useState(
    INITIAL_COLOR_SELECTOR_DATA
  );
  const player = currentGamePlayers.find(player => player.name === playerName);

  const playCard = cardIndex => {
    const playerCard = player.cards[cardIndex];
    if (!playerCard) {
      return alert('card does not exist');
    }
    if (playerCard.type === '+4' || playerCard.type === 'wild') {
      return setColorSelectorData({ show: true, cardIndex });
    }
    socket.emit('playCard', { cardIndex });
  };

  return (
    <Row
      style={{ height: '33.3vh', justifyContent: 'center' }}
      className="fixed-bottom"
    >
      {colorSelectorData.show && (
        <ColorSelector
          cardIndex={colorSelectorData.cardIndex}
          hideColorSelector={() =>
            setColorSelectorData(INITIAL_COLOR_SELECTOR_DATA)
          }
        />
      )}
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
  currentGamePlayers: selectCurrentGamePlayers,
  socket: selectSocketConnection
});

export default connect(mapStateToProps)(CurrentUserHand);
