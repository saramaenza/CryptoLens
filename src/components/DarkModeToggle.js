import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [lightMode]);

  return (
    <button
      onClick={() => setLightMode(!lightMode)}
      className={`w-16 h-8 flex cursor-pointer items-center rounded p-2 transition-colors border border-gray-600 duration-300 focus:outline-none ${
        lightMode
          ? "bg-amber-400"
          : "bg-gray-800"
      }`}
      aria-label="Toggle dark mode"
    >
      <span
        className={`w-4 h-4 flex items-center justify-center transform transition-transform duration-300 ${
          lightMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        <span className="material-symbols-rounded text-gray-400">
          {lightMode ? "sunny" : "bedtime"}
        </span>
      </span>
    </button>
  );
}

export default DarkModeToggle;