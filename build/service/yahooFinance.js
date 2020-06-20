"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockBySymbol = void 0;
const axios_1 = __importDefault(require("axios"));
const baseURL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2';
function getStockBySymbol(symbol) {
    // 'get-summary?region=US&symbol=AAPL'
    const url = `${baseURL}/get-summary?region=US&symbol=${symbol}`;
    const requestOptions = {
        method: 'GET',
        url: url,
        headers: {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "9782c9bf2bmshb4f39a2b5204672p1e1f59jsnb81f4a3c6e34"
        }
    };
    return axios_1.default(requestOptions);
}
exports.getStockBySymbol = getStockBySymbol;
//# sourceMappingURL=yahooFinance.js.map