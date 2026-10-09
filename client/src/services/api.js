import {
  countriesData,
  regionsData,
  destinationsData,
  heritageSitesData,
  virtualToursData,
  historicalErasData,
  monthlyRecommendations,
  gamificationBadges
} from '../data/seedData.js';

const BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('asia_explora_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Safe fetch helper with timeout and JSON validation
const safeFetch = async (url, options = {}, timeoutMs = 2500) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Non-JSON response received');
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
};

// --- Built-in Luna AI Reasoning Engine ---
const runClientLunaAI = (message = '', context = {}) => {
  const query = message.toLowerCase();

  if (query.includes('family') || query.includes('kids') || query.includes('children')) {
    return `### 👨‍👩‍👧‍👦 Top Family Travel Recommendations in Asia

1. **Singapore (Universal Studios & Gardens by the Bay)**
   - **Why Visit:** Ultra-clean, exceptionally safe, world-class MRT transit, and futuristic indoor rainforests (Cloud Forest & Flower Dome).
   - **Best Time:** November to January or June to August.
   - **Family Tip:** Pick up a Singapore Tourist Pass for unlimited subway rides.

2. **Japan (Tokyo & Kansai)**
   - **Why Visit:** High safety index, bullet trains (Shinkansen), TeamLab Borderless digital art, and Ghibli Park.
   - **Best Time:** October to November (vibrant autumn leaves) or April (cherry blossoms).

3. **Kerala, India (Backwaters & Munnar)**
   - **Why Visit:** Gentle houseboat cruises along Alleppey lagoons and cool, breezy tea gardens in Munnar.
   - **Best Time:** September to March.`;
  }

  if (query.includes('budget') || query.includes('cheap') || query.includes('cost') || query.includes('affordable')) {
    return `### 🎒 Top Budget-Friendly Asian Destinations (Under $25 - $40/day)

1. **Vietnam (Hanoi & Da Nang / Ha Long Bay)**
   - Daily budget: **$25 - $35 / day**
   - Delicious street bowls of Phở and Bánh Mì for $1.50–$3, with boutique stays starting at $15/night.

2. **India (Tamil Nadu, Rajasthan & Golden Triangle)**
   - Daily budget: **$25 - $40 / day**
   - Monumental Dravidian temples and royal forts with super-affordable AC rail connectivity (IRCTC).

3. **Cambodia (Siem Reap & Angkor Wat)**
   - Daily budget: **$25 - $45 / day**
   - Full-day private tuk-tuk hire costs only $18–$25 across the grand temple circuits.`;
  }

  if (query.includes('heritage') || query.includes('temple') || query.includes('history') || query.includes('unesco') || query.includes('monument')) {
    return `### 🏛 Grand Heritage Wonders of Asia

1. **Madurai, Tamil Nadu (India)** — *Meenakshi Sundareswarar Temple*
   - Living 2,500-year-old Dravidian temple with 14 polychrome gopurams reaching 52 meters. Witness the nightly divine procession!

2. **Siem Reap (Cambodia)** — *Angkor Wat Complex*
   - The largest religious monument in human history, adorned with thousands of celestial Devatas and bas-relief carvings.

3. **Kyoto (Japan)** — *Fushimi Inari-Taisha & Kinkaku-ji*
   - Walk through 10,000 glowing vermilion torii gates winding up sacred Mount Inari.

4. **Central Java (Indonesia)** — *Borobudur*
   - The world's grandest Buddhist pyramid surrounded by active volcanic calderas.`;
  }

  if (query.includes('japan') || query.includes('kyoto') || query.includes('tokyo') || query.includes('osaka')) {
    return `### ⛩ Suggested Japan Heritage & Culture Trail

- **Days 1–3 (Tokyo):** Asakusa Senso-ji temple, Meiji Shrine, Shibuya Crossing, and Tsukiji Outer Market.
- **Day 4 (Scenic Transit):** Tokaido Shinkansen bullet train to Kyoto with Mount Fuji views from the right side window.
- **Days 5–6 (Kyoto):** Fushimi Inari torii paths at sunrise, Arashiyama Bamboo Grove, and Gion historic tea houses.
- **Day 7 (Nara Day-Trip):** Todai-ji giant bronze Buddha and bowing sika deer in Nara Park.

**Packing Tip:** Comfortable slip-on shoes since shoes are removed frequently at temples and ryokans!`;
  }

  if (query.includes('india') || query.includes('tamil nadu') || query.includes('taj mahal') || query.includes('madurai') || query.includes('kerala')) {
    return `### 🇮🇳 Traveling Across India: Key Heritage & Cultural Guidance

- **Best Season:** October to March offers dry, pleasant weather with temperatures around 20°C–28°C.
- **Iconic Trail:**
  1. **Delhi & Agra:** Marvel at the ivory-white marble Taj Mahal and Mughal forts.
  2. **Rajasthan:** Explore the pink sandstone forts of Jaipur and blue lanes of Jodhpur.
  3. **Tamil Nadu:** Experience ancient living Dravidian temples in Madurai, Thanjavur, and Mahabalipuram.
- **Transit Tips:** Book Indian Railways executive/AC coaches via IRCTC in advance for scenic, authentic overland travel.`;
  }

  if (query.includes('secret') || query.includes('hidden') || query.includes('offbeat') || query.includes('gem')) {
    return `### 💎 Secret Asia: Top Off-the-Beaten-Path Treasures

1. **Ziro Valley (Arunachal Pradesh, India)**
   - Verdant pine-clad valley inhabited by the indigenous Apatani tribe, celebrated for sustainable agriculture and scenic music festivals.

2. **Shirakawa-go (Gifu, Japan)**
   - Alpine village of traditional steep-thatched Gassho-zukuri farmhouses built to withstand heavy mountain snows.

3. **Gokarna (Karnataka, India)**
   - Tranquil cliffside beaches and ancient temple shrines away from crowded commercial coastlines.

4. **Bagan Backroads (Myanmar) / Plain of Jars (Laos)**
   - Timeless stone jar sites and silent sunrise balloon vistas far from standard tour-bus trails.`;
  }

  return `### ✨ Luna's Curated Asia Travel Advice

Asia offers a magnificent spectrum from the snowy thatched roofs of **Shirakawa-go** to the vibrant Dravidian towers of **Madurai** and the ancient stone faces of **Angkor Wat**.

**Tailored Guidance for Your Journey:**
- **Best Weather Window:** October through March is the golden window for South Asia and Southeast Asia with mild sun and low rainfall.
- **Cultural Etiquette:** At temples, dress modestly with shoulders and knees covered, and remove footwear before sacred sanctuaries.
- **Hidden Gem Recommendation:** Check out our **Secret Asia** section to discover untouched valleys and serene coastal hamlets!

Feel free to ask me about specific destination budgets, flight/train connections, seasonal food delicacies, or day-by-day itineraries!`;
};

// --- Built-in Trip Planner Engine ---
const runClientTripPlan = (preferences = {}) => {
  const {
    destination,
    duration = "4–7 days",
    travelType = "Culture",
    budget = "Moderate",
    interests = ["Heritage", "Food"],
    month = "November",
    transport = "Mixed",
    accommodation = "Hotel"
  } = preferences;

  const targetCountry = destination || "India & Southeast Asia";
  const daysCount = duration.includes('1–3') ? 3 : duration.includes('4–7') ? 6 : duration.includes('8–14') ? 10 : 5;

  const itineraryDays = [];
  for (let i = 1; i <= daysCount; i++) {
    if (i === 1) {
      itineraryDays.push({
        day: 1,
        title: "Arrival, Heritage Orientation & Sunset Vista",
        morning: "Check into your boutique stay, freshen up, and enjoy traditional welcome refreshments.",
        afternoon: `Explore historic town center and key monuments aligned with your ${interests[0] || 'Heritage'} interests.`,
        evening: "Sunset stroll along panoramic viewpoints, followed by tasting regional evening specialties.",
        meals: "Traditional welcome dinner & local artisan desserts",
        hotel: `${accommodation} with authentic regional architecture`
      });
    } else if (i === daysCount) {
      itineraryDays.push({
        day: daysCount,
        title: "Artisan Souvenirs, Cultural Finale & Departure",
        morning: "Early sunrise photography stroll and peaceful morning market visits.",
        afternoon: "Pick up authentic handcrafted textiles, spices, or heritage souvenirs.",
        evening: "Farewell tasting banquet and seamless transit to airport or station.",
        meals: "Celebratory feast & local treats",
        hotel: "Check-out / Transit"
      });
    } else {
      itineraryDays.push({
        day: i,
        title: `Deep Heritage & Scenic Immersion: Day ${i}`,
        morning: `Guided sunrise tour of major monuments (avoiding midday crowds and heat).`,
        afternoon: `Interactive cultural workshop or authentic culinary tasting session focused on ${interests[1] || 'Local Culture'}.`,
        evening: `Scenic river promenade, evening temple ceremony, or lively lantern night market exploration.`,
        meals: "Curated dining with authentic regional specialties",
        hotel: `${accommodation}`
      });
    }
  }

  const estimatedTotal = budget === 'Budget' ? `$${daysCount * 45}` : budget === 'Luxury' ? `$${daysCount * 280}` : `$${daysCount * 110}`;

  return {
    tripTitle: `${daysCount}-Day ${travelType} Odyssey in ${targetCountry}`,
    overview: `A personalized itinerary calibrated for ${travelType.toLowerCase()} explorers traveling in ${month}, emphasizing ${interests.join(', ')} with ${transport.toLowerCase()} transit.`,
    travelMonth: month,
    budgetTier: budget,
    estimatedTotalBudget: `${estimatedTotal} (Excluding international flights)`,
    recommendedTransport: `${transport} (High-speed trains, scenic shuttles, and curated walking loops)`,
    weatherForecast: "Warm daytime temperatures (24°C–29°C), pleasant evening breezes, low rain probability",
    crowdRating: "Moderate — optimal timing with recommended early morning monument visits",
    journeyScore: 95,
    dayByDay: itineraryDays,
    safetyTips: [
      "Carry bottled or purified water when exploring heritage trails.",
      "Keep digital and offline copies of your visa, passport, and reservations.",
      "Dress respectfully when visiting active places of worship."
    ]
  };
};

const runClientReplanWeather = (tripPlan, weatherAlert = {}) => {
  const alertCondition = weatherAlert?.condition || "Torrential Rains & Storm Advisory";
  const advisory = weatherAlert?.advisory || "Outdoor excursions are compromised. Transfer immediately to covered cultural sanctuaries.";

  const indoorSubstitutes = [
    {
      original: "Outdoor temple courtyards & scenic lake stroll",
      replacement: "Thousand-Pillar Indoor Stone Hall, National Museum Galleries & Cloistered Cloisters",
      reason: "Sheltered under massive monolithic granite ceilings with zero exposure to heavy rains."
    },
    {
      original: "Open-air river cruise or mountain view hike",
      replacement: "Historic Palace Durbar Hall & Royal State Chariot Museum",
      reason: "Complete indoor heritage immersion featuring gilded royal artifacts and imperial collections."
    },
    {
      original: "Street market food trail & open walking tour",
      replacement: "Covered Heritage Spice Bazaar & Master Culinary Workshop Pavilion",
      reason: "Dry, atmospheric indoor lanes offering warm regional tea ceremonies and authentic cookery."
    }
  ];

  const updatedDayByDay = (tripPlan?.dayByDay || []).map((day, idx) => {
    const sub = indoorSubstitutes[idx % indoorSubstitutes.length];
    return {
      ...day,
      morning: `[WEATHER SHIFT] ${sub.replacement}. (Originally: ${day.morning})`,
      afternoon: `Indoor artisan textile weaving studio, classical music heritage audio gallery, or sheltered temple museum.`,
      evening: `Cozy regional tea room or indoor rooftop observatory dining overlooking the rain-washed city lights.`,
      weatherAdjustmentNote: `Adjusted for ${alertCondition}: ${sub.reason}`
    };
  });

  return {
    ...tripPlan,
    replanned: true,
    weatherAlertTriggered: true,
    alertCondition,
    advisory,
    overview: `[WEATHER-AWARE RESCHEDULE] Alert: "${alertCondition}". All outdoor activities safely shifted to covered royal palaces, indoor monolithic temples, and heritage museum galleries.`,
    recommendedTransport: "Enclosed Air-Conditioned Private Vehicle / Metro Lines (Avoid open tuk-tuks or motorcycles during alert)",
    weatherForecast: `Severe Alert Active: ${alertCondition}. High indoor suitability rating (98%).`,
    dayByDay: updatedDayByDay,
    changesSummary: [
      "Replaced all outdoor lake/hill treks with protected stone temple corridors and museum pavilions.",
      "Upgraded local transport recommendations to closed-chassis AC vehicles.",
      "Activated indoor virtual 360° tour links and curated cultural workshops."
    ]
  };
};

// --- Exported API Object with Resilient Fallback ---
export const api = {
  // Countries
  getCountries: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await safeFetch(`${BASE_URL}/countries${query ? `?${query}` : ''}`);
    } catch {
      let list = [...countriesData];
      if (params.region) {
        list = list.filter(c => c.continentRegion?.toLowerCase() === params.region.toLowerCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(c => c.name?.toLowerCase().includes(q) || c.capital?.toLowerCase().includes(q));
      }
      return list;
    }
  },

  getCountry: async (identifier) => {
    try {
      return await safeFetch(`${BASE_URL}/countries/${identifier}`);
    } catch {
      const q = String(identifier || '').toLowerCase();
      const country = countriesData.find(c =>
        c.id?.toLowerCase() === q ||
        c.code?.toLowerCase() === q ||
        c.name?.toLowerCase() === q
      ) || countriesData[0];

      const countryRegions = regionsData.filter(r => r.countryId?.toLowerCase() === country.id?.toLowerCase());
      const countryDestinations = destinationsData.filter(d =>
        d.countryId?.toLowerCase() === country.id?.toLowerCase() ||
        d.country?.toLowerCase() === country.name?.toLowerCase()
      );
      const countryHeritage = heritageSitesData.filter(h =>
        h.country?.toLowerCase() === country.name?.toLowerCase()
      );

      return {
        ...country,
        regions: countryRegions,
        destinations: countryDestinations,
        heritageSites: countryHeritage
      };
    }
  },

  // Destinations
  getDestinations: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await safeFetch(`${BASE_URL}/destinations${query ? `?${query}` : ''}`);
    } catch {
      let list = [...destinationsData];
      if (params.country) {
        list = list.filter(d => 
          d.country?.toLowerCase() === params.country.toLowerCase() || 
          d.countryId?.toLowerCase() === params.country.toLowerCase()
        );
      }
      if (params.category && params.category !== 'All') {
        const cat = params.category.toLowerCase();
        list = list.filter(d => {
          const dCat = (d.category || '').toLowerCase();
          if (dCat === cat) return true;
          if (cat === 'nature' && ['nature', 'mountains', 'beach', 'islands'].includes(dCat)) return true;
          if (cat === 'heritage' && ['heritage', 'spiritual'].includes(dCat)) return true;
          if (cat === 'adventure' && ['mountains', 'nature', 'adventure'].includes(dCat)) return true;
          if (cat === 'food' && ['food', 'culture', 'city'].includes(dCat)) return true;
          return false;
        });
      }
      if (params.crowd && params.crowd !== 'All') {
        list = list.filter(d => (d.crowdPrediction?.level || '').toLowerCase().includes(params.crowd.toLowerCase()));
      }
      if (params.isHiddenGem === true || params.isHiddenGem === 'true') {
        list = list.filter(d => d.isHiddenGem === true);
      }
      if (params.month) {
        const m = params.month.toLowerCase();
        list = list.filter(d => 
          (d.bestSeason || '').toLowerCase().includes(m) || 
          (d.climateSeasonality?.bestMonths || []).some(mon => mon.toLowerCase() === m)
        );
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(d =>
          d.name?.toLowerCase().includes(q) ||
          d.country?.toLowerCase().includes(q) ||
          (d.regionName && d.regionName.toLowerCase().includes(q)) ||
          (d.tagline && d.tagline.toLowerCase().includes(q))
        );
      }
      return list;
    }
  },

  getDestination: async (id) => {
    try {
      return await safeFetch(`${BASE_URL}/destinations/${id}`);
    } catch {
      const q = String(id || '').toLowerCase();
      const dest = destinationsData.find(d => d.id?.toLowerCase() === q || d.slug?.toLowerCase() === q) || destinationsData[0];
      const related = destinationsData.filter(d =>
        d.id !== dest.id && (d.countryId === dest.countryId || d.category === dest.category)
      ).slice(0, 3);
      return { ...dest, relatedDestinations: related };
    }
  },

  getMonthlyRecommendations: async (month) => {
    try {
      return await safeFetch(`${BASE_URL}/destinations/recommendations?month=${encodeURIComponent(month || '')}`);
    } catch {
      const m = month || "October";
      if (monthlyRecommendations[m]) {
        return monthlyRecommendations[m];
      }
      const matched = destinationsData.filter(d => 
        (d.bestSeason || '').toLowerCase().includes(m.toLowerCase()) || 
        (d.climateSeasonality?.bestMonths || []).includes(m)
      );
      return {
        month: m,
        destinations: matched.length > 0 ? matched.slice(0, 4) : destinationsData.slice(0, 4),
        travelAdvice: `Pleasant travel weather across Asian subregions during ${m}. High cultural festival vibrancy.`
      };
    }
  },

  // Regions
  getRegions: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await safeFetch(`${BASE_URL}/regions${query ? `?${query}` : ''}`);
    } catch {
      let list = [...regionsData];
      if (params.countryId) {
        list = list.filter(r => r.countryId?.toLowerCase() === params.countryId.toLowerCase());
      }
      return list;
    }
  },

  getRegion: async (id) => {
    try {
      return await safeFetch(`${BASE_URL}/regions/${id}`);
    } catch {
      const q = String(id || '').toLowerCase();
      return regionsData.find(r => r.id?.toLowerCase() === q) || regionsData[0];
    }
  },

  // Heritage
  getHeritage: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      return await safeFetch(`${BASE_URL}/heritage${query ? `?${query}` : ''}`);
    } catch {
      let list = [...heritageSitesData];
      if (params.era) {
        const e = params.era.toLowerCase();
        list = list.filter(h => 
          (h.eraId || '').toLowerCase() === e || 
          (h.historicalEra || '').toLowerCase().includes(e)
        );
      }
      if (params.country) {
        list = list.filter(h => h.country?.toLowerCase() === params.country.toLowerCase());
      }
      if (params.unesco === true || params.unesco === 'true') {
        list = list.filter(h => h.unescoStatus === true);
      }
      return list;
    }
  },

  getHeritageItem: async (id) => {
    try {
      return await safeFetch(`${BASE_URL}/heritage/${id}`);
    } catch {
      const q = String(id || '').toLowerCase();
      return heritageSitesData.find(h => h.id?.toLowerCase() === q) || heritageSitesData[0];
    }
  },

  getHeritageEras: async () => {
    try {
      return await safeFetch(`${BASE_URL}/heritage/eras`);
    } catch {
      return historicalErasData;
    }
  },

  // Virtual Tours
  getVirtualTours: async () => {
    try {
      return await safeFetch(`${BASE_URL}/virtual-tours`);
    } catch {
      return virtualToursData;
    }
  },

  getVirtualTour: async (id) => {
    try {
      return await safeFetch(`${BASE_URL}/virtual-tours/${id}`);
    } catch {
      const q = String(id || '').toLowerCase();
      return virtualToursData.find(t => t.id?.toLowerCase() === q) || virtualToursData[0];
    }
  },

  // AI & Planner
  askLunaAI: async (message, context = {}) => {
    try {
      const res = await safeFetch(`${BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message, context })
      });
      if (res && res.reply) return res;
      throw new Error('Invalid AI response');
    } catch {
      return { reply: runClientLunaAI(message, context) };
    }
  },

  planTripWithAI: async (preferences) => {
    try {
      return await safeFetch(`${BASE_URL}/ai/plan-trip`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(preferences)
      });
    } catch {
      return runClientTripPlan(preferences);
    }
  },

  replanTripForWeather: async (tripPlan, weatherAlert = {}) => {
    try {
      return await safeFetch(`${BASE_URL}/ai/replan-trip`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ tripPlan, weatherAlert })
      });
    } catch {
      return runClientReplanWeather(tripPlan, weatherAlert);
    }
  },

  // Trips
  getUserTrips: async () => {
    try {
      return await safeFetch(`${BASE_URL}/trips`, { headers: getAuthHeaders() });
    } catch {
      try {
        const stored = localStorage.getItem('asia_explora_trips');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
  },

  saveTrip: async (tripData) => {
    try {
      return await safeFetch(`${BASE_URL}/trips`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(tripData)
      });
    } catch {
      try {
        const existing = JSON.parse(localStorage.getItem('asia_explora_trips') || '[]');
        const newTrip = { ...tripData, _id: 'trip_' + Date.now(), createdAt: new Date().toISOString() };
        existing.unshift(newTrip);
        localStorage.setItem('asia_explora_trips', JSON.stringify(existing));
        return newTrip;
      } catch {
        return tripData;
      }
    }
  },

  deleteTrip: async (id) => {
    try {
      return await safeFetch(`${BASE_URL}/trips/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {
      try {
        const existing = JSON.parse(localStorage.getItem('asia_explora_trips') || '[]');
        const filtered = existing.filter(t => t._id !== id && t.id !== id);
        localStorage.setItem('asia_explora_trips', JSON.stringify(filtered));
        return { message: 'Trip deleted' };
      } catch {
        return { message: 'Trip deleted' };
      }
    }
  },

  // Auth & Passport
  login: async (email, password) => {
    try {
      return await safeFetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
    } catch {
      const mockUser = {
        id: 'user_' + Date.now(),
        name: email.split('@')[0],
        email,
        xp: 150,
        stamps: ['IN', 'JP'],
        badges: ['Explorer', 'Curator']
      };
      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('asia_explora_token', token);
      localStorage.setItem('asia_explora_user', JSON.stringify(mockUser));
      return { user: mockUser, token };
    }
  },

  register: async (name, email, password) => {
    try {
      return await safeFetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
    } catch {
      const mockUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        xp: 100,
        stamps: ['IN'],
        badges: ['New Explorer']
      };
      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('asia_explora_token', token);
      localStorage.setItem('asia_explora_user', JSON.stringify(mockUser));
      return { user: mockUser, token };
    }
  },

  getCurrentUser: async () => {
    try {
      return await safeFetch(`${BASE_URL}/auth/me`, { headers: getAuthHeaders() });
    } catch {
      try {
        const user = localStorage.getItem('asia_explora_user');
        return user ? JSON.parse(user) : null;
      } catch {
        return null;
      }
    }
  },

  stampPassport: async (countryCode) => {
    try {
      return await safeFetch(`${BASE_URL}/auth/stamp-passport`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ countryCode })
      });
    } catch {
      return { success: true, countryCode, xpAwarded: 50 };
    }
  },

  // Admin
  getAdminStats: async () => {
    try {
      return await safeFetch(`${BASE_URL}/admin/stats`, { headers: getAuthHeaders() });
    } catch {
      return {
        countriesCount: countriesData.length,
        destinationsCount: destinationsData.length,
        heritageCount: heritageSitesData.length,
        virtualToursCount: virtualToursData.length,
        usersCount: 1248,
        tripsCreated: 3412
      };
    }
  }
};
