import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAvailableGames } from '../../redux/games/games.selectors';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './gameBrowser.styles.css';

import Games from '../games/games';
import CreateGameModal from '../createGameModal/createGameModal';
import { ReactComponent as GameBrowserEmptySvg } from '../../assets/svg/gameBrowserEmpty.svg';

const GameBrowser = ({ availableGames }) => {
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  return (
    <Row className="game-browser">
      <CreateGameModal
        handleShow={showCreateGameModal}
        handleHide={() => setShowCreateGameModal(false)}
      />
      <Col xl="6" sm="12">
        <Jumbotron className="bg-dark game-browser-jumbotron">
          {availableGames.length > 0 ? (
            <Fragment>
              {' '}
              <div className="game-browser-info">
                <h1 className="game-browser-title">Browse Games</h1>
                <Button
                  style={{ width: '20%' }}
                  variant="secondary"
                  onClick={() => setShowCreateGameModal(!showCreateGameModal)}
                >
                  Create Game
                </Button>
              </div>
              <Games />
            </Fragment>
          ) : (
            <div className="game-browser-empty">
              <GameBrowserEmptySvg />
              <h3>Could Not Find Any Games To Join</h3>
              <h4>Why Not Create One Yourself?</h4>
              <Button
                style={{ width: '20%', marginTop: '10px' }}
                variant="success"
                onClick={() => setShowCreateGameModal(!showCreateGameModal)}
              >
                Create Game
              </Button>
            </div>
          )}
        </Jumbotron>
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  availableGames: selectAvailableGames
});

export default connect(mapStateToProps)(GameBrowser);
