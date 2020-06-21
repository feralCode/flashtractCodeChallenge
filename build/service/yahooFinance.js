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
exports.YahooFinanceAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const StockPriceCache_1 = require("./StockPriceCache");
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
class YahooFinanceAPI {
    constructor() {
        this.userWatchListSymbols = [];
        this.stockCache = StockPriceCache_1.StockCache.getInstance();
        this.subscribers = [];
        this.addSubscriber = (cb) => {
            this.subscribers.push(cb);
        };
        this.getAllWatchedSymbolsLoop = (index = 0) => __awaiter(this, void 0, void 0, function* () {
            console.log('getAllWatchedSymbolsLoop called with index', index);
            let newIndex = index;
            // lets loop through all of the symbols recursively using an index forever
            const currentSymbolToRefresh = this.userWatchListSymbols[index];
            console.log('currentSymbolToRefresh', currentSymbolToRefresh);
            try {
                const response = yield this.getStockSummaryBySymbol(currentSymbolToRefresh);
                // update cache
                this.stockCache.setStockBySymbol(currentSymbolToRefresh, response.data);
                // lets notify subscribers too
                console.log('notifying subscribers');
                this.subscribers.forEach((sub) => {
                    sub([currentSymbolToRefresh, response.data]);
                });
                // lets increment since no errors
                newIndex += 1;
                if (newIndex === this.userWatchListSymbols.length) {
                    newIndex = 0;
                }
                console.log('newIndex', newIndex);
            }
            catch (error) {
                console.log(error);
            }
            // lets wait 2 seconds then call again
            setTimeout(() => this.getAllWatchedSymbolsLoop(newIndex), 2000);
        });
        this.addSymbolToWatchList = (stockSymbol) => {
            // if watchlist doesn't include stock then add to list
            if (this.userWatchListSymbols.includes(stockSymbol) === false) {
                this.userWatchListSymbols.push(stockSymbol);
            }
        };
        // we will cycle through multiple api keys to increase rate limit and daily limits
        this.getRandomAPIKey = () => {
            const { APIKeys } = YahooFinanceAPI;
            return APIKeys[Math.floor(Math.random() * APIKeys.length)];
        };
        this.getHeaderConfig = () => {
            const headerConfig = {
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                "x-rapidapi-key": this.getRandomAPIKey()
            };
            return headerConfig;
        };
        this.getStockSummaryBySymbol = (symbol) => __awaiter(this, void 0, void 0, function* () {
            // 'get-summary?region=US&symbol=AAPL'
            const url = `${YahooFinanceAPI.baseURL}/get-summary?region=US&symbol=${symbol}`;
            const requestOptions = {
                method: 'GET',
                url: url,
                headers: this.getHeaderConfig()
            };
            return axios_1.default(requestOptions);
        });
        // call this refresh loop
        console.log('YahooFinanceAPI constructed');
        this.getAllWatchedSymbolsLoop();
    }
}
exports.YahooFinanceAPI = YahooFinanceAPI;
YahooFinanceAPI.baseURL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2';
YahooFinanceAPI.APIKeys = [
    '87c1dd4885msh8a002eed6f2cc5fp15cae8jsn52b9a9652f6e',
    '9782c9bf2bmshb4f39a2b5204672p1e1f59jsnb81f4a3c6e34'
];
YahooFinanceAPI.getInstance = () => {
    if (!YahooFinanceAPI.instance) {
        YahooFinanceAPI.instance = new YahooFinanceAPI();
    }
    return YahooFinanceAPI.instance;
};
//# sourceMappingURL=yahooFinance.js.map