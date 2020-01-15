import React from 'react';

import '../unoCard/unoCard.styles.css';

import UnoCardWildCircle from './unoCardWildCircle/unoCardWildCircle';

const UnoCardWild = () => {
  const miniCirlceStyles = {
    height: '20%',
    width: '20%',
    position: 'absolute',
    border: '2px solid white'
  };
  return (
    <div style={{ background: 'rgb(42, 42, 42)' }} className="uno-card">
      <UnoCardWildCircle
        additionalStyles={{ ...miniCirlceStyles, top: '10px', left: '10px' }}
      />
      <div className="uno-card-middle">
        <UnoCardWildCircle />
      </div>
      <UnoCardWildCircle
        additionalStyles={{
          ...miniCirlceStyles,
          bottom: '10px',
          right: '10px',
          transform: 'rotate(180deg) skew(-15deg, -15deg)'
        }}
      />
    </div>
  );
};

export default UnoCardWild;
