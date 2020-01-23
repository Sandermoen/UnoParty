import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setPlayerName } from '../../redux/player/player.actions';
import { setSocket } from '../../redux/socket/socket.actions';

import './loginForm.styles.css';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import CustomJumbotron from '../customJumbotron/customJumbotron';

const LoginForm = ({ setSocket, setPlayerName }) => {
  const [username, setUsername] = useState('');

  const handleClick = async event => {
    event.preventDefault();
    if (!username) {
      return alert('empty username');
    }
    setPlayerName(username);
    import('../../socket.io/socketConnection').then(socket => {
      return setSocket(socket.default(username));
    });
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

export default connect(null, mapDispatchToProps)(LoginForm);
