import io from 'socket.io-client';
import store from '../redux/store';

import { setPlayerName } from '../redux/player/player.actions';

const username = prompt('Choose your username');
store.dispatch(setPlayerName(username));

const socket = io.connect('http://localhost:9000', {
  query: {
    username
  }
});

export default socket;
