import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="right-0 flex justify-center items-center w-1/3 p-3 gap-3">
      <NavLink to="/" end className="flex-1 text-center">
        Main
      </NavLink>
      <NavLink to="/about" end className="flex-1 text-center">
        About
      </NavLink>
      <NavLink to="/login" end className="flex-1 text-center">
        Log In
      </NavLink>
    </nav>
  );
}
