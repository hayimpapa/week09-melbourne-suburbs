// Weighted scoring of Melbourne suburbs based on user preferences.
// Returns the top N suburbs sorted by score (highest first).
//
// All slider/star values from the form are normalised to 0..1 before scoring.
// Suburb attribute values are also normalised so the maths stays consistent.

const norm10 = (v) => Math.max(0, Math.min(10, v ?? 0)) / 10;
const inv = (v) => 1 - v;

// The user's preference object lives in App state — see App.jsx for shape.
// Score per suburb is a sum of weighted "distance" terms. Lower distance = better.
export function scoreSuburbs(suburbs, prefs) {
  return suburbs
    .map((s) => {
      const reasons = [];
      let score = 0;
      let maxScore = 0;

      // ---------- Step 1: vibes ----------
      // beachVsHills slider: 0 = beach, 1 = hills
      const bvh = prefs.beachVsHills; // 0..1
      const beach = norm10(s.beach_score);
      const hills = norm10(s.hills_score);
      // Higher reward when suburb's strength matches the slider direction.
      const beachHillsMatch = (1 - bvh) * beach + bvh * hills;
      score += beachHillsMatch * 12;
      maxScore += 12;
      if (beachHillsMatch > 0.7) {
        reasons.push(bvh < 0.5 ? 'great beach access' : 'leafy hills feel');
      }

      // City proximity: 0 = wants close, 1 = wants far
      const cityCloseness = inv(Math.min(s.cbd_distance_km, 60) / 60); // 1=close
      const cityWant = inv(prefs.cityProximity); // 1=wants close
      const cityMatch = 1 - Math.abs(cityCloseness - cityWant);
      score += cityMatch * 10;
      maxScore += 10;

      // Star scales (1..5) -> 0..1
      const star = (n) => (n - 1) / 4;
      const wNightlife = star(prefs.nightlife);
      const wCafe = star(prefs.cafe);
      const wGreen = star(prefs.greenSpace);
      score += wNightlife * norm10(s.nightlife_score) * 8;
      maxScore += wNightlife * 8;
      score += wCafe * norm10(s.cafe_score) * 8;
      maxScore += wCafe * 8;
      score += wGreen * norm10(s.green_space_score) * 8;
      maxScore += wGreen * 8;

      // ---------- Step 2: housing ----------
      // Property type — exact match bonus, "mixed" partially matches anything
      if (prefs.propertyType && prefs.propertyType !== 'any') {
        if (s.property_mix === prefs.propertyType) {
          score += 8;
          reasons.push(`lots of ${s.property_mix}`);
        } else if (s.property_mix === 'mixed') {
          score += 4;
        }
      }
      maxScore += 8;

      // Budget: penalise suburbs significantly more expensive than budget.
      const budget = prefs.budget; // AUD
      const price = s.median_house_price;
      let budgetScore = 0;
      if (price <= budget) budgetScore = 1;
      else if (price <= budget * 1.15) budgetScore = 0.7;
      else if (price <= budget * 1.35) budgetScore = 0.3;
      else budgetScore = 0;
      score += budgetScore * 14;
      maxScore += 14;
      if (budgetScore < 0.3) reasons.push('a stretch on the budget');

      // New estate vs established
      // prefs.newEstate: 'new' | 'established' | 'either'
      if (prefs.newEstate === 'new') {
        score += s.new_estate ? 6 : 0;
      } else if (prefs.newEstate === 'established') {
        score += s.new_estate ? 0 : 6;
      } else {
        score += 3;
      }
      maxScore += 6;

      // ---------- Step 3: people ----------
      // Cultural communities — overlap bonus
      const wantedCultures = prefs.cultures ?? [];
      if (wantedCultures.length > 0) {
        const suburbCultures = (s.cultural_communities ?? []).map((c) =>
          c.toLowerCase()
        );
        const overlap = wantedCultures.filter((c) =>
          suburbCultures.includes(c.toLowerCase())
        ).length;
        const cultureScore = Math.min(overlap / wantedCultures.length, 1);
        score += cultureScore * 8;
        if (cultureScore > 0.5) {
          reasons.push('strong community vibe');
        }
      }
      maxScore += 8;

      // Life stage slider 0..1: 0 = young single, 0.5 = family, 1 = retiree
      const ls = prefs.lifeStage;
      let lifeStageScore = 0;
      if (ls < 0.34) {
        // young/single: nightlife + cafes
        lifeStageScore =
          (norm10(s.nightlife_score) + norm10(s.cafe_score)) / 2;
      } else if (ls < 0.67) {
        // family: schools, family score, dog friendly
        lifeStageScore =
          (norm10(s.school_score) +
            norm10(s.family_score) +
            norm10(s.green_space_score)) /
          3;
      } else {
        // retiree: walkability, green space, transport
        lifeStageScore =
          (norm10(s.walkability_score) +
            norm10(s.green_space_score) +
            norm10(s.transport_score)) /
          3;
      }
      score += lifeStageScore * 8;
      maxScore += 8;

      // Retiree friendly toggle — extra weight on walkability+transport
      if (prefs.retireeFriendly) {
        const r =
          (norm10(s.walkability_score) + norm10(s.transport_score)) / 2;
        score += r * 6;
        maxScore += 6;
      }

      // ---------- Step 4: getting around ----------
      const wTransport = star(prefs.transport);
      const wSchool = star(prefs.school);
      const wWalk = star(prefs.walkability);
      score += wTransport * norm10(s.transport_score) * 8;
      maxScore += wTransport * 8;
      score += wSchool * norm10(s.school_score) * 8;
      maxScore += wSchool * 8;
      score += wWalk * norm10(s.walkability_score) * 8;
      maxScore += wWalk * 8;

      // Commute tolerance 0..1 (0 = hate commute, 1 = don't mind)
      // Penalise long CBD distance more if user hates commute.
      const distNorm = Math.min(s.cbd_distance_km, 60) / 60;
      const commutePenalty = (1 - prefs.commuteTolerance) * distNorm;
      score -= commutePenalty * 10;
      maxScore += 0; // negative penalty; don't add to max

      // ---------- Step 5: vibe dial ----------
      // Bogan tolerance: 0 = no boguns, 1 = bring 'em
      const boganNorm = norm10(s.bogan_score);
      const boganGap = Math.abs(prefs.boganTolerance - boganNorm);
      score += (1 - boganGap) * 6;
      maxScore += 6;

      // Hipster tolerance
      const hipNorm = norm10(s.hipster_score);
      const hipGap = Math.abs(prefs.hipsterTolerance - hipNorm);
      score += (1 - hipGap) * 6;
      maxScore += 6;

      // Neighbour judgment sensitivity 0..1
      // Higher sensitivity = avoid suburbs with extreme reputations
      // (we proxy "extreme" as either very high hipster or very high bogan).
      const extremity = Math.max(hipNorm, boganNorm) - 0.5;
      score -= prefs.judgmentSensitivity * Math.max(0, extremity) * 6;

      // AFL culture toggle
      if (prefs.aflCulture) {
        score += s.afl_culture ? 4 : -2;
        maxScore += 4;
      }

      // Dog owner toggle
      if (prefs.dogOwner) {
        score += norm10(s.dog_friendly_score) * 6;
        maxScore += 6;
      }

      const normalised = maxScore > 0 ? Math.max(0, score) / maxScore : 0;
      return {
        suburb: s,
        rawScore: score,
        score: Math.round(normalised * 100),
        reasons,
      };
    })
    .sort((a, b) => b.rawScore - a.rawScore);
}

export function shortlistTop(suburbs, prefs, n = 5) {
  return scoreSuburbs(suburbs, prefs).slice(0, n);
}
