import express from 'express'
import socket_io from 'socket.io'
import { YahooFinanceAPI } from './service/'
import { AxiosResponse } from 'axios';
const app = express()


// socket.io integration
const http = require('http').Server(app);

const io = socket_io(http);

// server static files from public folder
const baseDir = __dirname + '/../public/'
app.use(express.static(baseDir))
// json middleware
app.use(express.json())
// custom middleware
//  enable cross origin requests
//  and tell client to cache responses for 120 seconds
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Credentials', /*  */)
    res.header('cache-control', 'max-age=120')
    next()
})

// health check route
app.get('/', (req, res) => {
    res.json('ok')
})

app.get('/stock/:symbol', async (req, res) => {
    const stockSymbol = req.params.symbol




    try {
        const yahoo = YahooFinanceAPI.getInstance()

        const yahooResponse = await yahoo.getStockSummaryBySymbol(stockSymbol)
        // send stock data back to client
        if (yahooResponse.data) {
            return res.json(yahooResponse.data)
        } else {
            return yahooResponse
        }
    } catch (error) {

        console.log('error ocurred while retrieving stock')
        console.log(error)
        res.json(error)
    }
})



io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            socket.emit('timer', new Date());
        }, interval);
    });

    socket.on('stockUpdate', (stockSymbol) => {
        const yahoo = YahooFinanceAPI.getInstance()
        yahoo.addSymbolToWatchList(stockSymbol)

        const onUpdate = (updateData: any[]) => {
            const [symbol, data] = updateData
            socket.emit(symbol, data);
        }
        yahoo.addSubscriber(onUpdate)
    })



    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




// get port from env  or use 8080
const port = process.env.PORT || 8080
// listen to requests
// app.listen(port, () => {
//     console.log(`server is listening on ${port}`)
// });

http.listen(port)