import React from 'react';

// Slider that swaps the trailing emoji as the value moves through bands.
// `emojis` is an array of strings — the slider divides 0..1 evenly between them.
export default function EmojiSlider({
  value,
  onChange,
  label,
  leftLabel,
  rightLabel,
  emojis = ['😐'],
  helper,
}) {
  const idx = Math.min(
    emojis.length - 1,
    Math.floor(value * emojis.length)
  );
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="font-editorial text-2xl">{label}</label>
        <span className="text-4xl select-none" aria-hidden="true">
          {emojis[idx]}
        </span>
      </div>
      {helper && (
        <p className="font-karla text-sm text-ptv/70 mt-1">{helper}</p>
      )}
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={Math.round(value * 100)}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        className="zine-range mt-3"
      />
      <div className="mt-1 flex justify-between font-karla text-xs uppercase tracking-wider text-ptv/70">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
