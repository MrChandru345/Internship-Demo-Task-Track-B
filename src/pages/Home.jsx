import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import collegesData from '../data/colleges.json';
import CollegeCard from '../components/CollegeCard';
import FilterBar from '../components/FilterBar';
import campusHero from '../assets/campus-hero.png';

const colleges = collegesData.colleges;

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function sortColleges(list, sortBy) {
  const sorted = [...list];

  if (sortBy === 'fees-asc') {
    return sorted.sort((a, b) => a.annualFees - b.annualFees);
  }

  if (sortBy === 'fees-desc') {
    return sorted.sort((a, b) => b.annualFees - a.annualFees);
  }

  return sorted.sort((a, b) => b.rating - a.rating);
}

function SkeletonGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-[28rem] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="shimmer -mx-4 -mt-4 mb-5 h-36 rounded-t-xl bg-slate-200" />
          <div className="flex gap-4">
            <div className="shimmer h-16 w-16 rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="shimmer h-4 rounded bg-slate-200" />
              <div className="shimmer h-4 w-2/3 rounded bg-slate-200" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="shimmer h-20 rounded-lg bg-slate-100" />
            <div className="shimmer h-20 rounded-lg bg-slate-100" />
          </div>
          <div className="shimmer mt-8 h-10 rounded-md bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', state: '', type: '', tag: '' });
  const [sortBy, setSortBy] = useState('rating-desc');
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timeout);
  }, []);

  const states = useMemo(() => uniqueSorted(colleges.map((college) => college.state)), []);
  const types = useMemo(() => uniqueSorted(colleges.map((college) => college.type)), []);
  const tags = useMemo(() => uniqueSorted(colleges.flatMap((college) => college.tags)), []);

  const filteredColleges = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();
    const filtered = colleges.filter((college) => {
      const matchesSearch = college.name.toLowerCase().includes(normalizedSearch);
      const matchesState = filters.state ? college.state === filters.state : true;
      const matchesType = filters.type ? college.type === filters.type : true;
      const matchesTag = filters.tag ? college.tags.includes(filters.tag) : true;

      return matchesSearch && matchesState && matchesType && matchesTag;
    });

    return sortColleges(filtered, sortBy);
  }, [filters, sortBy]);

  const handleCompareChange = (collegeId, checked) => {
    setCompareIds((current) => {
      if (checked) {
        return current.includes(collegeId) || current.length >= 3 ? current : [...current, collegeId];
      }

      return current.filter((id) => id !== collegeId);
    });
  };

  const compareUrl = `/compare?ids=${compareIds.join(',')}`;

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <img
          src={campusHero}
          alt="Modern university campus"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/75 to-slate-950/15" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.75fr] lg:px-8">
          <div className="animate-fade-slide max-w-3xl">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold uppercase tracking-wide text-indigo-50 shadow-sm backdrop-blur">
              College discovery
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
              Find, compare, and save colleges that fit your goals.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-indigo-50 sm:text-lg">
              Explore fees, ratings, placements, courses, recruiters, and student reviews from one clean dashboard.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#college-results"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-extrabold text-indigo-700 shadow-xl shadow-indigo-950/20 transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Explore colleges
              </a>
              <Link
                to="/compare"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 text-sm font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                Compare picks
              </Link>
            </div>
          </div>

          <div className="animate-rise hidden self-end rounded-xl border border-white/20 bg-white/15 p-4 shadow-2xl shadow-slate-950/25 backdrop-blur-md lg:block">
            <div className="grid grid-cols-3 gap-3">
              {[
                ['30', 'Colleges'],
                ['15+', 'States'],
                ['100%', 'Placement data'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg bg-white/90 p-4 text-slate-950">
                  <p className="text-2xl font-black text-indigo-700">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-slate-950/70 p-4">
              <p className="text-sm font-bold text-white">Smart shortlist</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 animate-soft-pulse" />
              </div>
              <p className="mt-3 text-xs font-semibold text-indigo-100">Rank by fees, ratings, and placement strength.</p>
            </div>
          </div>
        </div>
      </section>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        states={states}
        types={types}
        tags={tags}
        resultCount={filteredColleges.length}
      />

      <main id="college-results" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {compareIds.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-indigo-900">
              {compareIds.length} of 3 colleges selected for comparison
            </p>
            <Link
              to={compareUrl}
              className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Compare selected
            </Link>
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : filteredColleges.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredColleges.map((college, index) => (
              <CollegeCard
                key={college.id}
                college={college}
                cardIndex={index}
                compareChecked={compareIds.includes(college.id)}
                compareDisabled={compareIds.length >= 3}
                onCompareChange={handleCompareChange}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-extrabold text-slate-950">No colleges found</h2>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Try changing the search term, filters, or sort option.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
