import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './currentUserHand.styles.css';

import UnoCard from '../unoCard/unoCard';

const CurrentUserHand = () => {
  return (
    <Row style={{ height: '26.6vh' }} className="fixed-bottom">
      <Col className="current-user-hand" sm="12">
        <UnoCard number={1} />
        <UnoCard number={2} />
        <UnoCard number={3} />
        <UnoCard number={4} />
        <UnoCard number={5} />
        <UnoCard number={6} />
        <UnoCard number={7} />
      </Col>
    </Row>
  );
};

export default CurrentUserHand;
