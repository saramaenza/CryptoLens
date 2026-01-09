import Favorites from './Favorites';

function Sidebar({ favorites, onSelectCrypto, darkMode }) {
  return (
    <aside className="text-white w-64 py-6 px-4 flex flex-col space-y-6">
        <nav className={`flex flex-col ${darkMode ? "bg-gray-200 border-gray-400 text-gray-900" : "bg-gray-800 border-gray-600  text-white"} border space-y-4 py-8 px-5 rounded h-full`}>
            <Favorites favorites={favorites} onSelectCrypto={onSelectCrypto} darkMode={darkMode} />
        </nav>
    </aside>
  );
}

export default Sidebar;