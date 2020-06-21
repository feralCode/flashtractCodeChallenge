"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCache = void 0;
class StockCache {
    constructor() {
        this.cacheMap = {};
        // using arrow functions as class is singleton
        //  no performance decrease
        this.getStockBySymbol = (stockSymbol) => {
            if (this.cacheMap[stockSymbol] !== undefined) {
                return this.cacheMap[stockSymbol];
            }
            return null;
        };
        this.setStockBySymbol = (stockSymbol, data) => {
            this.cacheMap[stockSymbol] = data;
            console.log(this.cacheMap);
            return;
        };
    }
}
exports.StockCache = StockCache;
StockCache.getInstance = () => {
    if (!StockCache.instance) {
        StockCache.instance = new StockCache();
    }
    return StockCache.instance;
};
//# sourceMappingURL=StockPriceCache.js.map