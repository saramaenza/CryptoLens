import { useState } from "react";

function SearchInput({ allCryptos, onSelectCrypto, darkMode }) {
  const [query, setQuery] = useState("");
  const filtered = query.length > 0
    ? allCryptos.filter(
        c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase())
      )
    : [];

   return (
    <div className="relative w-full sm:w-80 md:w-96 lg:w-md mx-0 sm:mx-4 sm:ml-10">
      <input
        type="text"
        placeholder="Search..."
        className={`w-full p-2 pl-13 rounded text-sm font-normal focus-visible:outline-none border ${
          darkMode
            ? "bg-gray-200 text-gray-900 border-gray-400"
            : "bg-gray-800 text-gray-400 border-gray-600"
        }`}
        value={query}
        onChange={e => setQuery(e.target.value)} 
      />
      <span className={`material-symbols-rounded absolute left-3 top-1/2 transform -translate-y-1/2 text-sm ${
        darkMode ? "text-gray-600" : "text-gray-400"}`}> 
        search
      </span>
      {query && (
        <ul className={`absolute z-10 ${darkMode ? "bg-gray-200 text-gray-900" : "bg-gray-800 text-white"} w-full mt-1 rounded shadow max-h-60 overflow-y-auto`}>
          {filtered.length === 0 && (
            <li className="p-2 text-gray-400">No results</li>
          )}
          {filtered.map(crypto => (
            <li
              key={crypto.id}
              className="p-2 hover:bg-gray-900 cursor-pointer"
              onClick={() => {
                onSelectCrypto(crypto)
                setQuery("");
              }}
            >
              <img src={crypto.image} alt={crypto.name} className="inline w-5 h-5 mr-2" />
              {crypto.name} <span className="text-xs text-gray-500">({crypto.symbol.toUpperCase()})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;