import React, { useEffect } from 'react';
import socket from '../../socket.io/socketConnection';
import { connect } from 'react-redux';

import { playCard } from '../../redux/games/games.actions';
import { addPlayerCard } from '../../redux/games/games.actions';

import './gamePage.styles.css';

import OpponentHand from '../../components/opponentHand/opponentHand';
import CurrentUserHand from '../../components/currentUserHand/currentUserHand';
import Deck from '../../components/deck/deck';

const GamePage = ({ playCard, addPlayerCard }) => {
  useEffect(() => {
    socket.on('cardPlayed', data => {
      const {
        cardPlayerIndex,
        cardIndex,
        currentPlayerTurnIndex,
        currentCard
      } = data;
      playCard(cardPlayerIndex, cardIndex, currentPlayerTurnIndex, currentCard);
    });
    socket.on('drawnCard', ({ playerIdx, randomCards }) => {
      addPlayerCard(playerIdx, randomCards);
    });
  }, [playCard, addPlayerCard]);
  return (
    <div className="game-container">
      <OpponentHand />
      <Deck />
      <CurrentUserHand />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  playCard: (cardPlayerIndex, cardIndex, currentPlayerTurnIndex, currentCard) =>
    dispatch(
      playCard(cardPlayerIndex, cardIndex, currentPlayerTurnIndex, currentCard)
    ),
  addPlayerCard: (playerIdx, cards) => dispatch(addPlayerCard(playerIdx, cards))
});

export default connect(null, mapDispatchToProps)(GamePage);
