// We'll keep a key value store of stock information here
//  and store the results in local storage for later use
/// key[symbol]: value[JSON api data]

const stockMapCache = {};
let lastSymbol = null;

function updateLocalStorage(symbol, data) {
  stockMapCache[symbol] = data;
  return stockMapCache[symbol];
}

function getCachedStockData(symbol = null) {
  if (stockMapCache[symbol] !== undefined) {
    return stockMapCache[symbol];
  }
  return;
}

async function getStockBySymbolID(symbol = null) {
  if (symbol === null) {
    return;
  }
  lastSymbol = symbol;
  try {
    const res = await fetch(`/stock/${symbol}`);
    const json = await res.json();
    console.log(json);
    updateLocalStorage(symbol, json);
    console.log();
    // check to see if newer call was made
    //   if so then return null
    if (lastSymbol === symbol) {
      return stockMapCache[symbol];
    }
    return null;
  } catch (error) {
    console.log('Failed to retrieve stock data');
  }
}

export {getStockBySymbolID, getCachedStockData};
