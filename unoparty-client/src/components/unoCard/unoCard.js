import React, { Fragment } from 'react';

import { ReactComponent as ReverseIcon } from '../../assets/svg/unoCardReverseIcon.svg';

import './unoCard.styles.css';

import MiniCard from '../miniCard/miniCard';
import UnoCardWildCircle from '../unoCardWildCircle/unoCardWildCircle';

const UnoCard = ({
  number,
  color,
  additionalStyles,
  cardType,
  playCard,
  key
}) => {
  const renderUnoCard = () => {
    switch (cardType) {
      case 'skip':
        return (
          <Fragment>
            <span className="uno-card-small-number">⊘</span>
            <div className="uno-card-middle">
              <span style={{ color }} className="uno-card-middle-circle-number">
                ⊘
              </span>
              <div className="uno-card-middle-circle"></div>
            </div>
            <span className="uno-card-small-number flipped">⊘</span>
          </Fragment>
        );
      case 'reverse':
        return (
          <Fragment>
            <ReverseIcon
              style={{ top: '0px', left: '5px' }}
              className="reverse-icon-small"
            />
            <ReverseIcon className="uno-reverse-card-icon" />
            <div className="uno-card-middle">
              <div
                style={{ background: color, border: '4px solid white' }}
                className="uno-card-middle-circle"
              ></div>
            </div>
            <ReverseIcon
              style={{ bottom: '0px', right: '5px' }}
              className="reverse-icon-small"
            />
          </Fragment>
        );
      case '+2':
        const plusTwoCardStyles = {
          height: '65px',
          width: '35px'
        };
        return (
          <Fragment>
            <span className="uno-card-small-number">{number}</span>
            <div className="uno-card-middle">
              <MiniCard
                color={color}
                margin="12px 0px 0px -18px"
                zIndex="11"
                additionalStyles={plusTwoCardStyles}
              />
              <MiniCard
                color={color}
                margin="-11px 0px 0px 12px"
                zIndex="10"
                additionalStyles={plusTwoCardStyles}
              />
              <div className="uno-card-middle-circle"></div>
            </div>
            <span className="uno-card-small-number flipped">{number}</span>
          </Fragment>
        );
      case '+4':
        return (
          <Fragment>
            <span className="uno-card-small-number">{number}</span>
            <div className="uno-card-middle">
              <MiniCard
                color="#08ba22"
                margin="-6px 0px 0px 14px"
                zIndex="12"
              />
              <MiniCard
                color="#099eff"
                margin="-29px 0px 0px 6px"
                zIndex="13"
              />
              <MiniCard
                color="#f0ce07"
                margin="18px 0px 0px -15px"
                zIndex="11"
              />
              <MiniCard
                color="#fe2727"
                margin="-3px 0px 0px -24px"
                zIndex="12"
              />
              <div className="uno-card-middle-circle"></div>
            </div>
            <span className="uno-card-small-number flipped">{number}</span>
          </Fragment>
        );
      case 'wild':
        const miniCirlceStyles = {
          height: '20%',
          width: '20%',
          position: 'absolute',
          border: '2px solid white'
        };
        return (
          <Fragment>
            <UnoCardWildCircle
              additionalStyles={{
                ...miniCirlceStyles,
                top: '10px',
                left: '10px'
              }}
            />
            <div className="uno-card-middle">
              <UnoCardWildCircle />
            </div>
            <UnoCardWildCircle
              additionalStyles={{
                ...miniCirlceStyles,
                bottom: '10px',
                right: '10px',
                transform: 'rotate(180deg) skew(-15deg, -15deg)'
              }}
            />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <span className="uno-card-small-number">{number}</span>
            <div className="uno-card-middle">
              <span style={{ color }} className="uno-card-middle-circle-number">
                {number}
              </span>
              <div className="uno-card-middle-circle"></div>
            </div>
            <span className="uno-card-small-number flipped">{number}</span>
          </Fragment>
        );
    }
  };

  return (
    <div
      style={{ background: color, ...additionalStyles }}
      className="uno-card"
      onClick={playCard}
    >
      {renderUnoCard()}
    </div>
  );
};

export default UnoCard;
