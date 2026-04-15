import React from 'react';

// Tram-line style progress indicator: dots connected by a horizontal line,
// each dot labelled with the step name. Past stops are Myki green, current
// stop is tram yellow, future stops are white.
export default function TramProgress({ steps, current, onJump }) {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {/* Track line */}
        <div
          className="absolute left-0 right-0 top-[10px] h-[3px] bg-ptv"
          aria-hidden="true"
        />
        {steps.map((label, i) => {
          const status =
            i < current ? 'done' : i === current ? 'on' : 'future';
          return (
            <button
              key={label}
              type="button"
              onClick={() => onJump?.(i)}
              disabled={i > current}
              className="tram-stop group disabled:cursor-not-allowed"
            >
              <span
                className={[
                  'tram-stop-dot',
                  status === 'on' && 'tram-stop-dot-on',
                  status === 'done' && 'tram-stop-dot-done',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
              <span
                className={[
                  'mt-2 font-display tracking-wider text-xs sm:text-sm uppercase whitespace-nowrap',
                  status === 'on' ? 'text-ptv' : 'text-ptv/60',
                ].join(' ')}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
