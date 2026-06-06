import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useSavedColleges } from '../context/SavedContext';

const linkClass = ({ isActive }) =>
  `relative rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
  }`;

const mobileLinkClass = ({ isActive }) =>
  `flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold transition ${
    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
  }`;

function Navbar() {
  const { savedCount } = useSavedColleges();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const savedBadge = savedCount > 0 && (
    <span className="grid min-h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1.5 text-xs font-bold text-white">
      {savedCount}
    </span>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 shadow-sm shadow-slate-200/50 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/25">
            <GraduationCap className="h-5 w-5" />
          </span>
          CollegeFind
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/compare" className={linkClass}>
            Compare
          </NavLink>
          <NavLink to="/saved" className={linkClass}>
            <span className="flex items-center gap-2">
              Saved
              {savedBadge}
            </span>
          </NavLink>
        </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="animate-fade-slide mt-3 rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/70 md:hidden">
            <NavLink to="/" className={mobileLinkClass}>
              Home
            </NavLink>
            <NavLink to="/compare" className={mobileLinkClass}>
              Compare
            </NavLink>
            <NavLink to="/saved" className={mobileLinkClass}>
              <span>Saved</span>
              {savedBadge}
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
