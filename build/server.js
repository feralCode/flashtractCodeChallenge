"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const yahooFinance_1 = require("./service/yahooFinance");
const app = express_1.default();
// socket.io integration
const http = require('http').createServer(app);
const socketConfig = {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    },
    origins: '*:*'
};
const io = socket_io_1.default(http, socketConfig);
// server static files from public folder
const baseDir = __dirname + '/../public/';
app.use(express_1.default.static(baseDir));
// json middleware
app.use(express_1.default.json());
// custom middleware    enable cross origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
// health check route
app.get('/', (req, res) => {
    res.json('ok');
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
// get port from env  or use 8080
const port = process.env.PORT || 8080;
// listen to requests
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
yahooFinance_1.getStockBySymbol('AAPL')
    .then((res) => {
    console.log(res.data);
})
    .catch(error => {
    console.log('error ocurred while retrieving stock');
    console.log(error);
});
//# sourceMappingURL=server.js.map