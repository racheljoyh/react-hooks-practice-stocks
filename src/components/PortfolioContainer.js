import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onStockRemove }) {
  const allStocks = stocks.map((stock) => (
    <Stock key={stock.id} stock={stock} onStockClick={onStockRemove} />
  ));
  return (
    <div>
      <h2>My Portfolio</h2>
      {allStocks}
    </div>
  );
}

export default PortfolioContainer;
