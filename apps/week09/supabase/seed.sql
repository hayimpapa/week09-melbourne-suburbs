-- Seed data for melbourne_suburbs (~60 suburbs).
-- Numbers are vibes-based approximations, not financial advice.
-- Run after schema.sql. Safe to re-run: truncates first.

truncate table public.melbourne_suburbs restart identity;

insert into public.melbourne_suburbs
  (name, region, median_house_price, property_mix,
   beach_score, hills_score, cbd_distance_km,
   transport_score, cafe_score, nightlife_score, green_space_score,
   walkability_score, school_score, family_score,
   cultural_communities, hipster_score, bogan_score,
   afl_culture, new_estate, dog_friendly_score)
values
  -- ============ INNER NORTH ============
  ('Fitzroy',        'Inner North', 1450000, 'mixed',       1, 1, 3, 10, 10, 10, 5, 10, 6, 5, '{"Italian","Vietnamese","LGBTIQ+"}', 10, 2, true,  false, 8),
  ('Collingwood',    'Inner North', 1350000, 'mixed',       1, 1, 3, 10, 10, 10, 4,  9, 5, 4, '{"Vietnamese","Italian","Greek"}',   10, 2, true,  false, 7),
  ('Carlton',        'Inner North', 1500000, 'mixed',       1, 1, 2, 10, 10,  9, 6,  9, 7, 5, '{"Italian","Chinese","Indian"}',      9, 2, true,  false, 7),
  ('Brunswick',      'Inner North', 1250000, 'mixed',       1, 1, 5, 10, 10,  9, 6,  9, 6, 6, '{"Lebanese","Italian","Greek"}',     10, 3, true,  false, 8),
  ('Northcote',      'Inner North', 1400000, 'houses',      1, 1, 6,  9, 10,  8, 7,  8, 7, 7, '{"Greek","Italian"}',                10, 3, true,  false, 8),
  ('Thornbury',      'Inner North', 1200000, 'houses',      1, 1, 7,  8,  9,  7, 6,  7, 6, 7, '{"Greek","Italian","Lebanese"}',      9, 4, true,  false, 8),
  ('Coburg',         'Inner North',  980000, 'houses',      1, 2, 8,  8,  8,  6, 6,  7, 6, 7, '{"Lebanese","Turkish","Italian"}',    7, 5, true,  false, 7),
  ('Preston',        'Inner North',  950000, 'houses',      1, 2, 9,  8,  8,  6, 6,  7, 5, 7, '{"Greek","Macedonian","Vietnamese"}', 7, 6, true,  false, 7),
  ('Clifton Hill',   'Inner North', 1500000, 'houses',      1, 1, 4,  9,  9,  6, 7,  8, 7, 8, '{"Italian"}',                         8, 2, true,  false, 9),
  ('Princes Hill',   'Inner North', 1700000, 'houses',      1, 1, 4,  8,  9,  6, 8,  8, 8, 8, '{"Italian","Jewish"}',                8, 2, true,  false, 8),

  -- ============ INNER EAST ============
  ('Richmond',       'Inner East',  1300000, 'mixed',       1, 1, 4, 10, 10, 10, 5,  9, 6, 5, '{"Vietnamese","Greek"}',              9, 3, true,  false, 7),
  ('Hawthorn',       'Inner East',  2100000, 'houses',      1, 2, 6,  9,  8,  7, 7,  8, 9, 8, '{"Chinese","Anglo"}',                 6, 3, true,  false, 8),
  ('Kew',            'Inner East',  2400000, 'houses',      1, 2, 7,  7,  7,  5, 8,  6, 9, 8, '{"Chinese","Anglo"}',                 5, 3, true,  false, 8),
  ('Camberwell',     'Inner East',  2300000, 'houses',      1, 2, 9,  8,  8,  6, 7,  7, 9, 8, '{"Chinese","Anglo"}',                 5, 3, true,  false, 8),
  ('Surrey Hills',   'Inner East',  2000000, 'houses',      1, 2,11,  7,  7,  4, 7,  6, 9, 8, '{"Chinese","Anglo"}',                 4, 3, true,  false, 8),

  -- ============ INNER SOUTH ============
  ('South Yarra',    'Inner South', 1700000, 'apartments',  3, 1, 4, 10, 10, 10, 5,  9, 7, 5, '{"International","LGBTIQ+"}',         8, 4, false, false, 6),
  ('Prahran',        'Inner South', 1500000, 'mixed',       3, 1, 5, 10, 10, 10, 5,  9, 6, 5, '{"LGBTIQ+","Greek"}',                 9, 3, false, false, 7),
  ('Windsor',        'Inner South', 1400000, 'mixed',       3, 1, 5,  9, 10,  9, 5,  9, 6, 5, '{"LGBTIQ+"}',                         9, 3, false, false, 7),
  ('St Kilda',       'Inner South', 1300000, 'apartments',  9, 1, 6, 10,  9, 10, 7,  9, 5, 5, '{"Jewish","Russian","LGBTIQ+"}',     10, 4, false, false, 9),
  ('Albert Park',    'Inner South', 2300000, 'houses',      8, 1, 4,  8,  9,  7, 9,  9, 8, 8, '{"Anglo"}',                           7, 3, false, false, 9),
  ('Middle Park',    'Inner South', 2400000, 'houses',      9, 1, 5,  8,  8,  6, 9,  8, 8, 9, '{"Anglo"}',                           6, 3, false, false, 9),
  ('Toorak',         'Inner South', 4500000, 'houses',      2, 1, 5,  7,  7,  5, 7,  7, 9, 7, '{"Anglo","International"}',           4, 2, false, false, 7),
  ('Armadale',       'Inner South', 2200000, 'mixed',       3, 1, 7,  8,  8,  6, 6,  8, 8, 7, '{"Anglo","Jewish"}',                  6, 3, false, false, 7),
  ('Caulfield',      'Inner South', 1700000, 'mixed',       3, 1, 9,  8,  7,  5, 7,  7, 8, 8, '{"Jewish","Russian"}',                5, 3, true,  false, 7),

  -- ============ INNER WEST ============
  ('Footscray',      'Inner West',   850000, 'mixed',       1, 1, 5, 10,  9,  8, 5,  8, 5, 5, '{"Vietnamese","Ethiopian","Sudanese","Indian"}', 8, 5, true, false, 7),
  ('Yarraville',     'Inner West',  1100000, 'houses',      1, 1, 7,  8,  9,  7, 7,  8, 7, 8, '{"Italian","Greek"}',                 9, 4, true,  false, 8),
  ('Seddon',         'Inner West',  1100000, 'houses',      1, 1, 6,  8,  9,  7, 6,  8, 6, 8, '{"Italian","Vietnamese"}',            9, 4, true,  false, 8),
  ('Kensington',     'Inner West',  1050000, 'mixed',       1, 1, 4,  9,  8,  6, 7,  8, 6, 7, '{"African","Vietnamese"}',            8, 4, true,  false, 8),
  ('Williamstown',   'Inner West',  1500000, 'houses',      8, 1, 9,  7,  8,  6, 9,  7, 7, 9, '{"Anglo","Italian"}',                 7, 4, true,  false, 9),
  ('Newport',        'Inner West',  1100000, 'houses',      6, 1, 9,  7,  7,  5, 8,  7, 7, 8, '{"Italian","Anglo"}',                 7, 5, true,  false, 8),

  -- ============ BAYSIDE ============
  ('Brighton',       'Bayside',     2800000, 'houses',     10, 1,11,  6,  7,  5, 8,  6, 9, 9, '{"Anglo","Jewish"}',                  4, 4, false, false, 9),
  ('Sandringham',    'Bayside',     1900000, 'houses',     10, 1,16,  6,  7,  4, 8,  6, 8, 9, '{"Anglo"}',                           5, 4, false, false, 9),
  ('Hampton',        'Bayside',     2100000, 'houses',     10, 1,14,  6,  7,  4, 8,  6, 9, 9, '{"Anglo"}',                           4, 4, false, false, 9),
  ('Black Rock',     'Bayside',     1900000, 'houses',     10, 2,18,  5,  6,  3, 8,  5, 8, 9, '{"Anglo"}',                           4, 5, false, false, 10),
  ('Beaumaris',      'Bayside',     1800000, 'houses',     10, 2,20,  5,  6,  3, 9,  5, 8, 9, '{"Anglo"}',                           4, 5, false, false, 10),
  ('Mentone',        'Bayside',     1300000, 'houses',     10, 1,22,  7,  6,  4, 7,  6, 7, 8, '{"Italian","Anglo"}',                 5, 5, true,  false, 9),
  ('Mordialloc',     'Bayside',     1100000, 'houses',     10, 1,24,  7,  6,  4, 7,  6, 7, 8, '{"Anglo","Italian"}',                 5, 6, true,  false, 9),
  ('Elwood',         'Bayside',     1700000, 'apartments',  9, 1, 8,  8,  9,  7, 7,  8, 7, 8, '{"Jewish","LGBTIQ+"}',                8, 3, false, false, 9),

  -- ============ OUTER EAST ============
  ('Box Hill',       'Outer East',  1500000, 'mixed',       1, 2,14,  9,  8,  6, 6,  8, 8, 7, '{"Chinese","Korean","Indian"}',       4, 3, true,  false, 6),
  ('Doncaster',      'Outer East',  1500000, 'houses',      1, 3,15,  6,  6,  4, 7,  5, 8, 8, '{"Chinese","Iranian"}',               3, 4, true,  false, 7),
  ('Glen Waverley',  'Outer East',  1700000, 'houses',      1, 3,19,  7,  7,  5, 7,  6, 9, 8, '{"Chinese","Indian","Sri Lankan"}',   3, 4, true,  false, 7),
  ('Mount Waverley', 'Outer East',  1600000, 'houses',      1, 3,17,  6,  6,  4, 7,  5, 9, 8, '{"Chinese","Indian"}',                3, 4, true,  false, 7),
  ('Ringwood',       'Outer East',   950000, 'houses',      1, 5,23,  7,  6,  4, 7,  6, 7, 8, '{"Anglo","Indian"}',                  4, 6, true,  false, 7),
  ('Croydon',        'Outer East',   850000, 'houses',      1, 6,28,  6,  5,  3, 7,  5, 6, 7, '{"Anglo"}',                           3, 7, true,  false, 8),
  ('Lilydale',       'Outer East',   780000, 'houses',      1, 7,33,  5,  5,  3, 8,  4, 6, 7, '{"Anglo"}',                           3, 7, true,  false, 8),

  -- ============ OUTER SOUTH EAST ============
  ('Dandenong',      'South East',   720000, 'mixed',       1, 2,30,  8,  6,  4, 5,  6, 5, 6, '{"Indian","Sri Lankan","Afghan","Sudanese"}', 3, 7, true, false, 6),
  ('Berwick',        'South East',   850000, 'houses',      1, 4,42,  4,  6,  3, 7,  4, 8, 9, '{"Indian","Anglo"}',                  3, 6, true,  true,  8),
  ('Pakenham',       'South East',   650000, 'houses',      1, 4,55,  4,  5,  3, 7,  4, 7, 9, '{"Indian","Anglo"}',                  2, 7, true,  true,  8),
  ('Cranbourne',     'South East',   650000, 'houses',      1, 2,45,  4,  5,  3, 6,  4, 6, 8, '{"Indian","Anglo","Filipino"}',       2, 7, true,  true,  7),
  ('Frankston',      'South East',   700000, 'houses',      9, 2,42,  6,  6,  4, 7,  5, 6, 7, '{"Anglo"}',                           4, 8, true,  false, 8),
  ('Mornington',     'South East',  1100000, 'houses',      9, 4,57,  4,  7,  4, 8,  5, 7, 8, '{"Anglo"}',                           5, 6, true,  false, 9),

  -- ============ WESTERN SUBURBS ============
  ('Werribee',       'Western',      650000, 'houses',      4, 1,32,  6,  5,  3, 6,  5, 6, 8, '{"Indian","Filipino","Sudanese"}',    2, 7, true,  true,  7),
  ('Point Cook',     'Western',      820000, 'houses',      6, 1,25,  4,  6,  3, 7,  4, 8, 9, '{"Indian","Filipino"}',               2, 6, false, true,  8),
  ('Sunshine',       'Western',      820000, 'mixed',       1, 1,12,  9,  7,  5, 5,  7, 5, 6, '{"Vietnamese","Maltese","African"}',  4, 6, true,  false, 6),
  ('Altona',         'Western',     1050000, 'houses',      8, 1,13,  7,  7,  4, 8,  6, 7, 8, '{"Italian","Greek","Maltese"}',       5, 5, true,  false, 9),
  ('Tarneit',        'Western',      680000, 'houses',      3, 1,28,  5,  5,  3, 6,  4, 7, 8, '{"Indian","Sudanese","Filipino"}',    2, 7, false, true,  7),
  ('Hoppers Crossing','Western',     680000, 'houses',      4, 1,24,  6,  5,  3, 6,  5, 6, 7, '{"Indian","Filipino","Vietnamese"}',  2, 7, true,  false, 7),

  -- ============ NORTHERN OUTER ============
  ('Epping',         'Northern',     720000, 'houses',      1, 2,18,  6,  6,  3, 6,  5, 6, 7, '{"Italian","Lebanese","Indian"}',     3, 7, true,  false, 7),
  ('Mill Park',      'Northern',     780000, 'houses',      1, 3,19,  5,  5,  3, 7,  5, 7, 8, '{"Italian","Greek","Lebanese"}',      3, 7, true,  false, 7),
  ('Bundoora',       'Northern',     900000, 'houses',      1, 3,16,  6,  6,  4, 7,  5, 7, 8, '{"Italian","Indian","Chinese"}',      3, 6, true,  false, 7),
  ('Greensborough',  'Northern',     900000, 'houses',      1, 4,18,  6,  6,  3, 8,  5, 7, 8, '{"Italian","Anglo"}',                 3, 6, true,  false, 8),
  ('Eltham',         'Northern',    1100000, 'houses',      1, 6,20,  5,  6,  4, 9,  5, 8, 9, '{"Anglo"}',                           5, 5, true,  false, 9),
  ('Diamond Creek',  'Northern',    1000000, 'houses',      1, 7,24,  4,  5,  3, 9,  4, 7, 9, '{"Anglo"}',                           5, 5, true,  false, 9),

  -- ============ HILLS ============
  ('Belgrave',       'Dandenong Ranges', 780000, 'houses',  1,10,40,  5,  6,  3,10,  5, 6, 8, '{"Anglo"}',                           7, 5, false, false, 10),
  ('Olinda',         'Dandenong Ranges', 950000, 'acreage', 1,10,42,  3,  6,  2,10,  3, 6, 8, '{"Anglo"}',                           6, 4, false, false, 10),
  ('Warrandyte',     'Dandenong Ranges',1300000, 'acreage', 1, 8,25,  3,  6,  3,10,  4, 7, 9, '{"Anglo"}',                           6, 4, false, false, 10),

  -- ============ CBD / DOCKLANDS ============
  ('Melbourne CBD',  'CBD',          650000, 'apartments',  3, 1, 0, 10, 10, 10, 4, 10, 5, 3, '{"International","Chinese","Indian"}',8, 3, true, false, 4),
  ('Docklands',      'CBD',          720000, 'apartments',  6, 1, 2,  9,  7,  7, 5,  8, 5, 4, '{"International","Chinese"}',         5, 3, false, true,  5),
  ('Southbank',      'CBD',          720000, 'apartments',  4, 1, 1, 10,  9,  9, 4,  9, 5, 4, '{"International","Chinese"}',         7, 3, false, false, 4);
