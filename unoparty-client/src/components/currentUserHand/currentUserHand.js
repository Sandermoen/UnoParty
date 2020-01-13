import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './currentUserHand.styles.css';

import UnoCard from '../unoCard/unoCard';

const CurrentUserHand = () => {
  return (
    <Row style={{ height: '33.3vh' }} className="fixed-bottom">
      <Col className="current-user-hand fixed-bottom" sm="12">
        <UnoCard number={1} />
        <UnoCard additionalStyles={{ marginLeft: '-50px' }} number={2} />
        <UnoCard additionalStyles={{ marginLeft: '-50px' }} number={3} />
        <UnoCard additionalStyles={{ marginLeft: '-50px' }} number={4} />
        <UnoCard additionalStyles={{ marginLeft: '-50px' }} number={5} />
        <UnoCard additionalStyles={{ marginLeft: '-50px' }} number={6} />
        <UnoCard additionalStyles={{ marginLeft: '-50px' }} number={7} />
      </Col>
    </Row>
  );
};

export default CurrentUserHand;
