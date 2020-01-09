import React from 'react';

import { ReactComponent as UnoPartyLogo } from '../../assets/svg/logo.svg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './logo.styles.css';

const Logo = () => {
  return (
    <Row className="logo">
      <Col lg="6">
        <UnoPartyLogo className="logo-svg" />
      </Col>
    </Row>
  );
};

export default Logo;
