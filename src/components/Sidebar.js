import Favorites from './Favorites';

function Sidebar() {
  return (
    <aside className="bg-sky-950 text-white w-50 py-6 px-3 flex flex-col space-y-6">
        <nav className="flex flex-col space-y-4 p-8 rounded border border-gray-400 h-full">
            <Favorites />
        </nav>
    </aside>
  );
}

export default Sidebar;