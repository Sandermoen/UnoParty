import socket from 'socket.io-client';

socket.connect('http://localhost:9000');

export default socket;
