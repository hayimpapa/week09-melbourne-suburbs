import React from 'react';

// Two-option toggle styled like big chunky pill buttons.
export default function Toggle({ value, onChange, label, options, helper }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="font-editorial text-2xl">{label}</label>
      </div>
      {helper && (
        <p className="font-karla text-sm text-ptv/70 mt-1">{helper}</p>
      )}
      <div className="mt-3 inline-flex flex-wrap gap-2 p-1 bg-white border-[3px] border-ptv rounded-full shadow-zine-sm">
        {options.map((opt) => {
          const on = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              className={[
                'px-4 py-2 rounded-full font-display tracking-wider uppercase text-sm',
                on
                  ? 'bg-ptv text-tram'
                  : 'text-ptv hover:bg-cream',
              ].join(' ')}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
