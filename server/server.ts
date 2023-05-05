/*
import {Request, Response} from "express";
import {Socket} from "socket.io";

const app = require('express')();
const cors = require('cors');
const events = require('events');
app.use(cors());
const http = require('http').createServer(app);
const emitter = new events.EventEmitter();
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', () => {
    console.log('connect')
})
io.on("connect", (socket:Socket) => {
    socket.emit('message', `welcome ${socket.id}`);
    socket.broadcast.emit('message', `${socket.id} joined`)

    socket.on('message', function message(data: any) {
        console.log('message received: %s', data)
        socket.emit('message', { data })
    })
})

app.get('/get-messages', (req: Request, res:Response) => {
    emitter.once('newMessage', (message: string) => {
        res.json(message);
    })
})

app.post('/set-message', ((req: Request, res:Response) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200);
}))
http.listen(process.env.PORT, () => {
    console.log('server run')
})*/

interface MessageNotification {
    title: string,
    userId: string,
    message: string,
    typeMessage: string,

    avatarUser: string,
    nameUser:string

}

import { Server } from 'socket.io';
import {Request, Response} from "express";
import {SocketId} from "socket.io-adapter";
type Client = {
    sid: SocketId,
    uid: string | string[]
}
const clients:Client[] = [];

declare global {
    var clients: Client[]
}
const io = new Server(5000, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    console.log('Connection', socket.id)
    socket.on('message', function message(data:MessageNotification) {
        clients.forEach((client) => {
            if(client.uid === data.userId) {
                console.log(client)
                io.sockets.to(client.sid).emit('NotificationMessage', data)
            }

        })

    })
})
io.on('connect', (socket) => {
    socket.emit('updateUserStatus', clients.filter((el) => {
        return el.uid === socket.handshake.query?.user
    }));

    socket.on("userConnected", (userId:string) => {
        if(!clients.some((user) => user.sid === socket.id))
        {
            clients.push({
                sid: socket.id,
                uid:userId
            })
            global.clients = clients
            console.log(global.clients)
            socket.handshake.query.user = userId
        }


    })




    socket.on('disconnecting', () => {
        console.log('disconnected', socket.id)
        const index = clients.findIndex((client) => client.sid === socket.id);
        clients.slice(index, 1);
        global.clients = clients
        //socket.broadcast.emit('message', `${socket.id} left`)
    })
});

export default function (req:Request, res:Response, next) {
    console.log('server run')
    res.statusCode = 200
    res.end()
}