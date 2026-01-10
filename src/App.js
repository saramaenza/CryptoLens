import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CryptoList from "./components/CryptoList";
import CryptoDetail from "./components/CryptoDetail";
import Footer from "./components/Footer";

function App() {

  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoList, setCryptoList] = useState([]); // top 5 cryptos displayed
  const [favorites, setFavorites] = useState(() => {
    // Get favorites from localStorage on initial load
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [allCryptos, setAllCryptos] = useState([]); // all 50 cryptos
  const [darkMode, setDarkMode] = useState(false);

  // Fetch 50 crypto on mount 
  // Fetching data from CoinGecko API
  useEffect(() => {
    const fetchCryptos = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false`;
      const res = await fetch(url);
      const data = await res.json();
      setAllCryptos(data);
      setCryptoList(data.slice(0, 5));
    };
    fetchCryptos();

    const interval = setInterval(fetchCryptos, 60000); // update every 60 seconds

    return () => clearInterval(interval); 
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle favorite toggling: add or remove from favorites
  const handleToggleFavorite = (crypto) => {
    setFavorites((prev) =>
      prev.some((c) => c.id === crypto.id)
        ? prev.filter((c) => c.id !== crypto.id)
        : [...prev, crypto]
    );
  };

  return (
  <div className="min-h-screen flex flex-col w-full">
    <Header 
      allCryptos={allCryptos}
      onSelectCrypto={setSelectedCrypto}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
    <div className={`flex flex-col md:flex-row flex-1 ${darkMode ? "bg-gray-100" : "bg-gray-950/95"}`}>
      <Sidebar 
        favorites={favorites}
        onSelectCrypto={setSelectedCrypto}
        darkMode={darkMode}
      />
      <main className="flex-1 px-2 sm:px-6">
        <CryptoList 
          cryptoList={cryptoList}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          darkMode={darkMode}
          onSelectCrypto={setSelectedCrypto}
        />
        <CryptoDetail
          crypto={selectedCrypto || cryptoList[0] || {}}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.some((c) => c.id === (selectedCrypto || cryptoList[0] || {}).id)}
          darkMode={darkMode}
        />
      </main>
    </div>
    <Footer darkMode={darkMode}/>
  </div>
);
}

export default App;