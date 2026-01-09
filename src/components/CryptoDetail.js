import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
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

function CryptoDetail({ crypto, onToggleFavorite, isFavorite }) {
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { 
        ticks: { 
            color: "#d1d5db",
            maxTicksLimit: 6,
            autoSkip: true 
        },
        grid: {
            color: "rgba(156,163,175,0.4)",
        }, 
      },
      y: { 
        position: "right",
        ticks: { 
            color: "#d1d5db",
            maxTicksLimit: 4,
            autoSkip: true 
        },
        grid: {
            color: "rgba(156,163,175,0.4)",
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
            color: "#d1d5db",
            maxTicksLimit: 6,
            autoSkip: true 
        },
        grid: {
            color: "rgba(156,163,175,0.4)",
        },  
      },
      y: { 
        position: "right",
        ticks: { 
            color: "#d1d5db",
            maxTicksLimit: 4,
            autoSkip: true 
        },
        grid: {
            color: "rgba(156,163,175,0.4)",
        },  
      },
    },
  };

  return (
    <div className="p-6 mb-6 border border-gray-400 mt-4 mx-3 rounded bg-sky-950 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-md mb-0 font-bold flex items-center">
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
        <div className="flex space-x-6 items-center">
          <span className="font-medium tracking-wider text-green-400">
            {crypto.current_price !== undefined && crypto.current_price !== null
              ? `€${crypto.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              : "-"}
          </span>
          <span
            className={`tracking-wider ${
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

      {/* Charts */}
      <div className="mt-2">
        <div className="rounded p-2 mb-2">
          <Line data={chartData} options={chartOptions} height={60} />
        </div>
        <div className="rounded p-2">
          <Bar data={barData} options={barOptions} height={60} />
        </div>
        <div className="flex space-x-2 mt-2 ml-6">
          <button
            className={`cursor-pointer border border-gray-400 text-sm py-1 font-medium px-5 rounded ${days === 1 ? "bg-blue-950" : "bg-gray-800 text-white"}`}
            onClick={() => setDays(1)}
          >
            1D
          </button>
          <button
            className={`cursor-pointer border border-gray-400 text-sm py-1 font-medium px-5 rounded ${days === 7 ? "bg-blue-950" : "bg-gray-800 text-white"}`}
            onClick={() => setDays(7)}
          >
            7D
          </button>
          <button
            className={`cursor-pointer border border-gray-400 text-sm py-1 font-medium px-5 rounded ${days === 30 ? "bg-blue-950" : "bg-gray-800 text-white"}`}
            onClick={() => setDays(30)}
          >
            1M
          </button>
          <button
            className={`cursor-pointer border border-gray-400 text-sm py-1 font-medium px-5 rounded ${days === 365 ? "bg-blue-950" : "bg-gray-800 text-white"}`}
            onClick={() => setDays(365)}
          >
            1Y
          </button>
        </div>
      </div>
    </div>
  );
}

export default CryptoDetail;