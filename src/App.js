import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CryptoList from "./components/CryptoList";
import CryptoDetail from "./components/CryptoDetail";
import Footer from "./components/Footer";

function App() {

  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoList, setCryptoList] = useState([]); // top 5 cryptos displayed
  const [favorites, setFavorites] = useState([]);
  const [allCryptos, setAllCryptos] = useState([]); // all 50 cryptos

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

  console.log("cryptoList", cryptoList);

  // Handle favorite toggling: add or remove from favorites
  const handleToggleFavorite = (crypto) => {
    setFavorites((prev) =>
      prev.some((c) => c.id === crypto.id)
        ? prev.filter((c) => c.id !== crypto.id)
        : [...prev, crypto]
    );
  };

  return (
    <>
    <div className="flex flex-col">
      <Header 
        allCryptos={allCryptos}
        onSelectCrypto={setSelectedCrypto}
      />
      <div className="flex flex-1 bg-gray-950/95">
        <Sidebar 
          favorites={favorites}
          onSelectCrypto={setSelectedCrypto}
        />
        <main className="flex-1">
          <CryptoList 
            onSelectCrypto={setSelectedCrypto} 
            cryptoList={cryptoList}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
          <CryptoDetail
            crypto={selectedCrypto || cryptoList[0] || {}}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.some((c) => c.id === (selectedCrypto || cryptoList[0] || {}).id)}
          />
        </main>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default App;