import PropTypes from "prop-types";

function DarkModeToggle({ darkMode, setDarkMode }) {

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`w-16 h-8 flex cursor-pointer items-center rounded p-2 transition-colors border duration-300 focus:outline-none ${
        darkMode
          ? "bg-gray-200 border-gray-400 hover:bg-gray-300"
          : "bg-gray-800 border-gray-600 hover:bg-gray-700"
      }`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`w-4 h-4 flex items-center justify-center transform transition-transform duration-300 ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        <span className="material-symbols-rounded text-gray-400">
          {darkMode ? "sunny" : "bedtime"}
        </span>
      </span>
    </button>
  );
}

DarkModeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

DarkModeToggle.defaultProps = {
  darkMode: false,
  setDarkMode: () => {},
};

export default DarkModeToggle;