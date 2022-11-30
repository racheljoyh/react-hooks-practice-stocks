import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [type, setType] = useState("Tech");
  const [sortBy, setSortBy] = useState("Alphabetically");

  useEffect(() => {
    fetch(`http://localhost:3001/stocks`)
      .then((r) => r.json())
      .then((stocks) => setStocks(stocks));
  }, []);

  function handleStockToAdd(stockToAdd) {
    const stockInPortfolio = portfolio.find(
      (stock) => stock.id === stockToAdd.id
    );
    if (!stockInPortfolio) {
      setPortfolio([...portfolio, stockToAdd]);
    }
  }

  function handleRemoveStock(stockToRemove) {
    setPortfolio((portfolio) =>
      portfolio.filter((stock) => stock.id !== stockToRemove.id)
    );
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const stockFilter = sortedStocks.filter((stock) => {
    if (type === "Tech") return true;
    return stock.type === type;
  });

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={type}
        onChangeFilter={setType}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer onAddStock={handleStockToAdd} stocks={stockFilter} />
        </div>
        <div className="col-4">
          <PortfolioContainer
            onStockRemove={handleRemoveStock}
            stocks={portfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
