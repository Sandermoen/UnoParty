import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlayerName } from '../../redux/player/player.selector';
import { selectCurrentGamePlayers } from '../../redux/games/games.selectors';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './currentUserHand.styles.css';

import UnoCard from '../unoCard/unoCard';
import UnoCardPlusFour from '../unoCardPlusFour/unoCardPlusFour';
import UnoCardWild from '../unoCardWild/unoCardWild';
import UnoCardPlusTwo from '../unoCardPlusTwo/unoCardPlusTwo';
import UnoCardReverse from '../unoCardReverse/unoCardReverse';

const CurrentUserHand = ({ playerName, currentGamePlayers }) => {
  const player = currentGamePlayers.find(player => player.name === playerName);
  return (
    <Row style={{ height: '33.3vh' }} className="fixed-bottom">
      <Col className="current-user-hand fixed-bottom" sm="12">
        {/* {player.cards.map(card => (
          <UnoCardReverse color="#fe2727" />
        ))} */}
        <UnoCard color="#fe2727" number="7" />
        <UnoCard color="#fe2727" skipCard />
        <UnoCardPlusFour />
        <UnoCardWild />
        <UnoCardPlusTwo color="#fe2727" />
        <UnoCardReverse color="#fe2727" />
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  playerName: selectPlayerName,
  currentGamePlayers: selectCurrentGamePlayers
});

export default connect(mapStateToProps)(CurrentUserHand);
