import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSocketConnection } from '../../redux/socket/socket.selectors';

import './colorSelector.styles.css';

import Button from 'react-bootstrap/Button';

const ColorSelector = ({
  cardIndex,
  hideColorSelector,
  setDeckCardPosition,
  socket
}) => {
  const colors = [
    { color: 'Red', bootStrapColor: 'danger' },
    { color: 'Green', bootStrapColor: 'success' },
    { color: 'Blue', bootStrapColor: 'primary' },
    { color: 'Yellow', bootStrapColor: 'warning' }
  ];

  const handleClick = event => {
    socket.emit('playCard', { cardIndex, colorIndex: event.target.value });
    setDeckCardPosition();
    return hideColorSelector();
  };

  return (
    <div className="color-selector">
      {colors.map(({ color, bootStrapColor }, idx) => (
        <Button
          onClick={event => handleClick(event)}
          variant={bootStrapColor}
          value={idx}
          key={idx}
        >
          {color}
        </Button>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  socket: selectSocketConnection
});

export default connect(mapStateToProps)(ColorSelector);
