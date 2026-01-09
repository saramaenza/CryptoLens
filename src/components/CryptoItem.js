import PropTypes from "prop-types";

function CryptoItem({ crypto, onSelect, onToggleFavorite, isFavorite, index }) {
  const bgColor = index % 2 === 0 ? "bg-gray-800" : "bg-gray-900";
  return (
    <tr className={`border-t ${bgColor} border-gray-600 cursor-pointer`} onClick={onSelect}>
      <td className="py-2 px-4 font-medium pl-5">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="inline-block w-6 h-6 mr-2"
        />
        {crypto.name}
      </td>
      <td className="py-2 px-4 text-right font-medium tracking-wider">
        {crypto.current_price !== undefined && crypto.current_price !== null
          ? `€${crypto.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
          : "-"}
      </td>
      <td
        className={`py-2 px-4 text-right tracking-wider ${
          crypto.price_change_percentage_24h > 0
            ? "text-green-400"
            : "text-red-400"
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
      <td className="py-2 px-4 text-right font-medium tracking-wider">
        {crypto.market_cap !== undefined && crypto.market_cap !== null
          ? `€${crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
          : "-"}
      </td>
      <td className="py-2 px-4 text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(crypto);
           
          }}
          className={`material-symbols-outlined text-xl cursor-pointer ${
            isFavorite ? "text-amber-400" : "text-gray-400"
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
  crypto: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    current_price: PropTypes.number,
    price_change_percentage_24h: PropTypes.number,
    market_cap: PropTypes.number,
  }).isRequired,
    onSelect: PropTypes.func,
};

CryptoItem.defaultProps = {
  crypto: {
    image: "/default.svg",
    name: "Unknown",
    current_price: 0,
    price_change_percentage_24h: 0,
    market_cap: 0,
  },
  onSelect: () => {},
};

export default CryptoItem;