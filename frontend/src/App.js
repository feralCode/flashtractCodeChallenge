import React, {useState, useEffect} from 'react';
import {WatchList, StockDetails} from './components/';
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
  return (
    <React.Fragment>
      <div>STONKS</div>
      <div className="main">
        <WatchList
          watchList={watchList}
          activeStockSymbol={activeStockSymbol}
          setActiveStockSymbol={setActiveStockSymbol}
        />
        <StockDetails stockSymbol={activeStockSymbol} />
      </div>
    </React.Fragment>
  );
}

export default App;
