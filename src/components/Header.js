import SearchInput from "./SearchInput";
import DarkModeToggle from "./DarkModeToggle";
import PropTypes from "prop-types";

function Header({ allCryptos, onSelectCrypto, darkMode, setDarkMode }) {
  return (
    <header className={`${!darkMode ? "bg-gray-950/95 border-gray-600" : "bg-gray-100 border-gray-400"} w-full p-4 flex flex-col sm:flex-row items-center font-medium border-b gap-4 sm:gap-0`}>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start">
        <img className="w-9 h-9" src="https://img.icons8.com/avantgarde/100/bank.png" alt="CryptoLens" />
        <span className={`${!darkMode ? "text-white" : "text-gray-900"} text-lg 2xl:text-xl`}>CryptoLens</span>
        <span className={`${!darkMode ? "text-gray-400" : "text-gray-600"} hidden sm:inline text-lg 2xl:text-xl`}>Dashboard</span>
      </div>
      <div className="w-full sm:w-auto flex-1 flex justify-center">
        <SearchInput allCryptos={allCryptos} onSelectCrypto={onSelectCrypto} darkMode={darkMode} />
      </div>
      <div className="ml-0 sm:ml-auto flex items-center justify-center w-full sm:w-auto mr-3">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </header>
  );
}

Header.propTypes = {
  allCryptos: PropTypes.array.isRequired,
  onSelectCrypto: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

Header.defaultProps = {
  allCryptos: [],
  onSelectCrypto: () => {},
  darkMode: false,
  setDarkMode: () => {},
};

export default Header;