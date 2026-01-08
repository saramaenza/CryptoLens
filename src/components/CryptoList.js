import { useEffect, useState, useRef } from "react";

const coins = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin"},
  { id: "ethereum", symbol: "ETH", name: "Ethereum"},
  { id: "binancecoin", symbol: "BNB", name: "Binance Coin"},
  { id: "solana", symbol: "SOL", name: "Solana"},
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche" },
];

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const intervalRef = useRef();

  // Fetching data from CoinGecko API
  const fetchData = async () => {
    setLoading(true);
    const ids = coins.map((c) => c.id).join(",");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${ids}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    const res = await fetch(url);
    const data = await res.json();
    setCryptos(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, 60000); // aggiorna ogni 60s
    return () => clearInterval(intervalRef.current);
  }, []);

  // Filtro e ordinamento
  const filtered = cryptos
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
              <tr key={crypto.id} className="border-b border-gray-700">
                <td className="py-2 px-4 font-medium">
                    <img src={crypto.image} alt={crypto.name} className="inline-block w-6 h-6 mr-2" />
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
              </tr>
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

export default CryptoList;