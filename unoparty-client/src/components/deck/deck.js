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
        <UnoCard number="5" />
        <UnoCardBackside />
      </Col>
    </Row>
  );
};

export default Deck;
