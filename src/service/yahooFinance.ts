import axios, { AxiosRequestConfig } from 'axios';
import { StockCache } from './StockPriceCache'


// req.query({
// 	"lang": "en",
// 	"region": "US",
// 	"query": "nbe"
// });

// req.headers({
// 	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "87c1dd4885msh8a002eed6f2cc5fp15cae8jsn52b9a9652f6e",
// 	"useQueryString": true
// });

// function search




// Yahoo Finance API Singleton
export class YahooFinanceAPI {
    private static instance: YahooFinanceAPI;
    private static baseURL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2'
    private static APIKeys = [
        '87c1dd4885msh8a002eed6f2cc5fp15cae8jsn52b9a9652f6e', // ours
        '9782c9bf2bmshb4f39a2b5204672p1e1f59jsnb81f4a3c6e34'
    ]
    public userWatchListSymbols: string[] = []
    private stockCache: StockCache = StockCache.getInstance()
    private subscribers: Function[] = []

    constructor() {
        // call this refresh loop
        console.log('YahooFinanceAPI constructed')
        this.getAllWatchedSymbolsLoop()
    }

    static getInstance = () => {
        if (!YahooFinanceAPI.instance) {
            YahooFinanceAPI.instance = new YahooFinanceAPI();
        }

        return YahooFinanceAPI.instance;
    }

    addSubscriber = (cb: Function) => {
        this.subscribers.push(cb)
    }

    getAllWatchedSymbolsLoop = async (index = 0) => {
        console.log('getAllWatchedSymbolsLoop called with index', index)
        let newIndex = index
        // lets loop through all of the symbols recursively using an index forever
        const currentSymbolToRefresh = this.userWatchListSymbols[index]
        console.log('currentSymbolToRefresh', currentSymbolToRefresh)
        try {
            const response = await this.getStockSummaryBySymbol(currentSymbolToRefresh)
            // update cache
            this.stockCache.setStockBySymbol(currentSymbolToRefresh, response.data)
            // lets notify subscribers too
            console.log('notifying subscribers')
            this.subscribers.forEach((sub) => {
                sub([currentSymbolToRefresh, response.data])
            })

            // lets increment since no errors
            newIndex += 1
            if (newIndex === this.userWatchListSymbols.length) {
                newIndex = 0
            }
            console.log('newIndex', newIndex)
        } catch (error) {
            console.log(error)
        }
        // lets wait 2 seconds then call again
        setTimeout(() => this.getAllWatchedSymbolsLoop(newIndex), 2000)
    }

    addSymbolToWatchList = (stockSymbol: string) => {
        // if watchlist doesn't include stock then add to list
        if (this.userWatchListSymbols.includes(stockSymbol) === false) {
            this.userWatchListSymbols.push(stockSymbol)
        }
    }

    // we will cycle through multiple api keys to increase rate limit and daily limits
    getRandomAPIKey = (): string => {
        const { APIKeys } = YahooFinanceAPI
        return APIKeys[Math.floor(Math.random() * APIKeys.length)];
    }

    getHeaderConfig = () => {
        const headerConfig = {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": this.getRandomAPIKey()
        }
        return headerConfig
    }

    getStockSummaryBySymbol = async (symbol: string) => {
        // 'get-summary?region=US&symbol=AAPL'
        const url = `${YahooFinanceAPI.baseURL}/get-summary?region=US&symbol=${symbol}`
        const requestOptions: AxiosRequestConfig = {
            method: 'GET',
            url: url,
            headers: this.getHeaderConfig()
        }
        return axios(requestOptions)
    }
}