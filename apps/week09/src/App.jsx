import React, { useEffect, useMemo, useState } from 'react';
import TramProgress from './components/TramProgress.jsx';
import StepShell from './components/StepShell.jsx';
import Step1Vibe from './steps/Step1Vibe.jsx';
import Step2Crash from './steps/Step2Crash.jsx';
import Step3People from './steps/Step3People.jsx';
import Step4Around from './steps/Step4Around.jsx';
import Step5Vibe from './steps/Step5Vibe.jsx';
import SuburbCard from './components/SuburbCard.jsx';
import Loading from './components/Loading.jsx';
import { fetchAllSuburbs } from './lib/supabase.js';
import { shortlistTop } from './lib/scoring.js';

const STEPS = ['Vibe', 'Crash', 'People', 'Around', 'Dial'];

const DEFAULT_PREFS = {
  // Step 1
  beachVsHills: 0.3, // 0=beach, 1=hills
  cityProximity: 0.3, // 0=close, 1=far
  nightlife: 3,
  cafe: 4,
  greenSpace: 3,
  // Step 2
  propertyType: 'any',
  budget: 1100000,
  newEstate: 'either',
  // Step 3
  cultures: [],
  lifeStage: 0.4,
  retireeFriendly: false,
  // Step 4
  transport: 4,
  school: 3,
  walkability: 4,
  commuteTolerance: 0.5,
  // Step 5
  boganTolerance: 0.4,
  hipsterTolerance: 0.5,
  judgmentSensitivity: 0.3,
  aflCulture: false,
  dogOwner: false,
};

export default function App() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [suburbs, setSuburbs] = useState([]);
  const [loadingSuburbs, setLoadingSuburbs] = useState(true);
  const [supabaseError, setSupabaseError] = useState(null);

  const [phase, setPhase] = useState('form'); // form | loading | results | error
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch suburbs once at startup so the recommendation step is snappy.
  useEffect(() => {
    fetchAllSuburbs()
      .then((rows) => {
        setSuburbs(rows);
        setLoadingSuburbs(false);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        setSupabaseError(e.message ?? 'Unknown error');
        setLoadingSuburbs(false);
      });
  }, []);

  const set = (patch) => setPrefs((p) => ({ ...p, ...patch }));

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };
  const jump = (i) => {
    if (i <= step) {
      setDirection(i < step ? -1 : 1);
      setStep(i);
    }
  };

  const isLast = step === STEPS.length - 1;

  async function findMySuburb() {
    if (suburbs.length === 0) {
      setPhase('error');
      setErrorMsg(
        supabaseError
          ? `Couldn't reach Supabase: ${supabaseError}. Have you run the schema/seed SQL and set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY?`
          : "We don't have any suburbs to choose from. Check the database setup."
      );
      return;
    }

    setPhase('loading');
    try {
      const top = shortlistTop(suburbs, prefs, 5);
      const candidatePayload = top.map((t) => ({
        id: t.suburb.id,
        name: t.suburb.name,
        region: t.suburb.region,
        median_house_price: t.suburb.median_house_price,
        property_mix: t.suburb.property_mix,
        cbd_distance_km: t.suburb.cbd_distance_km,
        cafe_score: t.suburb.cafe_score,
        nightlife_score: t.suburb.nightlife_score,
        green_space_score: t.suburb.green_space_score,
        transport_score: t.suburb.transport_score,
        walkability_score: t.suburb.walkability_score,
        school_score: t.suburb.school_score,
        family_score: t.suburb.family_score,
        beach_score: t.suburb.beach_score,
        hills_score: t.suburb.hills_score,
        cultural_communities: t.suburb.cultural_communities,
        hipster_score: t.suburb.hipster_score,
        bogan_score: t.suburb.bogan_score,
        afl_culture: t.suburb.afl_culture,
        new_estate: t.suburb.new_estate,
        dog_friendly_score: t.suburb.dog_friendly_score,
        match_score: t.score,
        match_reasons: t.reasons,
      }));

      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ preferences: prefs, candidates: candidatePayload }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
      }
      const json = await res.json();
      const ranked = (json.recommendations ?? []).map((r) => {
        const match = top.find(
          (t) => t.suburb.name.toLowerCase() === r.suburb.toLowerCase()
        );
        return {
          ...r,
          suburb: match?.suburb ?? { name: r.suburb },
          matchScore: match?.score ?? 0,
        };
      });
      setResults(ranked);
      setPhase('results');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setErrorMsg(e.message ?? 'Something broke.');
      setPhase('error');
    }
  }

  function reset() {
    setPrefs(DEFAULT_PREFS);
    setStep(0);
    setDirection(-1);
    setResults([]);
    setPhase('form');
    setErrorMsg('');
  }

  const stepContent = useMemo(() => {
    switch (step) {
      case 0:
        return <Step1Vibe prefs={prefs} set={set} />;
      case 1:
        return <Step2Crash prefs={prefs} set={set} />;
      case 2:
        return <Step3People prefs={prefs} set={set} />;
      case 3:
        return <Step4Around prefs={prefs} set={set} />;
      case 4:
        return <Step5Vibe prefs={prefs} set={set} />;
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, prefs]);

  return (
    <div className="min-h-screen">
      {/* Header / hero */}
      <header className="border-b-[3px] border-ptv bg-cream relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] bg-scarf-stripes"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-ptv text-tram font-display tracking-wider px-3 py-1 text-sm rounded-full">
              Week 09 · 52 apps
            </span>
            <span className="font-karla text-sm text-ptv/70">
              Powered by trams, coffee & Claude
            </span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl leading-[0.85] mt-4">
            Where Should
            <br />
            <span className="text-siren">I Live?</span>
          </h1>
          <p className="font-editorial italic text-xl sm:text-2xl mt-4 max-w-2xl">
            A cheeky, opinionated Melbourne suburb recommender.
            Tell us your vibe and we'll point you at your spiritual home —
            yeah nah, but seriously.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        {phase === 'form' && (
          <section>
            <div className="mb-10">
              <TramProgress steps={STEPS} current={step} onJump={jump} />
            </div>

            <div className="zine-card bg-white p-6 sm:p-10 bg-cream-stripes">
              <StepShell stepKey={step} direction={direction}>
                {stepContent}
              </StepShell>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="zine-btn bg-white text-ptv shadow-zine-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>

                {!isLast ? (
                  <button
                    type="button"
                    onClick={next}
                    className="zine-btn-navy"
                  >
                    Next stop →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={findMySuburb}
                    disabled={loadingSuburbs}
                    className="zine-btn-yellow text-2xl px-8 py-5 animate-pulseBig disabled:animate-none disabled:opacity-50"
                  >
                    {loadingSuburbs ? 'Loading suburbs…' : '🚋 Find my suburb'}
                  </button>
                )}
              </div>
            </div>

            {supabaseError && (
              <p className="mt-4 font-karla text-sm text-siren">
                Heads up: Supabase isn't connected yet ({supabaseError}). Set
                your env vars and run the seed SQL before clicking Find my
                suburb.
              </p>
            )}
          </section>
        )}

        {phase === 'loading' && (
          <section className="mt-4">
            <Loading />
          </section>
        )}

        {phase === 'error' && (
          <section className="zine-card p-8 bg-white">
            <h2 className="font-display text-4xl">Yeah nah, that broke.</h2>
            <p className="font-karla mt-3 text-ptv/80 break-words">{errorMsg}</p>
            <button
              type="button"
              onClick={reset}
              className="zine-btn-red mt-6"
            >
              Start again
            </button>
          </section>
        )}

        {phase === 'results' && (
          <section>
            <div className="mb-8">
              <h2 className="font-display text-5xl sm:text-7xl leading-none">
                Reckon you'd vibe with…
              </h2>
              <p className="font-editorial italic text-lg mt-2 text-ptv/70">
                Honestly tho, here are your top 5. Don't @ us.
              </p>
            </div>
            <div className="space-y-8">
              {results.map((r, i) => (
                <SuburbCard key={r.suburb.name + i} result={r} index={i} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={reset}
                className="zine-btn-yellow text-xl"
              >
                Try again 🔁
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t-[3px] border-ptv mt-20 bg-ptv text-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 font-karla text-sm flex flex-wrap items-center justify-between gap-3">
          <span>
            Built in Melbourne ☕🚋 · Week 09 of 52 · Results may vary, Melbourne
            weather not included.
          </span>
          <span className="text-tram">v0.1</span>
        </div>
      </footer>
    </div>
  );
}
