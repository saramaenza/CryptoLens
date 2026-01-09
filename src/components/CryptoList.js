import { useState } from "react";
import CryptoItem from "./CryptoItem";
import PropTypes from "prop-types";


function CryptoList({ onSelectCrypto, cryptoList, onToggleFavorite, favorites }) {
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  // Sorting
  const filtered = cryptoList
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") {
        cmp = a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        cmp = a.current_price - b.current_price;
      } else if (sortBy === "change") {
        cmp = a.price_change_percentage_24h - b.price_change_percentage_24h;
      } else if (sortBy === "market_cap") {
        cmp = a.market_cap - b.market_cap;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

  if (loading)
    return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 border border-gray-400 mt-6 mx-3 rounded bg-sky-950">
      <h2 className="text-md font-medium mb-4 text-white">Cryptocurrency <span className="font-bold">Market</span></h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
            <thead>
                <tr className="text-xs font-light text-gray-400">
                    <th
                    className="py-2 px-4 text-left cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("name");
                        setSortDir(sortBy === "name" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    Coin {sortBy === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th
                    className="py-2 px-4 text-right cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("price");
                        setSortDir(sortBy === "price" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    Price (EUR) {sortBy === "price" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th
                    className="py-2 px-4 text-right cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("change");
                        setSortDir(sortBy === "change" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    24h Change {sortBy === "change" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th
                    className="py-2 px-4 text-right cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("market_cap");
                        setSortDir(sortBy === "market_cap" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    Market Cap {sortBy === "market_cap" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                </tr>
            </thead>
            <tbody className="text-white">
            {filtered.map((crypto) => (
                <CryptoItem 
                    key={crypto.id} 
                    crypto={crypto} 
                    onSelect={() => onSelectCrypto(crypto)}
                />
            ))}
            </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-gray-400 p-4">Nessuna crypto trovata.</div>
        )}
      </div>
    </div>
  );
}

CryptoList.defaultProps = {
  onSelectCrypto: () => {},
};

CryptoList.propTypes = {
  onSelectCrypto: PropTypes.func,
};

export default CryptoList;