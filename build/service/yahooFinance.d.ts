export declare class YahooFinanceAPI {
    private static instance;
    private static baseURL;
    private static APIKeys;
    static getInstance: () => YahooFinanceAPI;
    private getRandomAPIKey;
    private getHeaderConfig;
    getStockSummaryBySymbol(symbol: string): import("axios").AxiosPromise<any>;
}
