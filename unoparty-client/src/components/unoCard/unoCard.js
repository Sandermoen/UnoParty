import React, { Fragment } from 'react';

import './unoCard.styles.css';

import PlusFourCardMiniCards from '../plusFourCardMiniCards/plusFourCardMiniCards';

const UnoCard = ({ number, plusFourCard = true, color = '#202020' }) => {
  return (
    <div style={{ background: color }} className="uno-card">
      <span className="uno-card-small-number">{number}</span>
      <div className="uno-card-middle">
        {plusFourCard ? (
          <PlusFourCardMiniCards />
        ) : (
          <span className="uno-card-middle-circle-number">{number}</span>
        )}
        <div className="uno-card-middle-circle"></div>
      </div>
      <span className="uno-card-small-number flipped">{number}</span>
    </div>
  );
};

export default UnoCard;
