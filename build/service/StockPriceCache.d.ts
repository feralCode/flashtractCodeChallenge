declare class StockCache {
    private static instance;
    cacheMap: {
        [key: string]: Object;
    };
    static getInstance: () => StockCache;
    getStockBySymbol: (stockSymbol: string) => Object | null;
    setStockBySymbol: (stockSymbol: string, data: {}) => void;
}
export { StockCache };
