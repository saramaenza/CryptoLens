import Favorites from './Favorites';
import PropTypes from "prop-types";

function Sidebar({ favorites, onSelectCrypto, darkMode }) {
  return (
    <aside className="w-full md:w-64 py-4 pl-5 md:py-6 md:pl-4 flex flex-col space-y-4 md:space-y-6">
      <nav className={`flex flex-col ${darkMode ? "bg-gray-200 border-gray-400 text-gray-900" : "bg-gray-800 border-gray-600 text-white"} border space-y-2 md:space-y-4 pt-4 px-3 md:pt-8 md:px-5 rounded h-full`}>
        <Favorites favorites={favorites} onSelectCrypto={onSelectCrypto} darkMode={darkMode} />
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  favorites: PropTypes.array.isRequired,
  onSelectCrypto: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

Sidebar.defaultProps = {
  favorites: [],
  onSelectCrypto: () => {},
  darkMode: false,
};

export default Sidebar;