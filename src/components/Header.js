import SearchInput from "./SearchInput";
import DarkModeToggle from "./DarkModeToggle";

function Header({ allCryptos, onSelectCrypto }) {
  return (
    <header className="bg-gray-950/95 p-4 flex items-center font-medium border-b border-gray-600">
      <div className="flex items-center space-x-2">
        <img className="w-9 h-9" src="https://img.icons8.com/avantgarde/100/bank.png" alt="CryptoLens" />
        <span className="text-white">CryptoLens</span>
        <span className="text-gray-400">Dashboard</span>
      </div>
      <SearchInput allCryptos={allCryptos} onSelectCrypto={onSelectCrypto} />
      <div className="ml-auto flex items-center">
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;