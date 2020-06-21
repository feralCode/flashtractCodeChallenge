import React, {useState, useEffect} from 'react';
import {getStockBySymbolID, getCachedStockData} from '../../api/';

import './index.scss';

export default function StockDetails({stockSymbol}) {
  const [stockDetails, setStockDetails] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    if (stockSymbol) {
      getCachedDetails();
      getStockDetails();
    }
  }, [stockSymbol]);

  // lets retrieve the cached version of the stock data if available
  function getCachedDetails() {
    const stockData = getCachedStockData(stockSymbol);
    // if no data found do nothing
    if (stockData === undefined) {
      return;
    }

    if (stockSymbol === stockData.symbol) {
      setStockDetails(stockData);
    }
  }

  async function getStockDetails() {
    const stockData = await getStockBySymbolID(stockSymbol);
    if (stockData !== null && stockSymbol === stockData.symbol) {
      setStockDetails(stockData);
    }
  }

  if (!stockSymbol) {
    return <div>No Stock Selected</div>;
  }

  if (stockSymbol && stockDetails === null) {
    return <div>Loading...</div>;
  }

  function getCurrencySymbol() {
    return stockDetails.price.currencySymbol || '$';
  }
  return (
    <div>
      <div>{stockSymbol}</div>
      <div>
        Current Price {getCurrencySymbol()}
        {stockDetails.financialData.currentPrice.fmt}
      </div>

      <div>{stockDetails.price.regularMarketChange.fmt}</div>

      <div>{stockDetails.financialData.recommendationKey}</div>
      <div>{stockDetails.summaryProfile.industry}</div>
      <div>{stockDetails.summaryProfile.website}</div>
    </div>
  );
}
