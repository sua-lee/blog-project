import { NavBar } from './Navbar';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function HeaderMember() {
  return (
    <div className="flex justify-between items-center px-3 mt-2 fixed top-0 w-5/6">
      <div className="w-1/5 flex justify-center p-3 gap-3 items-center">
        <NavLink to="/" end>
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        </NavLink>
        <NavLink to="/" end className="flex-1 text-left font-bold">
          Wave Blog
        </NavLink>
      </div>
      <SearchBar />
      <NavBar />
    </div>
  );
}
