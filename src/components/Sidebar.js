import Favorites from './Favorites';

function Sidebar({ favorites, onSelectCrypto }) {
  return (
    <aside className="text-white w-64 py-6 px-4 flex flex-col space-y-6">
        <nav className="flex flex-col bg-gray-800 space-y-4 py-8 px-5 rounded h-full">
            <Favorites favorites={favorites} onSelectCrypto={onSelectCrypto} />
        </nav>
    </aside>
  );
}

export default Sidebar;