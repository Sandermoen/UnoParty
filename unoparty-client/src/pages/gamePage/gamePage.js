import React from 'react';

import './gamePage.styles.css';

import CurrentUserHand from '../../components/currentUserHand/currentUserHand';

const GamePage = () => {
  return (
    <div className="game-container">
      <CurrentUserHand />
    </div>
  );
};

export default GamePage;
