import { useState } from "react";
import CryptoItem from "./CryptoItem";
import PropTypes from "prop-types";

function CryptoList({ cryptoList, onToggleFavorite, favorites, darkMode }) {
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

  return (
    <div className={`${darkMode ? "border-gray-400 bg-gray-100" : "border-gray-600 bg-gray-950/95"} border mt-4 lg:mt-6 mx-3 lg:mx-0 sm:mx-0 rounded`}>
      <div className={`${darkMode ? "bg-gray-200" : "bg-gray-800"} py-3 px-3 sm:px-6`}>
        <h2 className={`${darkMode ? "text-gray-900" : "text-white"} text-md 2xl:text-lg font-medium`}>Cryptocurrency <span className="font-bold">Market</span></h2>
      </div>

      <div className="overflow-x-auto">
        <table className={`${darkMode ? "min-w-full bg-gray-200" : "min-w-full bg-gray-900"} text-xs sm:text-sm`}>
            <thead className={`${darkMode ? "bg-gray-200" : "bg-gray-900"}`}>
                <tr className={`${darkMode ? "text-xs font-light text-gray-600 border-t border-gray-400" : "text-xs font-light text-gray-400 border-t border-gray-600"}`}>
                    <th
                    className="py-2 sm:py-3 px-2 sm:px-4 pl-3 sm:pl-5 text-left cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("name");
                        setSortDir(sortBy === "name" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    Coin {sortBy === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th
                    className="py-2 sm:py-3 px-2 sm:px-4 text-right cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("price");
                        setSortDir(sortBy === "price" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    Price (EUR) {sortBy === "price" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th
                    className="py-2 sm:py-3 px-2 sm:px-4 text-right cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("change");
                        setSortDir(sortBy === "change" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    24h Change {sortBy === "change" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                    <th
                    className="py-2 sm:py-3 px-2 sm:px-4 text-right cursor-pointer select-none"
                    onClick={() => {
                        setSortBy("market_cap");
                        setSortDir(sortBy === "market_cap" && sortDir === "asc" ? "desc" : "asc");
                    }}
                    >
                    Market Cap {sortBy === "market_cap" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                    </th>
                </tr>
            </thead>
            <tbody className="text-white ">
            {filtered.map((crypto, idx) => (
                <CryptoItem 
                    key={crypto.id} 
                    crypto={crypto} 
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.some((c) => c.id === crypto.id)}
                    index={idx}
                    darkMode={darkMode}
                />
            ))}
            </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="bg-gray-800 text-gray-400 border-t border-gray-600 py-2 px-4 text-sm">No cryptocurrencies found.</div>
        )}
      </div>
    </div>
  );
}

CryptoList.propTypes = {
  cryptoList: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

CryptoList.defaultProps = {
  cryptoList: [],
  favorites: [],
  onToggleFavorite: () => {},
  darkMode: false,
};

export default CryptoList;