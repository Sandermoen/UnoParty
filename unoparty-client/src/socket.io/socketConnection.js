import io from 'socket.io-client';

const socket = username =>
  io.connect('http://localhost:9000', {
    query: {
      username
    }
  });

export default socket;
