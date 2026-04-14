import React from 'react';
import StarScale from '../components/StarScale.jsx';
import EmojiSlider from '../components/EmojiSlider.jsx';

export default function Step4Around({ prefs, set }) {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-5xl sm:text-7xl leading-none">
          Getting Around
        </h2>
        <p className="font-karla text-ptv/70 mt-2">
          Trams, trains, and the never-ending question of "is it walkable?".
        </p>
      </header>

      <StarScale
        label="Public transport importance"
        helper="Are you Myki-tapping daily or strictly a car person?"
        value={prefs.transport}
        onChange={(v) => set({ transport: v })}
      />

      <StarScale
        label="School quality"
        helper="Even if you don't have kids — it shapes who's in the suburb."
        value={prefs.school}
        onChange={(v) => set({ school: v })}
      />

      <StarScale
        label="Walkability"
        helper="Bread, coffee, parmas — all on foot?"
        value={prefs.walkability}
        onChange={(v) => set({ walkability: v })}
      />

      <EmojiSlider
        label="Commute tolerance"
        leftLabel="Hate every minute"
        rightLabel="Love a podcast"
        emojis={['😤', '😐', '🙂', '🎧']}
        value={prefs.commuteTolerance}
        onChange={(v) => set({ commuteTolerance: v })}
        helper="How far are you willing to schlep for the right place?"
      />
    </div>
  );
}
