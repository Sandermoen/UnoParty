import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  playCard,
  addPlayerCard,
  removePlayer,
  updateCurrentGame,
  clearCurrentGame
} from '../../redux/games/games.actions';

import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import './gamePage.styles.css';

import OpponentHand from '../../components/opponentHand/opponentHand';
import CurrentUserHand from '../../components/currentUserHand/currentUserHand';
import Deck from '../../components/deck/deck';

const GamePage = ({
  playCard,
  addPlayerCard,
  socket,
  removePlayer,
  updateCurrentGame,
  clearCurrentGame
}) => {
  useEffect(() => {
    let gameFinished = false;

    socket.on('cardPlayed', data => {
      const {
        cardPlayerIndex,
        cardIndex,
        currentPlayerTurnIndex,
        currentCard
      } = data;
      playCard(cardPlayerIndex, cardIndex, currentPlayerTurnIndex, currentCard);
    });
    socket.on('drawnCard', ({ playerIdx, randomCards, numCards }) => {
      addPlayerCard(playerIdx, randomCards, numCards);
    });

    socket.on('playerLeave', playerIdx => {
      removePlayer(playerIdx);
    });

    socket.on('gameFinished', currentGame => {
      gameFinished = true;
      updateCurrentGame(currentGame);
    });

    return () => {
      socket.off('cardPlayed');
      socket.off('drawnCard');
      socket.off('playerLeave');
      socket.off('gameFinished');

      if (!gameFinished) {
        socket.emit('leaveGame');
        clearCurrentGame();
      }
    };
  }, [
    playCard,
    addPlayerCard,
    socket,
    removePlayer,
    updateCurrentGame,
    clearCurrentGame
  ]);
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
  addPlayerCard: (playerIdx, cards, numCards) =>
    dispatch(addPlayerCard(playerIdx, cards, numCards)),
  removePlayer: playerIdx => dispatch(removePlayer(playerIdx)),
  updateCurrentGame: currentGame => dispatch(updateCurrentGame(currentGame)),
  clearCurrentGame: () => dispatch(clearCurrentGame())
});

const mapStateToProps = createStructuredSelector({
  socket: selectSocketConnection
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
