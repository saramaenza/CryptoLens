function SearchInput() {
  return (
    <div className="relative w-1/2 ml-20">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-1.5 pl-13 rounded bg-gray-400 text-sm text-white/80 font-normal"
      />
      <span className="material-symbols-rounded absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80 text-sm">
        search
      </span>
    </div>
  );
}

export default SearchInput;