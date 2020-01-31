import io from 'socket.io-client';

const socket = username =>
  io({
    query: {
      username
    }
  });

export default socket;
