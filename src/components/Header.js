import SearchInput from "./SearchInput";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  return (
    <header className="bg-sky-950 p-4 flex font-medium border-b border-gray-400">
        {/*TODO: Logo Section */}
        <div className="flex items-center space-x-2">
            <span className="text-white">CryptoLens</span>
            <span className="text-gray-400">Dashboard</span>
        </div>
        <SearchInput />
        <div className="ml-auto">
            <DarkModeToggle />
        </div>
    </header>
  );
}

export default Header;