"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YahooFinanceAPI = void 0;
const axios_1 = __importDefault(require("axios"));
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
    // we will cycle through multiple api keys to increase rate limit and daily limits
    getRandomAPIKey() {
        const { APIKeys } = YahooFinanceAPI;
        return APIKeys[Math.floor(Math.random() * APIKeys.length)];
    }
    getHeaderConfig() {
        const headerConfig = {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": this.getRandomAPIKey()
        };
        return headerConfig;
    }
    getStockSummaryBySymbol(symbol) {
        // 'get-summary?region=US&symbol=AAPL'
        const url = `${YahooFinanceAPI.baseURL}/get-summary?region=US&symbol=${symbol}`;
        const requestOptions = {
            method: 'GET',
            url: url,
            headers: this.getHeaderConfig()
        };
        return axios_1.default(requestOptions);
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