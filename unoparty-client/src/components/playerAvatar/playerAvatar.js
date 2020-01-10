import React from 'react';

import './playerAvatar.styles.css';

const PlayerAvatar = ({ children }) => {
  return (
    <div className="player-avatar">
      <span>{children}</span>
    </div>
  );
};

export default PlayerAvatar;
