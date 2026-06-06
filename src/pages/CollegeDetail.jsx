import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin } from 'lucide-react';
import collegesData from '../data/colleges.json';
import StarRating from '../components/StarRating';
import { useSavedColleges } from '../context/SavedContext';

const colleges = collegesData.colleges;
const tabs = ['Overview', 'Courses', 'Placements', 'Reviews'];
const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function CollegeDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const { isSaved, toggleSaved } = useSavedColleges();

  const college = useMemo(() => colleges.find((item) => item.id === Number(id)), [id]);

  if (!college) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold text-slate-950">College not found</h1>
        <Link to="/" className="mt-4 inline-flex font-bold text-indigo-600 hover:text-indigo-700">
          Back to home
        </Link>
      </main>
    );
  }

  const saved = isSaved(college.id);

  return (
    <main>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-100 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to colleges
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 place-items-center rounded-lg border border-white/15 bg-white p-3">
                <img src={college.image} alt={`${college.name} logo`} className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-indigo-700">
                    {college.type}
                  </span>
                  <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-extrabold text-white">
                    {currency.format(college.annualFees)} yearly
                  </span>
                </div>
                <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl">{college.name}</h1>
                <p className="mt-3 flex items-center gap-2 text-base font-semibold text-slate-200">
                  <MapPin className="h-5 w-5 text-indigo-300" />
                  {college.location}
                </p>
                <div className="mt-4">
                  <StarRating rating={college.rating} light />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleSaved(college.id)}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-extrabold transition ${
                saved
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  : 'bg-white text-slate-950 hover:bg-indigo-50'
              }`}
            >
              <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-4 text-sm font-extrabold transition ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-500 hover:text-slate-950'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'Overview' && (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950">Overview</h2>
              <p className="mt-4 text-base font-medium leading-8 text-slate-600">{college.overview}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['Established', college.established],
                ['Hostel', college.hostelAvailable ? 'Available' : 'Not available'],
                ['Scholarship', college.scholarshipAvailable ? 'Available' : 'Not available'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-2 text-xl font-extrabold text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Courses' && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-4">Course</th>
                    <th className="px-4 py-4">Duration</th>
                    <th className="px-4 py-4">Fees</th>
                    <th className="px-4 py-4">Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {college.courses.map((course) => (
                    <tr key={course.name} className="border-t border-slate-100">
                      <td className="px-4 py-4 font-extrabold text-slate-950">{course.name}</td>
                      <td className="px-4 py-4 font-semibold text-slate-700">{course.duration}</td>
                      <td className="px-4 py-4 font-semibold text-slate-700">{currency.format(course.fees)}</td>
                      <td className="px-4 py-4 font-semibold text-slate-700">{course.seats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Placements' && (
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Avg Package</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-950">
                {currency.format(college.placements.averagePackage)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Highest Package</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-950">
                {currency.format(college.placements.highestPackage)}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Placement Rate</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-950">{college.placements.placementRate}%</p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600"
                  style={{ width: `${college.placements.placementRate}%` }}
                />
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Top Recruiters</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {college.placements.topRecruiters.map((recruiter) => (
                  <span key={recruiter} className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="grid gap-4 lg:grid-cols-2">
            {college.reviews.map((review) => (
              <article key={review.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-extrabold text-slate-950">{review.author}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{review.year}</p>
                  </div>
                  <StarRating rating={review.rating} compact />
                </div>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default CollegeDetail;
