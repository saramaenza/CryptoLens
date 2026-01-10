import PropTypes from "prop-types";

function CryptoItem({ crypto, onSelectCrypto, onToggleFavorite, isFavorite, index, darkMode }) {
  const bgColor = index % 2 === 0 ? (darkMode ? "bg-gray-200" : "bg-gray-800") : (darkMode ? "bg-gray-100" : "bg-gray-900");
  return (
    <tr 
      className={`border-t ${bgColor} ${darkMode ? "border-gray-400 text-gray-900" : "border-gray-600 text-white"} cursor-pointer`}
      onClick={() => onSelectCrypto(crypto)}>
      <td className="py-2 px-2 sm:px-4 font-medium pl-2 sm:pl-5">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="inline-block w-6 h-6 mr-2 align-middle"
        />
        <span className="align-middle truncate max-w-28 sm:max-w-none text-md 2xl:text-lg">{crypto.name}</span>
      </td>
      <td className="py-2 px-2 sm:px-4 text-right font-medium tracking-wider text-md 2xl:text-lg">
        {crypto.current_price !== undefined && crypto.current_price !== null
          ? `€${crypto.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
          : "-"}
      </td>
      <td
        className={`py-2 px-2 sm:px-4 text-right tracking-wider text-md 2xl:text-lg ${
          crypto.price_change_percentage_24h > 0
            ? (darkMode ? "text-green-600" : "text-green-400")
            : (darkMode ? "text-red-600" : "text-red-400")
        }`}
      >
        {crypto.price_change_percentage_24h !== undefined && crypto.price_change_percentage_24h !== null
          ? (
              <>
                {crypto.price_change_percentage_24h > 0 ? "▲" : "▼"}{" "}
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2) + "%"}
              </>
            )
          : "-"}
      </td>
      <td className="py-2 px-2 sm:px-4 text-right font-medium tracking-wider text-md 2xl:text-lg">
        {crypto.market_cap !== undefined && crypto.market_cap !== null
          ? `€${crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : "-"}
      </td>
      <td className="py-2 px-2 sm:px-4 text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(crypto);
          }}
          className={`material-symbols-outlined text-lg sm:text-xl cursor-pointer ${
            isFavorite
              ? "text-amber-400"
              : darkMode
                ? "text-gray-400"
                : "text-gray-400"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          star
        </button>
      </td>
    </tr>
  );
}

CryptoItem.propTypes = {
  crypto: PropTypes.object.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

CryptoItem.defaultProps = {
  darkMode: false,
};

export default CryptoItem;