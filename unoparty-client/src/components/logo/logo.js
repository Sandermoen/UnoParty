import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './logo.styles.css';

const Logo = () => {
  return (
    <Row className="logo">
      <Col lg="6">
        <h1>UnoParty</h1>
      </Col>
    </Row>
  );
};

export default Logo;
