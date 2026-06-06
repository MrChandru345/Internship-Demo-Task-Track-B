import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import collegesData from '../data/colleges.json';
import CompareTable from '../components/CompareTable';

const colleges = collegesData.colleges;

function ComparePage() {
  const [searchParams] = useSearchParams();
  const initialIds = useMemo(() => {
    const ids = searchParams
      .get('ids')
      ?.split(',')
      .map((id) => Number(id))
      .filter(Boolean);

    return ids ? ids.slice(0, 3) : [];
  }, [searchParams]);

  const [selectedIds, setSelectedIds] = useState(initialIds);
  const [query, setQuery] = useState('');

  const selectedColleges = useMemo(
    () => selectedIds.map((id) => colleges.find((college) => college.id === id)).filter(Boolean),
    [selectedIds],
  );

  const availableColleges = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return colleges
      .filter((college) => !selectedIds.includes(college.id))
      .filter((college) =>
        normalizedQuery
          ? `${college.name} ${college.shortName} ${college.location}`.toLowerCase().includes(normalizedQuery)
          : true,
      )
      .slice(0, 8);
  }, [query, selectedIds]);

  const addCollege = (collegeId) => {
    setSelectedIds((current) => {
      if (current.length >= 3 || current.includes(collegeId)) return current;
      return [...current, collegeId];
    });
    setQuery('');
  };

  const removeCollege = (collegeId) => {
    setSelectedIds((current) => current.filter((id) => id !== collegeId));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Compare colleges</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Side-by-side decision table</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Add up to three colleges and scan the best value in each measurable row.
          </p>
        </div>

        <div className="relative w-full max-w-lg">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
            Select college
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              disabled={selectedIds.length >= 3}
              type="search"
              placeholder={selectedIds.length >= 3 ? 'Maximum 3 colleges selected' : 'Search and add a college'}
              className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          {selectedIds.length < 3 && (query || selectedIds.length === 0) && (
            <div className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
              {availableColleges.length > 0 ? (
                availableColleges.map((college) => (
                  <button
                    key={college.id}
                    type="button"
                    onClick={() => addCollege(college.id)}
                    className="flex w-full items-center gap-3 border-b border-slate-100 px-3 py-3 text-left transition last:border-b-0 hover:bg-indigo-50"
                  >
                    <img
                      src={college.image}
                      alt=""
                      className="h-9 w-9 rounded-md border border-slate-200 object-contain p-1"
                    />
                    <span>
                      <span className="block text-sm font-extrabold text-slate-950">{college.name}</span>
                      <span className="block text-xs font-semibold text-slate-500">{college.location}</span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-4 text-sm font-semibold text-slate-500">No matches found</p>
              )}
            </div>
          )}
        </div>
      </div>

      <CompareTable colleges={selectedColleges} onRemove={removeCollege} />
    </main>
  );
}

export default ComparePage;
