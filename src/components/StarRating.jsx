import { Star } from 'lucide-react';

function StarRating({ rating, compact = false, light = false }) {
  const filledStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < filledStars
                ? 'fill-amber-400 text-amber-400'
                : light
                  ? 'fill-white/20 text-white/30'
                  : 'fill-slate-200 text-slate-200'
            }`}
          />
        ))}
      </div>
      {!compact && (
        <span className={`text-sm font-semibold ${light ? 'text-white' : 'text-slate-700'}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export default StarRating;
