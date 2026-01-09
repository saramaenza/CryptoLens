import SearchInput from "./SearchInput";
import DarkModeToggle from "./DarkModeToggle";

function Header({ allCryptos, onSelectCrypto, darkMode, setDarkMode }) {

  return (
    <header className={`${!darkMode ? "bg-gray-950/95 border-gray-600" : "bg-gray-100 border-gray-400"} p-4 flex items-center font-medium border-b`}>
      <div className="flex items-center space-x-2">
        <img className="w-9 h-9" src="https://img.icons8.com/avantgarde/100/bank.png" alt="CryptoLens" />
        <span className={`${!darkMode ? "text-white" : "text-gray-900"}`}>CryptoLens</span>
        <span className={`${!darkMode ? "text-gray-400" : "text-gray-600"}`}>Dashboard</span>
      </div>
      <SearchInput allCryptos={allCryptos} onSelectCrypto={onSelectCrypto} darkMode={darkMode} />
      <div className="ml-auto flex items-center">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
}

export default Header;