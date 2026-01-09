function Favorites() {
  return (
    <div>
      <h4 className="text-md font-medium flex items-center gap-1">
        <span className="material-symbols-outlined">star</span>
        Favorites
      </h4>
      <ul className="space-y-2 pt-5 text-md">
        <li className="hover:underline cursor-pointer">Bitcoin</li>
        <li className="hover:underline cursor-pointer">Ethereum</li>
        <li className="hover:underline cursor-pointer">Cardano</li>
      </ul>
    </div>
  );
}

export default Favorites;