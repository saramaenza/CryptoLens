import { useState } from "react";

function SearchInput({ allCryptos, onSelectCrypto }) {
  const [query, setQuery] = useState("");
  const filtered = query.length > 0
    ? allCryptos.filter(
        c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative w-1/2 ml-20">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 pl-13 rounded bg-gray-800 text-sm text-gray-400 font-normal focus-visible:outline-none border border-gray-600"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <span className="material-symbols-rounded absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
        search
      </span>
      {query && (
        <ul className="absolute z-10 bg-gray-800 text-white w-full mt-1 rounded shadow max-h-60 overflow-y-auto">
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