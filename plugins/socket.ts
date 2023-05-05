import {io} from "socket.io-client";
const socket = io('http://localhost:5000');
export default defineNuxtPlugin(() => {
    return {
        provide: {
            io: socket
        }
    }
})