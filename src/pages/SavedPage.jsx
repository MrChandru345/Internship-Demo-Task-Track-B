import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import CollegeCard from '../components/CollegeCard';
import { useSavedColleges } from '../context/SavedContext';

function SavedPage() {
  const { savedColleges } = useSavedColleges();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-blue-50 p-6 shadow-sm shadow-slate-200/80 animate-fade-slide">
        <p className="text-sm font-bold uppercase tracking-wide text-indigo-600">Saved colleges</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Your shortlist</h1>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Keep your strongest options here while you narrow down applications.
        </p>
      </div>

      {savedColleges.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {savedColleges.map((college, index) => (
            <CollegeCard key={college.id} college={college} showCompare={false} showUnsaveButton cardIndex={index} />
          ))}
        </div>
      ) : (
        <section className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm animate-rise">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-indigo-50 text-indigo-600">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-extrabold text-slate-950">No saved colleges yet</h2>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Save colleges from the listing or detail pages to build your shortlist.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Browse colleges
          </Link>
        </section>
      )}
    </main>
  );
}

export default SavedPage;
