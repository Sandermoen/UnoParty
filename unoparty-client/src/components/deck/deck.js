import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentGame } from '../../redux/games/games.selectors';
import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UnoCard from '../unoCard/unoCard';
import UnoCardBackside from '../unoCardBackside/unoCardBackside';

const Deck = ({ currentGame: { currentCard }, socket }) => {
  const drawCard = () => {
    socket.emit('requestCard');
  };

  return (
    <Row style={{ height: '33.3vh' }}>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {currentCard ? (
          <UnoCard
            additionalStyles={{ marginRight: '5px' }}
            number={currentCard.number}
            cardType={currentCard.type}
            color={currentCard.color}
            className="deck-card"
          />
        ) : (
          <UnoCardBackside additionalStyles={{ marginRight: '5px' }} />
        )}
        <UnoCardBackside
          drawCard={() => drawCard()}
          additionalStyles={{ marginLeft: '5px' }}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame,
  socket: selectSocketConnection
});

export default connect(mapStateToProps)(Deck);
