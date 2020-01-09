import io from 'socket.io-client';
let socket = io.connect('http://localhost:9000');

export default socket;
