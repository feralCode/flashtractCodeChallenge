import React, {useState} from 'react';
import AddStock from '../AddStock/';
import './index.scss';

// WatchList Definition
// interface WatchListEntry {
//     name: String,
//     symbol: String,
//     added: String (ISO 8601 date)
// }

export default function WatchList({
  watchList,
  setActiveStockSymbol,
  activeStockSymbol,
  addToWatchList,
}) {
  // useEffect(() => {
  //   setWatchList(mockWatchList);
  // }, []);

  const [addStockActive, setAddStockActive] = useState(false);

  return (
    <div className="watch-list-container">
      <div className="header">My Watchlist</div>
      {watchList.map((item, index) => {
        return (
          <div
            key={`watch-list-item-${index}`}
            className={
              activeStockSymbol === item.symbol
                ? 'watch-list-item active'
                : 'watch-list-item'
            }
            onClick={() => setActiveStockSymbol(item.symbol)}
          >
            <div className="name-container">
              <div className="symbol">{item.symbol}</div>
              <div className="name">{item.name}</div>
            </div>
          </div>
        );
      })}
      <div className="watch-list-item add-button  ">
        {addStockActive === true ? (
          <AddStock
            setAddStockActive={setAddStockActive}
            addToWatchList={addToWatchList}
          />
        ) : (
          <div onClick={() => setAddStockActive(true)}>
            <span className="material-icons">add_circle_outline</span>Add Symbol
          </div>
        )}
      </div>
    </div>
  );
}
