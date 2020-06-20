import express from 'express'
import socket_io from 'socket.io'

const app = express()


// socket.io integration
const http = require('http').createServer(app);
const socketConfig = {
    handlePreflightRequest: (req: any, res: any) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    },
    origins: '*:*'
}
const io = socket_io(http, socketConfig);

// server static files from public folder
const baseDir = __dirname + '/../public/'
app.use(express.static(baseDir))
// json middleware
app.use(express.json())
// custom middleware    enable cross origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

// health check route
app.get('/', (req, res) => {
    res.json('ok')
})



io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log(msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




// get port from env  or use 8080
const port = process.env.PORT || 8080
// listen to requests
app.listen(port, () => {
    console.log(`server is listening on ${port}`)
});