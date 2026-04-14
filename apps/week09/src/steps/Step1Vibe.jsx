import React from 'react';
import EmojiSlider from '../components/EmojiSlider.jsx';
import StarScale from '../components/StarScale.jsx';

export default function Step1Vibe({ prefs, set }) {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-5xl sm:text-7xl leading-none">
          The Vibe Check
        </h2>
        <p className="font-karla text-ptv/70 mt-2">
          What gets your blood pumping when you step out the front door?
        </p>
      </header>

      <EmojiSlider
        label="Beach or Hills?"
        leftLabel="Beach"
        rightLabel="Hills"
        emojis={['🏖️', '🌊', '🌳', '⛰️']}
        value={prefs.beachVsHills}
        onChange={(v) => set({ beachVsHills: v })}
        helper="Sandy toes or tall gum trees, mate?"
      />

      <EmojiSlider
        label="City Proximity"
        leftLabel="Right in it"
        rightLabel="Way out"
        emojis={['🏙️', '🚋', '🏘️', '🌾']}
        value={prefs.cityProximity}
        onChange={(v) => set({ cityProximity: v })}
        helper="How close do you wanna live to the CBD?"
      />

      <StarScale
        label="Nightlife & Bars"
        helper="Will you be at the rooftop or in bed by 9?"
        value={prefs.nightlife}
        onChange={(v) => set({ nightlife: v })}
      />

      <StarScale
        label="Café Culture"
        helper="Need a flat white done properly within walking distance?"
        value={prefs.cafe}
        onChange={(v) => set({ cafe: v })}
      />

      <StarScale
        label="Parks & Green Space"
        helper="How important is touching grass?"
        value={prefs.greenSpace}
        onChange={(v) => set({ greenSpace: v })}
      />
    </div>
  );
}
