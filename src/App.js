import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CryptoList from "./components/CryptoList";
import CryptoDetail from "./components/CryptoDetail";
import Footer from "./components/Footer";

function App() {

  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoList, setCryptoList] = useState([]);

  return (
    <>
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1 bg-sky-950">
        <Sidebar />
        <main className="flex-1">
          <CryptoList 
            onSelectCrypto={setSelectedCrypto} 
            onCryptoListUpdate={setCryptoList}
          />
          <CryptoDetail
            crypto={selectedCrypto || cryptoList[0] || {}}
          />
        </main>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default App;