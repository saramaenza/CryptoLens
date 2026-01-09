import { useState } from "react";

function Favorites({ favorites, onSelectCrypto }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div>
      <h4 className="text-md font-medium flex items-center gap-1">
        <span className="material-symbols-outlined text-amber-400">star</span>
        Favorites
      </h4>
      <hr className="border-gray-600 mt-3"></hr>
      <ul className="space-y-3 pt-5 text-md">
        {favorites.length === 0 && (
          <li className="text-gray-400">No favorites added</li>
        )}
        {favorites.map((crypto) => (
          <li
            key={crypto.id}
            className={`cursor-pointer flex items-center px-2 py-1 rounded transition-colors ${
              activeId === crypto.id ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActiveId(crypto.id);
              onSelectCrypto(crypto);
            }}
          >
            <img
              src={crypto.image}
              alt={crypto.name}
              className="inline-block w-5 h-5 mr-1"
            />
            <span className="pl-1">{crypto.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;