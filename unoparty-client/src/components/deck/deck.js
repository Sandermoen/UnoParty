import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentGame } from '../../redux/games/games.selectors';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UnoCard from '../unoCard/unoCard';
import UnoCardBackside from '../unoCardBackside/unoCardBackside';

const Deck = ({ currentGame: { currentCard } }) => {
  return (
    <Row style={{ height: '33.3vh' }}>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {currentCard && (
          <UnoCard
            additionalStyles={{ marginRight: '5px' }}
            number={currentCard.number}
            cardType={currentCard.type}
            color={currentCard.color}
          />
        )}
        <UnoCardBackside additionalStyles={{ marginLeft: '5px' }} />
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  currentGame: selectCurrentGame
});

export default connect(mapStateToProps)(Deck);
