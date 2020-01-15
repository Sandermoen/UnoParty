import React from 'react';

import '../unoCard/unoCard.styles.css';

import MiniCard from '../miniCard/miniCard';

const UnoCardPlusTwo = ({ color }) => {
  const styles = {
    height: '65px',
    width: '35px'
  };
  return (
    <div style={{ background: color }} className="uno-card">
      <span className="uno-card-small-number">+2</span>
      <div className="uno-card-middle">
        <MiniCard
          color={color}
          margin="12px 0px 0px -18px"
          zIndex="11"
          additionalStyles={styles}
        />
        <MiniCard
          color={color}
          margin="-11px 0px 0px 12px"
          zIndex="10"
          additionalStyles={styles}
        />
        <div className="uno-card-middle-circle"></div>
      </div>
      <span className="uno-card-small-number flipped">+2</span>
    </div>
  );
};

export default UnoCardPlusTwo;
