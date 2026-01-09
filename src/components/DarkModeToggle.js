function DarkModeToggle({ darkMode, setDarkMode }) {

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`w-15 h-8 sm:w-16 sm:h-8 flex cursor-pointer items-center rounded p-3 sm:p-2 md:p-1 transition-colors border duration-300 focus:outline-none ${
        darkMode
          ? "bg-gray-200 border-gray-400 hover:bg-gray-300"
          : "bg-gray-800 border-gray-600 hover:bg-gray-700"
      }`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`w-4 h-4 sm:w-3 sm:h-3 flex items-center justify-center transform transition-transform duration-300 ${
          darkMode ? "translate-x-5 sm:translate-x-7" : "translate-x-0"
        }`}
      >
        <span className="material-symbols-rounded text-gray-400 text-base sm:text-sm">
          {darkMode ? "sunny" : "bedtime"}
        </span>
      </span>
    </button>
  );
}

export default DarkModeToggle;