import React, { Fragment } from 'react';

import { ReactComponent as UnoPartyLogo } from '../../assets/svg/logo.svg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './logo.styles.css';

const Logo = ({ watermark }) => {
  return (
    <Fragment>
      {watermark ? (
        <UnoPartyLogo
          style={{
            position: 'absolute',
            height: '20vh',
            right: '0',
            bottom: '0',
            zIndex: '9999',
            opacity: '0.5'
          }}
        />
      ) : (
        <Row className="logo">
          <Col lg="6">
            <UnoPartyLogo className="logo-svg" />
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default Logo;
