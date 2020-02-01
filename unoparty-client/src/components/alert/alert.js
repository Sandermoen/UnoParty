import React from 'react';
import { animated } from 'react-spring';

import './alert.styles.css';

const Alert = ({ children, additionalStyles }) => {
  return (
    <animated.div className="custom-alert" style={{ ...additionalStyles }}>
      <p>{children}</p>
    </animated.div>
  );
};

export default Alert;
