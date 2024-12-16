// import { io } from 'socket.io-client';

// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// const socket = io(SOCKET_URL, { autoConnect: false });

// export const connectSocket = () => {
//     if (!socket.connected) {
//         socket.connect();
//     }
// };

// export const disconnectSocket = () => {
//     if (socket.connected) {
//         socket.disconnect();
//     }
// };

// export default socket;


import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Replace with your backend URL

let socket;

export const useSocket = () => {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"],
            auth: {
                token: localStorage.getItem("authToken"),
            },
        });
    }
    return socket;
};
