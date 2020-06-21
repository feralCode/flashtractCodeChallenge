class StockCache {
  private static instance: StockCache;
  public cacheMap: { [key: string]: Object } = {
  }

  static getInstance = () => {
    if (!StockCache.instance) {
      StockCache.instance = new StockCache();
    }

    return StockCache.instance;
  }
  // using arrow functions as class is singleton
  //  no performance decrease
  getStockBySymbol = (stockSymbol: string) => {
    if (this.cacheMap[stockSymbol] !== undefined) {
      return this.cacheMap[stockSymbol]
    }
    return null
  }

  setStockBySymbol = (stockSymbol: string, data: {}) => {
    this.cacheMap[stockSymbol] = data
    console.log(this.cacheMap)
    return
  }
}


export { StockCache }