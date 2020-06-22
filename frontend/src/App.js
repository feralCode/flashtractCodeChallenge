import React, {useState, useEffect} from 'react';
import {WatchList, StockDetails} from './components/';
import {getStockBySymbolID} from './api';
import './App.scss';

const mockWatchList = [
  {
    name: 'Apple Computers',
    symbol: 'AAPL',
    dateCreated: new Date().toISOString(),
  },
  {
    name: 'Hawaiian Holdings',
    symbol: 'HA',
    dateCreated: new Date().toISOString(),
  },
  {
    name: 'Tesla',
    symbol: 'TSLA',
    dateCreated: new Date().toISOString(),
  },
];

function App() {
  const [watchList, setWatchList] = useState(mockWatchList);
  const [activeStockSymbol, setActiveStockSymbol] = useState(null);

  async function addToWatchList(symbol) {
    let stockData = null;
    console.log('addToWatchList - symbol', symbol);
    try {
      stockData = await getStockBySymbolID(symbol);
    } catch (error) {
      console.error('failed to retrieve stock information');
    }
    if (stockData === null) {
      return;
    }

    const newWatchStock = {
      name: stockData.quoteType.longName,
      symbol,
      dateCreated: new Date().toISOString(),
    };

    const newWatchList = [newWatchStock, ...watchList];
    setWatchList(newWatchList);
  }

  function removeFromWatchListBySymbol(symbol) {
    const newWatchList = {...watchList};

    // let's get the index of the stock that matches the symbol passed in
    let indexToRemove;
    for (let i = 0; i < newWatchList.length; i++) {
      if (newWatchList[i].symbol === symbol) {
        indexToRemove = i;
      }
    }
    // remove item
    newWatchList.splice(indexToRemove, 1);

    setWatchList(newWatchList);
  }

  return (
    <React.Fragment>
      <div>STONKS</div>
      <div className="main">
        <WatchList
          watchList={watchList}
          activeStockSymbol={activeStockSymbol}
          setActiveStockSymbol={setActiveStockSymbol}
          addToWatchList={addToWatchList}
          removeFromWatchListBySymbol={removeFromWatchListBySymbol}
        />
        <StockDetails stockSymbol={activeStockSymbol} />
      </div>
    </React.Fragment>
  );
}

export default App;
