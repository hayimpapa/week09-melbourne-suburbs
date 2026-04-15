import React from 'react';
import Toggle from '../components/Toggle.jsx';

const PROPERTY_TYPES = [
  { value: 'any', label: 'No preference' },
  { value: 'apartments', label: 'Apartments' },
  { value: 'townhouses', label: 'Townhouses' },
  { value: 'houses', label: 'Houses' },
  { value: 'mixed', label: 'Mixed bag' },
  { value: 'acreage', label: 'Acreage' },
];

function fmt(n) {
  if (n >= 3000000) return '$3M+';
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return `$${Math.round(n / 1000)}k`;
}

export default function Step2Crash({ prefs, set }) {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-5xl sm:text-7xl leading-none">
          Where Will You Crash?
        </h2>
        <p className="font-karla text-ptv/70 mt-2">
          The serious money bit. Don't worry, no one's checking your bank.
        </p>
      </header>

      <div>
        <label className="font-editorial text-2xl block">Property type</label>
        <p className="font-karla text-sm text-ptv/70 mt-1">
          What kinda gaff are you after?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((opt) => {
            const on = prefs.propertyType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => set({ propertyType: opt.value })}
                className={[
                  'px-4 py-2 rounded-full font-display tracking-wider uppercase text-sm border-[3px] border-ptv',
                  on
                    ? 'bg-ptv text-tram shadow-zine-sm'
                    : 'bg-white text-ptv hover:bg-cream',
                ].join(' ')}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label className="font-editorial text-2xl">Budget</label>
          <span className="font-display text-3xl text-siren">
            {fmt(prefs.budget)}
          </span>
        </div>
        <p className="font-karla text-sm text-ptv/70 mt-1">
          Median house price you're comfortable with. Honesty is liberating.
        </p>
        <input
          type="range"
          min={400000}
          max={3000000}
          step={50000}
          value={prefs.budget}
          onChange={(e) => set({ budget: Number(e.target.value) })}
          className="zine-range mt-3"
        />
        <div className="mt-1 flex justify-between font-karla text-xs uppercase tracking-wider text-ptv/70">
          <span>$400k</span>
          <span>$3M+</span>
        </div>
      </div>

      <Toggle
        label="New estate or established?"
        helper="Brand-new build with the matching letterboxes, or a place with a bit of patina?"
        value={prefs.newEstate}
        onChange={(v) => set({ newEstate: v })}
        options={[
          { value: 'new', label: 'Brand new' },
          { value: 'either', label: 'Either' },
          { value: 'established', label: 'Established' },
        ]}
      />
    </div>
  );
}
