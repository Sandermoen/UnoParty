import React from 'react';

import { ReactComponent as ReverseIcon } from '../../assets/svg/unoCardReverseIcon.svg';

import '../unoCard/unoCard.styles.css';
import './unoCardReverse.styles.css';

const UnoCardReverse = ({ color }) => {
  return (
    <div style={{ background: color }} className="uno-card">
      <ReverseIcon
        style={{ top: '0px', left: '5px' }}
        className="reverse-icon-small"
      />
      <ReverseIcon className="uno-reverse-card-icon" />
      <div className="uno-card-middle">
        <div
          style={{ background: color, border: '4px solid white' }}
          className="uno-card-middle-circle"
        ></div>
      </div>
      <ReverseIcon
        style={{ bottom: '0px', right: '5px' }}
        className="reverse-icon-small"
      />
    </div>
  );
};

export default UnoCardReverse;
