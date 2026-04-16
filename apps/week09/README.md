# Week 09 — Where Should I Live?

A cheeky, opinionated **Melbourne suburb recommender**. Answer 20 questions
across 5 thematic "tram stops" and a Melbourne-local Claude will rank your
top 5 suburbs with witty taglines and explanations.

Part of my 52-app project. Lives at `apps/week09` in the monorepo.

## Stack

- **React + Vite** frontend
- **Tailwind CSS** with a custom Yarra-Trams-yellow / PTV-navy / Myki-green
  palette and a "zine crossed with a transit map" vibe
- **framer-motion** for tram-style step transitions and stagger-animated
  result cards
- **Supabase** (`melbourne_suburbs` table) for the suburb data
- **Vercel serverless function** at `/api/recommend` calling the
  **Anthropic Claude API**

## Layout

```
apps/week09/
├── api/
│   └── recommend.js          # Vercel serverless function → Claude API
├── public/
├── src/
│   ├── components/           # Form widgets + result card + tram progress bar
│   ├── steps/                # 5 thematic question steps
│   ├── lib/
│   │   ├── supabase.js       # Supabase client + fetchAllSuburbs()
│   │   └── scoring.js        # Weighted shortlist scoring
│   ├── App.jsx               # Multi-step form + results state machine
│   ├── main.jsx
│   └── index.css             # Tailwind + zine component classes
├── supabase/
│   ├── schema.sql            # melbourne_suburbs table + RLS policy
│   └── seed.sql              # ~60 suburbs of seed data
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

## Setup

### 1. Install dependencies

```bash
cd apps/week09
npm install
```

### 2. Configure Supabase

1. Create a new Supabase project.
2. In the SQL editor, run `supabase/schema.sql`.
3. Then run `supabase/seed.sql` to populate ~60 suburbs.
4. Grab the project URL and anon key from **Project Settings → API**.

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-...
```

`VITE_*` vars are exposed to the browser. `ANTHROPIC_API_KEY` stays
server-side and is only read inside `/api/recommend.js`.

### 4. Run locally

```bash
npm run dev
```

The Vite dev server includes a small plugin (see `vite.config.js`) that
mounts the Vercel serverless function at `/api/recommend` during dev, so
everything works on one port at `http://localhost:5173` — no Vercel CLI
needed. Non-`VITE_` env vars (like `ANTHROPIC_API_KEY`) are loaded from
`.env` into `process.env` for the serverless function.

If you'd rather use the Vercel CLI (e.g. to test Vercel-specific features),
this also works:

```bash
npx vercel dev
```

## Recommendation flow

1. User completes 5 steps (20 questions) — slider, star, chip and toggle
   inputs, with a tram-line progress indicator across the top.
2. On **Find My Suburb**, the frontend fetches all suburbs from Supabase
   and runs `scoreSuburbs()` (`src/lib/scoring.js`) — a weighted distance
   function across all 20 preferences.
3. The top 5 are sent (along with the raw preferences) to
   `POST /api/recommend`.
4. The Vercel function calls Claude with a "you are a witty Melbourne local"
   system prompt and asks for ranked JSON: `{ suburb, rank, tagline, explanation }`.
5. Results render as tilted, stagger-animated `SuburbCard` components.

## Design notes

- Display font: **Bebas Neue** for big punchy headings, **Playfair Display**
  for the editorial italic taglines.
- Body font: **DM Sans** + **Karla**.
- Buttons and cards use chunky 3px navy borders with a hard-shadow
  (`shadow-zine`) for the zine feel.
- Result cards are tilted ±2–3° using framer-motion and untilt on hover.
- Loading state cycles cheeky Melbourne-flavoured quips.

## Deploying

Push to a Vercel project rooted at `apps/week09`. Set the env vars in the
Vercel dashboard. The `vercel.json` is configured for the Vite framework.

---

_Results may vary. Melbourne weather not included._
