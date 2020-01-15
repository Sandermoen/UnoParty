import React from 'react';

import './unoCard.styles.css';

const UnoCard = ({ number, color = '#fe2727', additionalStyles, skipCard }) => {
  const cardType = skipCard ? '⊘' : number;
  return (
    <div
      style={{ background: color, ...additionalStyles }}
      className="uno-card"
    >
      <span className="uno-card-small-number">{cardType}</span>
      <div className="uno-card-middle">
        <span className="uno-card-middle-circle-number">{cardType}</span>
        <div className="uno-card-middle-circle"></div>
      </div>
      <span className="uno-card-small-number flipped">{cardType}</span>
    </div>
  );
};

export default UnoCard;
