import React, { useState } from 'react';

// 5-star scale with a satisfying hover/animate state.
export default function StarScale({ value, onChange, label, helper }) {
  const [hover, setHover] = useState(0);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="font-editorial text-2xl">{label}</label>
        {helper && (
          <span className="font-karla text-sm text-ptv/70">{helper}</span>
        )}
      </div>
      <div
        className="mt-3 flex gap-2"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const active = (hover || value) >= n;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onMouseEnter={() => setHover(n)}
              onClick={() => onChange(n)}
              className={[
                'w-12 h-12 rounded-md border-[3px] border-ptv flex items-center justify-center text-2xl',
                'transition-all duration-150',
                active ? 'bg-tram scale-110 shadow-zine-sm' : 'bg-white',
              ].join(' ')}
            >
              {active ? '★' : '☆'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
