import React from 'react';

import '../unoCard/unoCard.styles.css';

import MiniCard from '../miniCard/miniCard';

const UnoCardPlusFour = () => {
  return (
    <div style={{ background: '#2a2a2a' }} className="uno-card">
      <span className="uno-card-small-number">+4</span>
      <div className="uno-card-middle">
        <MiniCard color="#08ba22" margin="-6px 0px 0px 14px" zIndex="12" />
        <MiniCard color="#099eff" margin="-29px 0px 0px 6px" zIndex="13" />
        <MiniCard color="#f0ce07" margin="18px 0px 0px -15px" zIndex="11" />
        <MiniCard color="#fe2727" margin="-3px 0px 0px -24px" zIndex="12" />
        <div className="uno-card-middle-circle"></div>
      </div>
      <span className="uno-card-small-number flipped">+4</span>
    </div>
  );
};

export default UnoCardPlusFour;
