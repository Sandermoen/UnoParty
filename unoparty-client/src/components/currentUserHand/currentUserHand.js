import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTransition } from 'react-spring';

import { selectPlayerName } from '../../redux/player/player.selector';
import { selectCurrentGamePlayers } from '../../redux/games/games.selectors';
import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './currentUserHand.styles.css';

import UnoCard from '../unoCard/unoCard';
import ColorSelector from '../colorSelector/colorSelector';

const CurrentUserHand = ({ playerName, currentGamePlayers, socket }) => {
  const INITIAL_COLOR_SELECTOR_DATA = {
    show: false,
    cardIndex: ''
  };
  const [deckCardPosition, setDeckCardPosition] = useState({
    from: { opacity: 0, top: '0px', left: '0px' },
    enter: { opacity: 1, top: '0px', left: '0px' },
    leave: {
      top: `0px`,
      left: `0px`
    }
  });
  const [colorSelectorData, setColorSelectorData] = useState(
    INITIAL_COLOR_SELECTOR_DATA
  );
  const [toggleCallUnoButton, setToggleCallUnoButton] = useState(false);
  const player = currentGamePlayers.find(player => player.name === playerName);

  useEffect(() => {
    socket.on('unoButton', () => {
      setToggleCallUnoButton(true);
    });

    socket.on('disableUnoButton', () => {
      setToggleCallUnoButton(false);
    });

    return () => {
      socket.off('unoButton');
      socket.off('disableUnoButton');
    };
  }, [setToggleCallUnoButton, socket]);

  const playCard = (cardIndex, key) => {
    const playerCard = player.cards[cardIndex];
    if (!playerCard) {
      return alert('card does not exist');
    }
    if (toggleCallUnoButton) {
      setToggleCallUnoButton(false);
    }

    const top =
      document.querySelector(`._${key}`).getBoundingClientRect().top -
      document.querySelector('.deck-card').getBoundingClientRect().top;

    let left =
      document.querySelector(`._${key}`).getBoundingClientRect().left -
      document.querySelector('.deck-card').getBoundingClientRect().left;

    left = Number.isInteger(left) ? -left : Math.abs(left);

    const positionData = {
      ...deckCardPosition,
      leave: {
        top: `-${top}px`,
        left: `${left}px`
      }
    };

    if (playerCard.type === '+4' || playerCard.type === 'wild') {
      return setColorSelectorData({
        show: true,
        cardIndex,
        setDeckCardPosition: () => setDeckCardPosition(positionData)
      });
    }

    setDeckCardPosition(positionData);

    socket.emit('playCard', { cardIndex });
  };

  const callUno = () => {
    socket.emit('callUno');
    setToggleCallUnoButton(false);
  };

  const transitions = useTransition(
    player.cards,
    cards => cards.key,
    deckCardPosition
  );

  return (
    <Row
      style={{ height: '33.3vh', justifyContent: 'center' }}
      className="fixed-bottom"
    >
      {colorSelectorData.show && (
        <ColorSelector
          {...colorSelectorData}
          hideColorSelector={() =>
            setColorSelectorData(INITIAL_COLOR_SELECTOR_DATA)
          }
        />
      )}
      {toggleCallUnoButton && (
        <div>
          <Button
            onClick={() => callUno()}
            style={{ height: '50px' }}
            variant="secondary"
          >
            Call Uno
          </Button>
        </div>
      )}
      <Col className="current-user-hand fixed-bottom" sm="12">
        {transitions.map(({ item, props, key }, idx) => {
          let cardProps = {
            playCard: () => playCard(idx, key),
            key,
            color: item.color,
            cardType: item.type
          };
          if (item.number !== undefined) cardProps.number = item.number;
          return (
            <UnoCard
              {...cardProps}
              additionalStyles={props}
              className={`_${key}`}
            />
          );
        })}
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  playerName: selectPlayerName,
  currentGamePlayers: selectCurrentGamePlayers,
  socket: selectSocketConnection
});

export default connect(mapStateToProps)(CurrentUserHand);
