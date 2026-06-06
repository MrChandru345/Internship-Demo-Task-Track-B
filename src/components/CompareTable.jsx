import { X } from 'lucide-react';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const rows = [
  { label: 'Rating', key: 'rating', type: 'number', best: 'high' },
  { label: 'Annual Fees', key: 'annualFees', type: 'currency', best: 'low' },
  { label: 'Placement Rate', key: 'placementRate', type: 'percent', best: 'high' },
  { label: 'Avg Package', key: 'averagePackage', type: 'currency', best: 'high' },
  { label: 'Highest Package', key: 'highestPackage', type: 'currency', best: 'high' },
  { label: 'Location', key: 'location', type: 'text' },
  { label: 'Type', key: 'type', type: 'text' },
  { label: 'Hostel', key: 'hostelAvailable', type: 'boolean', best: 'true' },
  { label: 'Scholarship', key: 'scholarshipAvailable', type: 'boolean', best: 'true' },
];

function getValue(college, key) {
  if (key === 'placementRate') return college.placements.placementRate;
  if (key === 'averagePackage') return college.placements.averagePackage;
  if (key === 'highestPackage') return college.placements.highestPackage;
  return college[key];
}

function formatValue(value, type) {
  if (type === 'currency') return currency.format(value);
  if (type === 'percent') return `${value}%`;
  if (type === 'boolean') return value ? 'Yes' : 'No';
  if (type === 'number') return Number(value).toFixed(1);
  return value;
}

function getBestValues(selectedColleges, row) {
  if (!row.best || selectedColleges.length < 2) return new Set();

  const values = selectedColleges.map((college) => getValue(college, row.key));
  if (row.best === 'true') {
    return new Set(values.includes(true) ? [true] : []);
  }

  const numericValues = values.filter((value) => typeof value === 'number');
  const bestValue = row.best === 'low' ? Math.min(...numericValues) : Math.max(...numericValues);
  return new Set([bestValue]);
}

function CompareTable({ colleges, onRemove }) {
  if (colleges.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-indigo-200 bg-indigo-50 p-8 text-center">
        <h2 className="text-xl font-extrabold text-slate-950">Add colleges to compare</h2>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Select up to three colleges to see fees, placements, location, and campus support side by side.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="sticky left-0 z-10 min-w-44 bg-slate-50 px-4 py-4 font-extrabold text-slate-700">
                Criteria
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="min-w-64 px-4 py-4 align-top">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-slate-950">{college.shortName || college.name}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{college.location}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(college.id)}
                      className="grid h-8 w-8 flex-none place-items-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                      aria-label={`Remove ${college.name}`}
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const bestValues = getBestValues(colleges, row);

              return (
                <tr key={row.key} className="border-b border-slate-100 last:border-b-0">
                  <th className="sticky left-0 z-10 bg-white px-4 py-4 font-bold text-slate-700">
                    {row.label}
                  </th>
                  {colleges.map((college) => {
                    const value = getValue(college, row.key);
                    const isBest = bestValues.has(value);

                    return (
                      <td
                        key={`${college.id}-${row.key}`}
                        className={`px-4 py-4 font-semibold ${
                          isBest ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800'
                        }`}
                      >
                        {formatValue(value, row.type)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompareTable;
