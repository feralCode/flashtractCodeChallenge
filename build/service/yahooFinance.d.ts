export declare class YahooFinanceAPI {
    private static instance;
    private static baseURL;
    private static APIKeys;
    userWatchListSymbols: string[];
    private stockCache;
    private subscribers;
    constructor();
    static getInstance: () => YahooFinanceAPI;
    addSubscriber: (cb: Function) => void;
    getAllWatchedSymbolsLoop: (index?: number) => Promise<void>;
    addSymbolToWatchList: (stockSymbol: string) => void;
    getRandomAPIKey: () => string;
    getHeaderConfig: () => {
        "x-rapidapi-host": string;
        "x-rapidapi-key": string;
    };
    getStockSummaryBySymbol: (symbol: string) => Promise<import("axios").AxiosResponse<any>>;
}
