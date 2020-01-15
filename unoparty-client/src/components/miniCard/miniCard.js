import React from 'react';

import './miniCard.styles.css';

const MiniCard = ({ color, margin, zIndex, additionalStyles }) => {
  return (
    <div
      style={{
        background: color,
        margin,
        zIndex,
        ...additionalStyles
      }}
      className="uno-card-mini-card"
    ></div>
  );
};

export default MiniCard;
