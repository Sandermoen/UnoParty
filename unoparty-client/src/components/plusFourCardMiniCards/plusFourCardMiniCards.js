import React, { Fragment } from 'react';

import './plusFourCardMiniCards.styles.css';

const PlusFourCardMiniCards = () => {
  return (
    <Fragment>
      <div
        style={{
          background: '#08ba22',
          margin: '-6px 0px 0px 14px',
          zIndex: '12'
        }}
        className="uno-card-plus-four-mini-card"
      ></div>
      <div
        style={{
          background: '#099eff',
          margin: '-29px 0px 0px 6px',
          zIndex: '13'
        }}
        className="uno-card-plus-four-mini-card"
      ></div>
      <div
        style={{
          background: '#f0ce07',
          margin: '18px 0px 0px -15px',
          zIndex: '11'
        }}
        className="uno-card-plus-four-mini-card"
      ></div>
      <div
        style={{
          background: 'red',
          margin: '-3px 0px 0px -24px',
          zIndex: '12'
        }}
        className="uno-card-plus-four-mini-card"
      ></div>
    </Fragment>
  );
};

export default PlusFourCardMiniCards;
