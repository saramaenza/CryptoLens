import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, BarElement);

function CryptoDetail({ crypto, onToggleFavorite, isFavorite, darkMode }) {
  const [days, setDays] = useState(1);
  const [history, setHistory] = useState([]);
  const [volumeHistory, setVolumeHistory] = useState([]);

  useEffect(() => {
    if (!crypto.id) return;
    // Fetch historical data
    const fetchHistory = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=eur&days=${days}`;
      const res = await fetch(url);
      const data = await res.json();
      setHistory(data.prices || []);
      setVolumeHistory(data.total_volumes || []);
    };
    fetchHistory();
  }, [crypto.id, days]);

  const chartData = {
    labels: history.map(([ts]) => {
      const date = new Date(ts);
      return days === 1
        ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: "Prezzo (EUR)",
        data: history.map(([, price]) => price),
        borderColor: "#fbbf24",
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };

  const tickColor = darkMode ? "#374151" : "#6b7280"; 
  const gridColor = darkMode ? "rgba(55,65,81,0.1)" : "rgba(156,163,175,0.4)";

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { 
        ticks: { 
          color: tickColor,
          maxTicksLimit: 6,
          autoSkip: true 
        },
        grid: {
          color: gridColor,
        }, 
      },
      y: { 
        position: "right",
        ticks: { 
          color: tickColor,
          maxTicksLimit: 4,
          autoSkip: true 
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  const barData = {
    labels: volumeHistory.map(([ts]) => {
      const date = new Date(ts);
      return days === 1
        ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: "Volume (EUR)",
        data: volumeHistory.map(([, vol]) => vol),
        backgroundColor: "#38bdf8",
        borderRadius: 2,
        barPercentage: 0.8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { 
        ticks: { 
          color: tickColor,
          maxTicksLimit: 6,
          autoSkip: true 
        },
        grid: {
          color: gridColor,
        },  
      },
      y: { 
        position: "right",
        ticks: { 
          color: tickColor,
          maxTicksLimit: 4,
          autoSkip: true 
        },
        grid: {
          color: gridColor,
        },  
      },
    },
  };

  return (
    <div className={`${!darkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-400 bg-gray-200 text-gray-900"} p-4 sm:p-6 mb-6 border mt-4 mx-3 lg:mx-0 sm:mx-0 rounded`}>
      
      {Object.keys(crypto).length > 0 ? (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-md mb-0 font-bold flex items-center flex-wrap">
          <img
            src={crypto.image}
            alt={crypto.name}
            className="inline-block w-8 h-8 mr-2"
          />
          <span className="pl-1">{crypto.name}</span>
          <span className="font-normal ml-2">
            ({crypto.symbol ? crypto.symbol.toUpperCase() : "?"})
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(crypto);
            }}
            className={`material-symbols-outlined text-xl pl-3 cursor-pointer ${
              isFavorite ? "text-amber-400" : "text-gray-400"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            star
          </button>
        </h2>
        <div className="flex flex-wrap gap-4 sm:space-x-6 items-center">
          <span className={`${darkMode ? "text-green-600" : "text-green-400"} font-medium tracking-wider`}>
            {crypto.current_price !== undefined && crypto.current_price !== null
              ? `€${crypto.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              : "-"}
          </span>
          <span
            className={`tracking-wider ${
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
          </span>
          <span className="font-medium tracking-wider">
            <span className="text-sm font-normal">Market Cap:</span>{" "}
            {crypto.market_cap !== undefined && crypto.market_cap !== null
              ? `€${crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : "-"}
          </span>
          <span className="font-medium tracking-wider">
            <span className="text-sm font-normal">24h Vol:</span>{" "}
            {crypto.total_volume !== undefined && crypto.total_volume !== null
              ? `€${crypto.total_volume.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              : "-"}
          </span>
        </div>
      </div>
      ) : (
       <h2 className="text-md mb-0 font-bold flex items-center flex-wrap">
          Cryptocurrency Not Found
       </h2>
      )}
      
      {Object.keys(crypto).length > 0 ? (
      <div className="mt-2">
        <div className="rounded p-2 mb-2">
          <Line data={chartData} options={chartOptions} height={60} />
        </div>
        <div className="rounded p-2">
          <Bar data={barData} options={barOptions} height={60} />
        </div>
        <div className="flex space-x-2 mt-2 ml-6">
          <button
            className={`cursor-pointer border text-sm font-medium px-5 rounded transition-colors
              ${!darkMode ? "border-gray-400 hover:bg-gray-600" : "border-gray-400 hover:bg-gray-300"}
              ${days === 1 ? (!darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-900") : (!darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900")}`}
            onClick={() => setDays(1)}
          >
            1D
          </button>
          <button
            className={`cursor-pointer border text-sm font-medium px-5 rounded transition-colors
              ${!darkMode ? "border-gray-400 hover:bg-gray-600" : "border-gray-400 hover:bg-gray-300"}
              ${days === 7 ? (!darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-900") : (!darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900")}`}
            onClick={() => setDays(7)}
          >
            7D
          </button>
          <button
            className={`cursor-pointer border text-sm font-medium px-5 rounded transition-colors
              ${!darkMode ? "border-gray-400 hover:bg-gray-600" : "border-gray-400 hover:bg-gray-300"}
              ${days === 30 ? (!darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-900") : (!darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900")}`}
            onClick={() => setDays(30)}
          >
            1M
          </button>
          <button
            className={`cursor-pointer border text-sm font-medium px-5 rounded transition-colors
              ${!darkMode ? "border-gray-400 hover:bg-gray-600" : "border-gray-400 hover:bg-gray-300"}
              ${days === 365 ? (!darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-900") : (!darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900")}`}
            onClick={() => setDays(365)}
          >
            1Y
          </button>
        </div>
      </div>
      ) : (
      <div className="mt-4 text-sm text-gray-500 h-screen flex items-center justify-center">
        Detailed information about the selected cryptocurrency will appear here.
      </div>
      )}
    </div>
  );
}

CryptoDetail.propTypes = {
  crypto: PropTypes.object.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

CryptoDetail.defaultProps = {
  crypto: {
    name:"Not Found",
    symbol: "?",
    image: "",
  },
  onToggleFavorite: () => {},
  isFavorite: false,
  darkMode: false,
};

export default CryptoDetail;