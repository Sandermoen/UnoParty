import React, { useEffect } from 'react';

import './gamePage.styles.css';

import OpponentHand from '../../components/opponentHand/opponentHand';
import CurrentUserHand from '../../components/currentUserHand/currentUserHand';
import Deck from '../../components/deck/deck';

const GamePage = () => {
  return (
    <div className="game-container">
      <OpponentHand />
      <Deck />
      <CurrentUserHand />
    </div>
  );
};

export default GamePage;
