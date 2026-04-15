import React from 'react';
import ChipSelect from '../components/ChipSelect.jsx';
import EmojiSlider from '../components/EmojiSlider.jsx';
import Toggle from '../components/Toggle.jsx';

const CULTURES = [
  'Italian',
  'Greek',
  'Vietnamese',
  'Chinese',
  'Indian',
  'Lebanese',
  'Jewish',
  'African',
  'Filipino',
  'Sri Lankan',
  'Korean',
  'Sudanese',
  'Turkish',
  'LGBTIQ+',
  'Anglo',
  'International',
];

export default function Step3People({ prefs, set }) {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-display text-5xl sm:text-7xl leading-none">
          Your People
        </h2>
        <p className="font-karla text-ptv/70 mt-2">
          Who do you wanna bump into at the corner shop?
        </p>
      </header>

      <ChipSelect
        label="Cultural communities"
        helper="Pick any that you'd love to live alongside. No wrong answers."
        value={prefs.cultures}
        onChange={(v) => set({ cultures: v })}
        options={CULTURES}
      />

      <EmojiSlider
        label="Life stage"
        leftLabel="Young & feral"
        rightLabel="Tea by 7pm"
        emojis={['🎉', '🍻', '👶', '🏡', '☕']}
        value={prefs.lifeStage}
        onChange={(v) => set({ lifeStage: v })}
        helper="Where on the great rollercoaster of life are you?"
      />

      <Toggle
        label="Retiree-friendly priorities?"
        helper="Walkability and easy public transport bumped up the priority list."
        value={prefs.retireeFriendly}
        onChange={(v) => set({ retireeFriendly: v })}
        options={[
          { value: false, label: 'Nah' },
          { value: true, label: 'Yes please' },
        ]}
      />
    </div>
  );
}
