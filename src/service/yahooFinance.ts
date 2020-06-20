import axios, { AxiosRequestConfig } from 'axios';



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

    static getInstance = () => {
        if (!YahooFinanceAPI.instance) {
            YahooFinanceAPI.instance = new YahooFinanceAPI();
        }

        return YahooFinanceAPI.instance;
    }

    // we will cycle through multiple api keys to increase rate limit and daily limits
    private getRandomAPIKey(): string {
        const { APIKeys } = YahooFinanceAPI
        return APIKeys[Math.floor(Math.random() * APIKeys.length)];
    }

    private getHeaderConfig() {
        const headerConfig = {
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "x-rapidapi-key": this.getRandomAPIKey()
        }
        return headerConfig
    }

    public getStockSummaryBySymbol(symbol: string) {
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