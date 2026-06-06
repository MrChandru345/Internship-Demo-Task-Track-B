import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { useSavedColleges } from '../context/SavedContext';
import StarRating from './StarRating';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function CollegeCard({
  college,
  compareChecked = false,
  compareDisabled = false,
  onCompareChange,
  showCompare = true,
  showUnsaveButton = false,
  onUnsave,
}) {
  const { isSaved, toggleSaved } = useSavedColleges();
  const saved = isSaved(college.id);

  const handleSave = () => {
    toggleSaved(college.id);
    if (saved && onUnsave) {
      onUnsave(college.id);
    }
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start gap-4 border-b border-slate-100 p-4">
        <div className="grid h-16 w-16 flex-none place-items-center rounded-lg border border-slate-200 bg-slate-50 p-2">
          <img
            src={college.image}
            alt={`${college.shortName || college.name} logo`}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 text-base font-extrabold leading-snug text-slate-950">
              {college.name}
            </h2>
            <button
              type="button"
              onClick={handleSave}
              className={`grid h-9 w-9 flex-none place-items-center rounded-md border transition ${
                saved
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600'
              }`}
              aria-label={saved ? 'Unsave college' : 'Save college'}
              title={saved ? 'Unsave college' : 'Save college'}
            >
              <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <MapPin className="h-4 w-4 text-indigo-500" />
            {college.location}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
            {college.type}
          </span>
          {college.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Rating</p>
            <div className="mt-1">
              <StarRating rating={college.rating} />
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Annual Fees</p>
            <p className="mt-1 text-sm font-extrabold text-slate-950">{currency.format(college.annualFees)}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {showCompare && (
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={compareChecked}
                disabled={compareDisabled && !compareChecked}
                onChange={(event) => onCompareChange?.(college.id, event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
              Compare
            </label>
          )}
          <div className="flex flex-col gap-2 sm:ml-auto sm:flex-row">
            {showUnsaveButton && (
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-10 items-center justify-center rounded-md border border-rose-200 bg-rose-50 px-4 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
              >
                Unsave
              </button>
            )}
            <Link
              to={`/college/${college.id}`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CollegeCard;
