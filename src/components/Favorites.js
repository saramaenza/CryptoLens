import { useState } from "react";
import PropTypes from "prop-types";

function Favorites({ favorites, onSelectCrypto, darkMode }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="w-full">
      <h4 className="text-md 2xl:text-lg font-medium flex items-center gap-1">
        <span className={`material-symbols-outlined ${darkMode ? "text-amber-500" : "text-amber-400"}`}>star</span>
        Favorites
      </h4>
      <hr className={`${darkMode ? "border-gray-400" : "border-gray-600"} mt-3`} />
      <ul className="space-y-2 sm:space-y-3 pt-4 sm:pt-5 text-md 2xl:text-lg">
        {favorites.length === 0 && (
          <li className={`${darkMode ? "text-gray-600" : "text-gray-400"} text-sm sm:text-base`}>No favorites added</li>
        )}
        {favorites.map((crypto) => (
          <li
            key={crypto.id}
            className={
              `cursor-pointer flex items-center px-2 py-1 rounded transition-colors text-sm sm:text-base ` +
              (activeId === crypto.id
                ? (darkMode ? "bg-gray-300" : "bg-gray-700")
                : (darkMode ? "hover:bg-gray-300" : "hover:bg-gray-700"))
            }
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
            <span className="pl-1 truncate max-w-28 sm:max-w-none">{crypto.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  onSelectCrypto: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

Favorites.defaultProps = {
  favorites: [],
  onSelectCrypto: () => {},
  darkMode: false,
};

export default Favorites;