// Vercel serverless function: POST /api/recommend
// Calls the Anthropic Claude API to rank a shortlist of Melbourne suburbs and
// produce a witty tagline + 2–3 sentence explanation for each.
//
// Body shape:
//   { preferences: {...}, candidates: [{ name, region, ... , match_score }] }
//
// Response shape:
//   { recommendations: [{ suburb, rank, tagline, explanation }] }

import Anthropic from '@anthropic-ai/sdk';

export const config = {
  runtime: 'nodejs',
};

const SYSTEM_PROMPT = `You are a witty, opinionated Melbourne local. You've lived everywhere from Brunswick to Brighton. You ride trams, you have strong coffee opinions, you have an AFL team. You give honest, slightly cheeky but never offensive advice about Melbourne suburbs.

Your job: given a user's preferences and 5 candidate suburbs (already pre-scored by an algorithm), rank them 1 to 5 and give each one:
- a one-line tagline (max 12 words, witty and Melbourne-specific)
- a 2–3 sentence explanation that references the user's actual preferences and the suburb's vibe

Use Australian-Melbourne slang sparingly but naturally ("reckon", "tho", "yeah nah", "carn"). Don't be cringe. Don't insult anyone's home.

Honesty rules — these matter:
- Read the "User wants" summary carefully. If a suburb pulls in the opposite direction of something the user explicitly asked for (e.g. user wants to live far from the CBD but the suburb is close), call it out — never reframe a mismatch as a positive.
- Never invent specifics that aren't in the data. The data only gives you a transport score, not what mode it is — say "decent public transport" rather than naming trams, trains, or specific lines unless you're certain.

CRITICAL: Respond with ONLY a JSON object matching this exact schema, no preamble, no markdown fence:

{
  "recommendations": [
    { "suburb": "Suburb Name", "rank": 1, "tagline": "...", "explanation": "..." },
    ...
  ]
}

Use the suburb names exactly as given in the candidates list.`;

// Translate the raw 0..1 sliders / star ratings into plain English so the
// model doesn't get tripped up by misleading variable names like
// `cityProximity` (where 1 actually means "far away").
function summarisePreferences(p) {
  const lines = [];
  const slider = (v, lowLabel, midLabel, highLabel) => {
    if (v <= 0.15) return `definitely ${lowLabel}`;
    if (v < 0.4) return `leaning ${lowLabel}`;
    if (v <= 0.6) return midLabel;
    if (v < 0.85) return `leaning ${highLabel}`;
    return `definitely ${highLabel}`;
  };
  const star = (n, label) => {
    if (n <= 1) return `doesn't care about ${label}`;
    if (n === 2) return `mildly interested in ${label}`;
    if (n === 3) return `medium interest in ${label}`;
    if (n === 4) return `cares a lot about ${label}`;
    return `obsessed with ${label}`;
  };

  lines.push(`Beach vs hills: ${slider(p.beachVsHills, 'the beach', 'either is fine', 'the hills')}`);
  lines.push(`Distance from CBD: ${slider(p.cityProximity, 'wants to be in the city', "doesn't mind either way", 'wants to live far away from the CBD')}`);
  lines.push(`Nightlife: ${star(p.nightlife, 'nightlife and bars')}`);
  lines.push(`Cafés: ${star(p.cafe, 'café culture')}`);
  lines.push(`Green space: ${star(p.greenSpace, 'parks and green space')}`);
  lines.push(`Property type: ${p.propertyType === 'any' ? 'no preference' : p.propertyType}`);
  lines.push(`Budget: $${p.budget.toLocaleString()} median house price`);
  lines.push(`New estate vs established: ${p.newEstate}`);
  if (p.cultures?.length) lines.push(`Cultural communities they want: ${p.cultures.join(', ')}`);
  lines.push(`Life stage: ${slider(p.lifeStage, 'young & single', 'family-stage', 'retiree')}`);
  if (p.retireeFriendly) lines.push('Retiree-friendly priorities: ON (walkability + transport bumped)');
  lines.push(`Public transport: ${star(p.transport, 'public transport')}`);
  lines.push(`School quality: ${star(p.school, 'school quality')}`);
  lines.push(`Walkability: ${star(p.walkability, 'walkability')}`);
  lines.push(`Commute tolerance: ${slider(p.commuteTolerance, 'hates commuting', 'tolerates a commute', 'happy with a long commute')}`);
  lines.push(`Bogan tolerance: ${slider(p.boganTolerance, 'no bogans please', 'fine with some', 'bring the bogans')}`);
  lines.push(`Hipster tolerance: ${slider(p.hipsterTolerance, 'no hipsters please', 'fine with some', 'more tote bags please')}`);
  lines.push(`Neighbour judgment sensitivity: ${slider(p.judgmentSensitivity, "doesn't care", 'a bit', 'really cares')}`);
  if (p.aflCulture) lines.push('AFL culture: wants it');
  if (p.dogOwner) lines.push('Dog owner: yes (dog-friendliness matters)');
  return lines.map((l) => `- ${l}`).join('\n');
}

function buildUserPrompt(preferences, candidates) {
  const prefs = summarisePreferences(preferences);
  const cands = candidates
    .map(
      (c, i) => `Candidate ${i + 1}: ${c.name} (${c.region})
- Median house price: $${c.median_house_price.toLocaleString()}
- Property mix: ${c.property_mix}
- CBD distance: ${c.cbd_distance_km} km
- Cafe ${c.cafe_score}/10, Nightlife ${c.nightlife_score}/10, Green space ${c.green_space_score}/10
- Transport ${c.transport_score}/10, Walkability ${c.walkability_score}/10, Schools ${c.school_score}/10, Family ${c.family_score}/10
- Beach ${c.beach_score}/10, Hills ${c.hills_score}/10
- Hipster ${c.hipster_score}/10, Bogan ${c.bogan_score}/10
- Cultures: ${(c.cultural_communities ?? []).join(', ') || 'mixed'}
- AFL culture: ${c.afl_culture ? 'yes' : 'no'}, New estate: ${c.new_estate ? 'yes' : 'no'}, Dog friendly ${c.dog_friendly_score}/10
- Algorithm match score: ${c.match_score}/100${
        c.match_reasons?.length ? ` (because: ${c.match_reasons.join(', ')})` : ''
      }`
    )
    .join('\n\n');

  return `User wants:
${prefs}

Candidate suburbs (already shortlisted by an algorithm — feel free to re-rank):
${cands}

Now rank these 5 suburbs and respond with ONLY the JSON object as specified.`;
}

function tryParseJson(text) {
  // Strip markdown code fences if Claude added them anyway.
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
  return JSON.parse(cleaned);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error:
        'ANTHROPIC_API_KEY is not configured on the server. Set it in Vercel project settings.',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  const { preferences, candidates } = body ?? {};
  if (!preferences || !Array.isArray(candidates) || candidates.length === 0) {
    return res
      .status(400)
      .json({ error: 'Body must include preferences and a non-empty candidates array' });
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildUserPrompt(preferences, candidates),
        },
      ],
    });

    const text = message.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n');

    let parsed;
    try {
      parsed = tryParseJson(text);
    } catch (e) {
      return res.status(502).json({
        error: 'Claude returned non-JSON output',
        raw: text,
      });
    }

    if (!parsed || !Array.isArray(parsed.recommendations)) {
      return res.status(502).json({
        error: 'Claude response missing recommendations array',
        raw: text,
      });
    }

    // Sort defensively by rank in case the model returned them out of order.
    parsed.recommendations.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({
      error: 'Anthropic API call failed',
      detail: e?.message ?? String(e),
    });
  }
}
