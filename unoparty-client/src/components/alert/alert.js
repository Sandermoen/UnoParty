import React from 'react';
import { animated } from 'react-spring';

import './alert.styles.css';

const Alert = ({ error, children, additionalStyles }) => {
  return (
    <animated.div className="custom-alert" style={{ ...additionalStyles }}>
      <p>{children}</p>
    </animated.div>
  );
};

export default Alert;
