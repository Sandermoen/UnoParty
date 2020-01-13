import React from 'react';

import './playerAvatar.styles.css';

const PlayerAvatar = ({ children, additionalStyles }) => {
  return (
    <div style={{ ...additionalStyles }} className="player-avatar">
      <span>{children}</span>
    </div>
  );
};

export default PlayerAvatar;
