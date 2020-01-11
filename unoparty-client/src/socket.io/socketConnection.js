import io from 'socket.io-client';

const username = prompt('Choose your username');

const socket = io.connect('http://localhost:9000', {
  query: {
    username
  }
});

export default socket;
