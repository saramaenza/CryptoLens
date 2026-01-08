import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CryptoList from "./components/CryptoList";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-sky-950">
        <Sidebar />
        <main className="flex-1">
          <CryptoList />
        </main>
      </div>
    </div>
  );
}

export default App;