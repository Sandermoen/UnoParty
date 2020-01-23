import React from 'react';

import './customJumbotron.styles.css';

import Jumbotron from 'react-bootstrap/Jumbotron';

const CustomJumbotron = ({ children }) => {
  return <Jumbotron className="bg-dark custom-jumbotron">{children}</Jumbotron>;
};

export default CustomJumbotron;
