import React from 'react';

// Multi-select chips. `value` is an array, `onChange` receives the new array.
export default function ChipSelect({ value, onChange, label, options, helper }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div>
      <label className="font-editorial text-2xl block">{label}</label>
      {helper && (
        <p className="font-karla text-sm text-ptv/70 mt-1">{helper}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={['chip', on && 'chip-on'].filter(Boolean).join(' ')}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
