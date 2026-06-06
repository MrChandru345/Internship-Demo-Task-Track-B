import { Search } from 'lucide-react';

function FilterBar({ filters, onFilterChange, sortBy, onSortChange, states, types, tags, resultCount }) {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <section className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={filters.search}
              onChange={(event) => updateFilter('search', event.target.value)}
              type="search"
              placeholder="Search colleges by name"
              className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
              State
              <select
                value={filters.state}
                onChange={(event) => updateFilter('state', event.target.value)}
                className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">All states</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
              Type
              <select
                value={filters.type}
                onChange={(event) => updateFilter('type', event.target.value)}
                className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">All types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
              Course Tag
              <select
                value={filters.tag}
                onChange={(event) => updateFilter('tag', event.target.value)}
                className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">All tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
              Sort
              <select
                value={sortBy}
                onChange={(event) => onSortChange(event.target.value)}
                className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="rating-desc">Rating: high to low</option>
                <option value="fees-asc">Fees: low to high</option>
                <option value="fees-desc">Fees: high to low</option>
              </select>
            </label>
          </div>

          <p className="text-sm font-semibold text-slate-600">Showing {resultCount} colleges</p>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
