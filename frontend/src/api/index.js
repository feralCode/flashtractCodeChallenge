import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

// We'll keep a key value store of stock information here
//  and store the results in local storage for later use
/// key[symbol]: value[JSON api data]
const localStorageStr = localStorage.getItem('stockMapCache');
const stockMapCache = JSON.parse(localStorageStr) || {};
let lastSymbol = null;

function updateLocalStorage(symbol, data) {
  console.log('updateLocalStorage', symbol);
  console.log('updateLocalStorage', data);
  stockMapCache[symbol] = data;
  // store data locally for cache
  localStorage.setItem('stockMapCache', JSON.stringify(stockMapCache));
  return stockMapCache[symbol];
}

function getCachedStockData(symbol = null) {
  if (stockMapCache[symbol] !== undefined) {
    return stockMapCache[symbol];
  }
  return null;
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
  } catch (error) {
    console.log('Failed to retrieve stock data');
  }
  return null;
}

function subscribeToStockSymbol(stockSymbol, cb) {
  socket.on(stockSymbol, data => {
    updateLocalStorage(stockSymbol, data);
    cb(data);
  });
  socket.emit('stockUpdate', stockSymbol);
}

function unsubscribeToStockSymbol(stockSymbol) {
  socket.removeAllListeners(stockSymbol);
}

export {
  getStockBySymbolID,
  getCachedStockData,
  subscribeToTimer,
  subscribeToStockSymbol,
  unsubscribeToStockSymbol,
};
