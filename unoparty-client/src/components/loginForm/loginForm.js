import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setPlayerName } from '../../redux/player/player.actions';
import { setSocket } from '../../redux/socket/socket.actions';

import { selectPlayerStatus } from '../../redux/player/player.selector';

import './loginForm.styles.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CustomJumbotron from '../customJumbotron/customJumbotron';

const LoginForm = ({ setSocket, setPlayerName, setAlert, playerStatus }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    playerStatus.state === 'success' &&
      import('../../socket.io/socketConnection').then(socket =>
        setSocket(socket.default(username))
      );

    playerStatus.error && setAlert({ message: playerStatus.state });
  }, [playerStatus, setSocket, setAlert]);

  const handleClick = async event => {
    event.preventDefault();
    if (!username) {
      return setAlert({ message: 'Please enter a username' });
    } else if (username.length <= 3) {
      return setAlert({
        message: 'Please choose a username longer than 3 characters'
      });
    }

    setPlayerName(username);
  };

  return (
    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Col xl="6" sm="12">
        <CustomJumbotron>
          <div className="login-form-welcome">
            <h3>Welcome!</h3>
            <h4>Please choose a username</h4>
          </div>
          <Form onSubmit={event => handleClick(event)} className="login-form">
            <Row style={{ padding: '10px 0' }}>
              <Col>
                <Form.Control
                  onChange={event => setUsername(event.target.value)}
                  placeholder="Username"
                />
              </Col>
            </Row>
            <Button variant="success" type="submit">
              Start Playing
            </Button>
          </Form>
        </CustomJumbotron>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = dispatch => ({
  setPlayerName: name => dispatch(setPlayerName(name)),
  setSocket: socket => dispatch(setSocket(socket))
});

const mapStateToProps = createStructuredSelector({
  playerStatus: selectPlayerStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
