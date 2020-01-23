import socketTypes from './socket.types';

export const setSocket = socket => {
  return {
    type: socketTypes.SET_SOCKET,
    payload: socket
  };
};
