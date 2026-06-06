import { NavLink } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useSavedColleges } from '../context/SavedContext';

const linkClass = ({ isActive }) =>
  `relative rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
  }`;

function Navbar() {
  const { savedCount } = useSavedColleges();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-indigo-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          CollegeFind
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/compare" className={linkClass}>
            Compare
          </NavLink>
          <NavLink to="/saved" className={linkClass}>
            <span className="flex items-center gap-2">
              Saved
              {savedCount > 0 && (
                <span className="grid min-h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1.5 text-xs font-bold text-white">
                  {savedCount}
                </span>
              )}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
