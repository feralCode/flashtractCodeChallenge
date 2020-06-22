import React, {useState} from 'react';

export default function AddStock({setAddStockActive, addToWatchList}) {
  const [state, setState] = useState({
    stockSymbol: '',
    loading: false,
  });

  function updateStockSymbol(stockSymbol) {
    console.log('updateStockSymbol - stockSymbol', stockSymbol);
    const newState = {...state, stockSymbol};

    console.log(newState);
    setState(newState);
  }

  function onSubmit(e) {
    e.preventDefault();
    const newSymbol = state.stockSymbol;
    addToWatchList(newSymbol);

    //  we make the AddStock component not active
    setAddStockActive(false);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={e => updateStockSymbol(e.target.value)}
          placeholder="Enter Stock Symbol To Follow"
          value={state.stockSymbol}
        />

        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
