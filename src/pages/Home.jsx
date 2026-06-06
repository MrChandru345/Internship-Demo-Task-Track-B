import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import collegesData from '../data/colleges.json';
import CollegeCard from '../components/CollegeCard';
import FilterBar from '../components/FilterBar';

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
        <div key={index} className="h-80 animate-pulse rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-lg bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-4 rounded bg-slate-200" />
              <div className="h-4 w-2/3 rounded bg-slate-200" />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="h-20 rounded-lg bg-slate-100" />
            <div className="h-20 rounded-lg bg-slate-100" />
          </div>
          <div className="mt-8 h-10 rounded-md bg-slate-200" />
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
      <section className="bg-indigo-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-indigo-100">College discovery</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
              Find, compare, and save colleges that fit your goals.
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-indigo-50 sm:text-lg">
              Explore fees, ratings, placements, courses, recruiters, and student reviews from one clean dashboard.
            </p>
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
            {filteredColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
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
