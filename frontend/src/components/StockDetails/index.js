import React, {useState, useEffect} from 'react';
import {
  getStockBySymbolID,
  getCachedStockData,
  subscribeToStockSymbol,
  unsubscribeToStockSymbol,
} from '../../api/';

import './index.scss';

export default function StockDetails({stockSymbol}) {
  const [stockDetails, setStockDetails] = useState(null);
  const [sockTime, setSockTime] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    if (stockSymbol) {
      unsubscribeToSymbol();
      getCachedDetails();
      getStockDetails();
      subscribeToSymbol();
    }

    return unsubscribeToSymbol;
  }, [stockSymbol]);

  function subscribeToSymbol() {
    subscribeToStockSymbol(stockSymbol, setStockDetails);
  }

  function unsubscribeToSymbol() {
    unsubscribeToStockSymbol(stockSymbol, setStockDetails);
  }
  // lets retrieve the cached version of the stock data if available
  function getCachedDetails() {
    const stockData = getCachedStockData(stockSymbol);
    // if no cached data exists or stock symbol matches current stock
    //  then update page
    // this data will populate the page while new request is made
    if (stockData === null) {
      setStockDetails(stockData);
      return;
    }

    if (stockSymbol === stockData.symbol) {
      setStockDetails(stockData);
      return;
    }
  }

  async function getStockDetails() {
    const stockData = await getStockBySymbolID(stockSymbol);
    if (stockData !== null && stockSymbol === stockData.symbol) {
      setStockDetails(stockData);
    }
  }

  // before user selection
  if (!stockSymbol) {
    return <div className="stock-detail-container">No Stock Selected</div>;
  }

  // after user selection but first stock not loaded
  if (stockSymbol && stockDetails === null) {
    return <div className="stock-detail-container">Loading...</div>;
  }

  function getCurrencySymbol() {
    return stockDetails.price.currencySymbol || '$';
  }
  return (
    <div className="stock-detail-container">
      <div>{stockSymbol}</div>
      <div>
        Current Price {getCurrencySymbol()}
        {stockDetails.financialData.currentPrice.fmt}
      </div>

      <div>{stockDetails.price.regularMarketChange.fmt}</div>

      <div>{stockDetails.financialData.recommendationKey}</div>
      <div>{stockDetails.summaryProfile.industry}</div>
      <div>{stockDetails.summaryProfile.website}</div>

      <div>{sockTime}</div>
    </div>
  );
}
