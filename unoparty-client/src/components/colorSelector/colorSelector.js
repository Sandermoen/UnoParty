import React from 'react';
import socket from '../../socket.io/socketConnection';

import './colorSelector.styles.css';

import Button from 'react-bootstrap/Button';

const ColorSelector = ({ cardIndex, hideColorSelector }) => {
  const colors = [
    { color: 'Red', bootStrapColor: 'danger' },
    { color: 'Green', bootStrapColor: 'success' },
    { color: 'Blue', bootStrapColor: 'primary' },
    { color: 'Yellow', bootStrapColor: 'warning' }
  ];

  const handleClick = event => {
    socket.emit('playCard', { cardIndex, colorIndex: event.target.value });
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

export default ColorSelector;
