import React from 'react';
import '../unoCard/unoCard.styles.css';
import './unoCardBackside.styles.css';

const UnoCardBackside = ({ additionalStyles, drawCard }) => {
  return (
    <div
      onClick={drawCard}
      style={{ ...additionalStyles }}
      className={`uno-card backside`}
    >
      <div className="uno-card-middle">
        <div className="uno-card-backside-middle-circle">
          <h1 className="uno-card-logo">UNO</h1>
          <h1
            style={{
              top: '62px',
              left: '15px',
              fontSize: '2.5em',
              WebkitTextStrokeWidth: '0.7px'
            }}
            className="uno-card-logo"
          >
            PARTY
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UnoCardBackside;
