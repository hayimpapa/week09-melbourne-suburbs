import React, { useEffect, useState } from 'react';

const QUIPS = [
  'Consulting a bloke from Fitzroy who definitely knows everything about Melbourne…',
  'Asking your nonna in Brunswick what she reckons…',
  "Waiting for the 86 tram. It'll be here in 4… or 14 minutes…",
  'Tasting flat whites until we find your soulmate suburb…',
  'Cross-referencing AFL allegiances with footpath quality…',
];

export default function Loading() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % QUIPS.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="zine-card p-8 sm:p-12 text-center bg-white">
      <div className="mx-auto w-20 h-20 mb-6 relative">
        <div className="absolute inset-0 rounded-full border-[6px] border-ptv border-t-tram animate-spin" />
      </div>
      <p className="font-editorial italic text-xl sm:text-2xl leading-snug">
        {QUIPS[i]}
      </p>
      <p className="font-karla text-sm text-ptv/60 mt-3">
        Results may vary. Melbourne weather not included.
      </p>
    </div>
  );
}
