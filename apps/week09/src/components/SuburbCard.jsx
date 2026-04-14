import React from 'react';
import { motion } from 'framer-motion';

function fmtPrice(n) {
  if (!n) return '—';
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  return `$${Math.round(n / 1000)}k`;
}

const TILT = [-2.5, 1.8, -1.4, 2.2, -2.0];

// One staggered, slightly tilted suburb result card. `result` shape:
// { suburb, rank, tagline, explanation } merged with the original suburb data.
export default function SuburbCard({ result, index }) {
  const tilt = TILT[index % TILT.length];
  const isFirst = result.rank === 1;
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, rotate: tilt - 4 }}
      animate={{ y: 0, opacity: 1, rotate: tilt }}
      transition={{
        delay: index * 0.18,
        type: 'spring',
        stiffness: 180,
        damping: 14,
      }}
      whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
      className={[
        'zine-card p-6 sm:p-8 relative',
        isFirst ? 'bg-tram' : 'bg-white',
      ].join(' ')}
      style={{ transformOrigin: 'top left' }}
    >
      <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full border-[3px] border-ptv bg-siren text-white font-display text-3xl flex items-center justify-center shadow-zine-sm">
        #{result.rank}
      </div>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-4xl sm:text-5xl leading-none">
            {result.suburb.name}
          </h3>
          <p className="font-karla text-sm uppercase tracking-wider text-ptv/70 mt-1">
            {result.suburb.region} · {result.suburb.cbd_distance_km} km from CBD
          </p>
        </div>
        {isFirst && (
          <span className="font-display text-sm bg-ptv text-tram px-3 py-1 rounded-full whitespace-nowrap">
            Top pick
          </span>
        )}
      </div>

      <p className="font-editorial italic text-xl sm:text-2xl mt-4 leading-snug">
        “{result.tagline}”
      </p>

      <p className="font-body mt-3 text-ptv/90 leading-relaxed">
        {result.explanation}
      </p>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 font-karla text-sm">
        <div className="border-[2px] border-ptv rounded-md px-3 py-2">
          <div className="text-ptv/60 uppercase text-xs tracking-wider">
            Median
          </div>
          <div className="font-bold text-ptv">
            {fmtPrice(result.suburb.median_house_price)}
          </div>
        </div>
        <div className="border-[2px] border-ptv rounded-md px-3 py-2">
          <div className="text-ptv/60 uppercase text-xs tracking-wider">
            Property
          </div>
          <div className="font-bold text-ptv capitalize">
            {result.suburb.property_mix}
          </div>
        </div>
        <div className="border-[2px] border-ptv rounded-md px-3 py-2 col-span-2 sm:col-span-1">
          <div className="text-ptv/60 uppercase text-xs tracking-wider">
            Match score
          </div>
          <div className="font-bold text-ptv">{result.matchScore}/100</div>
        </div>
      </div>
    </motion.div>
  );
}
