import axios, { AxiosAdapter, AxiosRequestConfig } from 'axios';


const baseURL = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2'


export function getStockBySymbol(symbol: string) {
    // 'get-summary?region=US&symbol=AAPL'
    const url = `${baseURL}/get-summary?region=US&symbol=${symbol}`
    const requestOptions: AxiosRequestConfig = {
        method: 'GET',
        url: url,
        headers: {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": "9782c9bf2bmshb4f39a2b5204672p1e1f59jsnb81f4a3c6e34"
        }
    }
    return axios(requestOptions)
}