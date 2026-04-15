import React from 'react';
import EmojiSlider from '../components/EmojiSlider.jsx';
import Toggle from '../components/Toggle.jsx';

export default function Step5Vibe({ prefs, set }) {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-5xl sm:text-7xl leading-none">
          The Vibe Dial
        </h2>
        <p className="font-karla text-ptv/70 mt-2">
          The bit where we get a little bit judgey. We won't tell anyone.
        </p>
      </header>

      <EmojiSlider
        label="Bogan tolerance"
        leftLabel="None thanks"
        rightLabel="Bring 'em on"
        emojis={['😇', '😏', '🍺', '🦅']}
        value={prefs.boganTolerance}
        onChange={(v) => set({ boganTolerance: v })}
        helper="Honest answers only. We see you."
      />

      <EmojiSlider
        label="Hipster tolerance"
        leftLabel="Hard pass"
        rightLabel="More tote bags"
        emojis={['🙄', '🧢', '☕', '🧴']}
        value={prefs.hipsterTolerance}
        onChange={(v) => set({ hipsterTolerance: v })}
        helper="How many natural wine bars is too many?"
      />

      <EmojiSlider
        label="Neighbour judgment sensitivity"
        leftLabel="Don't care"
        rightLabel="Need them to like me"
        emojis={['🤷', '🙂', '😬', '😨']}
        value={prefs.judgmentSensitivity}
        onChange={(v) => set({ judgmentSensitivity: v })}
        helper="Are you the friendly chat-over-the-fence type?"
      />

      <Toggle
        label="AFL culture"
        helper="Will you be wearing the scarf in winter?"
        value={prefs.aflCulture}
        onChange={(v) => set({ aflCulture: v })}
        options={[
          { value: false, label: 'Could not care less' },
          { value: true, label: 'CARN THE BOMBERS' },
        ]}
      />

      <Toggle
        label="Dog owner?"
        helper="We'll prioritise dog parks and tolerant locals."
        value={prefs.dogOwner}
        onChange={(v) => set({ dogOwner: v })}
        options={[
          { value: false, label: 'No dog' },
          { value: true, label: 'Got a good boy' },
        ]}
      />
    </div>
  );
}
