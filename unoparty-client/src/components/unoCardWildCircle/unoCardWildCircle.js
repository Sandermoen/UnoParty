import React from 'react';

import './unoCardWildCircle.styles.css';

import Row from 'react-bootstrap/Row';

const UnoCardWildCircle = ({ additionalStyles }) => {
  return (
    <div
      style={{ ...additionalStyles }}
      className="uno-card-wild-middle-circle"
    >
      <Row className="uno-card-wild-color-row">
        <div
          style={{ background: 'rgb(254, 39, 39)' }}
          className="sm-3 uno-card-wild-color"
        ></div>
        <div
          style={{ background: 'rgb(9, 158, 255)' }}
          className="sm-3 uno-card-wild-color"
        ></div>
      </Row>
      <Row className="uno-card-wild-color-row">
        <div
          style={{ background: '#f0ce07' }}
          className="sm-3 uno-card-wild-color"
        ></div>
        <div
          style={{ background: '#08ba22' }}
          className="sm-3 uno-card-wild-color"
        ></div>
      </Row>
    </div>
  );
};

export default UnoCardWildCircle;
