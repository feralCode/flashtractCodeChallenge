"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const service_1 = require("./service/");
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
// custom middleware
//  enable cross origin requests
//  and tell client to cache responses for 120 seconds
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('cache-control', 'max-age=120');
    next();
});
// health check route
app.get('/', (req, res) => {
    res.json('ok');
});
app.get('/stock/:symbol', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stockSymbol = req.params.symbol;
    try {
        const yahoo = service_1.YahooFinanceAPI.getInstance();
        const yahooResponse = yield yahoo.getStockSummaryBySymbol(stockSymbol);
        // send stock data back to client
        res.json(yahooResponse.data);
    }
    catch (error) {
        console.log('error ocurred while retrieving stock');
        console.log(error);
        res.json(error);
    }
}));
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
//# sourceMappingURL=server.js.map