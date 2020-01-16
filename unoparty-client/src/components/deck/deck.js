import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UnoCard from '../unoCard/unoCard';
import UnoCardBackside from '../unoCardBackside/unoCardBackside';

const Deck = () => {
  return (
    <Row style={{ height: '33.3vh' }}>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <UnoCard
          additionalStyles={{ marginRight: '5px' }}
          number="5"
          cardType="normal"
        />
        <UnoCardBackside additionalStyles={{ marginLeft: '5px' }} />
      </Col>
    </Row>
  );
};

export default Deck;
