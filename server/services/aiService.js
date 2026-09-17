import { store } from '../data/store.js';

export const askLunaAI = async (message, context = {}) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Retrieve relevant context from store
  const countries = store.find('countries');
  const destinations = store.find('destinations');
  const heritageSites = store.find('heritage');

  const knowledgeSummary = `
You are "Luna", the elite AI Travel Assistant for "ASIA EXPLORA — Smart Tourism Information & Heritage Management".
You are knowledgeable, warm, inspiring, culturally respectful, and provide structured, high-value travel recommendations.
We have exhaustive database information on Asian nations such as:
- India (Madurai Meenakshi Amman, Agra Taj Mahal, Kerala backwaters, Rajasthan forts, Ziro Valley)
- Japan (Kyoto ancient temples, Tokyo, Shirakawa-go thatched alpine village)
- Cambodia (Angkor Wat temple complex in Siem Reap)
- Indonesia (Borobudur, Bali, Yogyakarta)
- Thailand (Chiang Mai, Bangkok, Phuket)
- Sri Lanka, Nepal, Bhutan, Maldives, Philippines, Uzbekistan, Turkey, UAE, Saudi Arabia, etc.
Current user question: "${message}"
Selected destination context: ${JSON.stringify(context || {})}
`;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${knowledgeSummary}\n\nPlease provide a clear, formatted, engaging response with bullet points and travel tips.` }]
              }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      }
    } catch (err) {
      console.warn("Gemini API call failed, using intelligent built-in Luna engine:", err.message);
    }
  }

  // Realistic intelligent fallback engine
  const query = message.toLowerCase();

  if (query.includes('family') || query.includes('kids')) {
    return `### 👨‍👩‍👧‍👦 Top Family Travel Recommendations in Asia

1. **Singapore (Universal Studios & Gardens by the Bay)**
   - **Why Visit:** Ultra-clean, exceptional public transit, futuristic indoor rainforests (Cloud Forest), and night safari experiences.
   - **Best Time:** November to January or June to August.
   - **Family Tip:** Get a Singapore Tourist Pass for unlimited MRT rides.

2. **Japan (Tokyo & Kansai)**
   - **Why Visit:** Safe, courteous culture with Ghibli Park, TeamLab Borderless, and bullet trains.
   - **Best Time:** October to November (vibrant autumn leaves) or April (cherry blossoms).

3. **Kerala, India (Backwaters & Munnar)**
   - **Why Visit:** Gentle houseboat cruises along Alleppey lagoons and cool, breezy tea gardens in Munnar.
   - **Best Time:** September to March.`;
  }

  if (query.includes('budget') || query.includes('cheap')) {
    return `### 🎒 Top Budget-Friendly Asian Destinations (Under $30 - $40/day)

1. **Vietnam (Hanoi & Ha Long Bay / Da Nang)**
   - Daily budget: **$25 - $35 / day**
   - Delicious street bowls of Phở for $2 and charming boutique hostels.

2. **India (Tamil Nadu, Rajasthan & Golden Triangle)**
   - Daily budget: **$25 - $40 / day**
   - World-class architectural wonders (Meenakshi Temple, Taj Mahal) with very affordable train networks.

3. **Cambodia (Siem Reap & Angkor Wat)**
   - Daily budget: **$25 - $45 / day**
   - Full-day private tuk-tuk hire costs only $18-$25.`;
  }

  if (query.includes('heritage') || query.includes('temple') || query.includes('history')) {
    return `### 🏛 Grand Heritage Wonders of Asia

1. **Madurai, Tamil Nadu (India)** — *Meenakshi Sundareswarar Temple*
   - Living 2,500-year-old Dravidian temple with 14 polychrome gopurams reaching 52 meters. Don't miss the nightly divine procession!

2. **Kyoto (Japan)** — *Fushimi Inari-Taisha & Kinkaku-ji*
   - Walk through 10,000 glowing vermilion torii gates winding up sacred Mount Inari.

3. **Siem Reap (Cambodia)** — *Angkor Wat*
   - The largest religious monument in human history, adorned with bas-relief carvings of apsara celestial dancers.

4. **Central Java (Indonesia)** — *Borobudur*
   - The world's grandest Buddhist pyramid surrounded by active volcanic calderas.`;
  }

  if (query.includes('japan') || query.includes('kyoto') || query.includes('tokyo')) {
    return `### ⛩ Suggested 7-Day Japan Heritage & Culture Itinerary

- **Days 1–3 (Tokyo):** Asakusa Senso-ji temple, Shibuya sky crossing, and Tsukiji outer fish market.
- **Day 4 (Scenic Transit):** Tokaido Shinkansen bullet train to Kyoto with Mount Fuji views from the right window.
- **Days 5–6 (Kyoto):** Fushimi Inari torii paths at sunrise, Arashiyama Bamboo Grove, and Gion geisha quarter.
- **Day 7 (Nara Day-Trip):** Todai-ji giant bronze Buddha and friendly bowing deer in Nara Park.

**Packing Tip:** Comfortable slip-on shoes since shoes are removed frequently at temples and ryokans!`;
  }

  if (query.includes('india') || query.includes('tamil nadu') || query.includes('taj mahal')) {
    return `### 🇮🇳 Traveling Across India: Key Heritage Guidance

- **Best Season:** October to March offers dry, pleasant weather with temperatures around 20°C–28°C.
- **Iconic Trail:** 
  1. **Delhi & Agra:** Marvel at the ivory-white marble Taj Mahal at sunrise.
  2. **Rajasthan:** Explore the pink sandstone forts of Jaipur and blue streets of Jodhpur.
  3. **Tamil Nadu:** Experience ancient Dravidian temple gopurams in Madurai, Thanjavur, and Mahabalipuram.
- **Transit Tips:** Book Indian Railways executive/AC coaches via IRCTC in advance for scenic, authentic overland travel.`;
  }

  return `### ✨ Luna's Personalized Asia Travel Advice

Asia offers a magnificent spectrum from the snowy thatched roofs of **Shirakawa-go** to the vibrant Dravidian towers of **Madurai** and the ancient stone faces of **Angkor Wat**.

**Recommendations tailored for your journey:**
- **Best Weather Window:** October through March is the golden window for South Asia and Southeast Asia.
- **Cultural Etiquette:** At temples, dress modestly with shoulders and knees covered, and remove footwear at the threshold.
- **Hidden Gem:** Check out our **Secret Asia** section to discover places like Ziro Valley in India and Shirakawa-go in Japan!

Ask me anytime about specific destination budgets, flight/train connections, local foods, or 12-month weather ratings!`;
};

export const generatePersonalizedItinerary = async (preferences) => {
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

  // Build a realistic, rich day-by-day itinerary
  const daysCount = duration.includes('1–3') ? 3 : duration.includes('4–7') ? 6 : duration.includes('8–14') ? 10 : 5;

  const itineraryDays = [];
  for (let i = 1; i <= daysCount; i++) {
    if (i === 1) {
      itineraryDays.push({
        day: 1,
        title: "Arrival, Heritage Orientation & Sunset Vista",
        morning: "Check into your boutique hotel, freshen up and enjoy traditional welcome tea.",
        afternoon: `Explore historic town center and key monuments aligned with your ${interests[0] || 'Heritage'} interests.`,
        evening: "Sunset walk along panoramic viewpoints, followed by tasting regional street specialties.",
        meals: "Traditional welcome dinner & local artisan desserts",
        hotel: `${accommodation} with local architectural character`
      });
    } else if (i === daysCount) {
      itineraryDays.push({
        day: daysCount,
        title: "Artisan Souvenirs, Cultural Finale & Departure",
        morning: "Early sunrise photography stroll and peaceful local market visits.",
        afternoon: "Pick up authentic handcrafted textiles, spices, or tea souvenirs.",
        evening: "Farewell dinner feast and seamless transit to the airport.",
        meals: "Celebratory tasting banquet",
        hotel: "Check-out / Transit"
      });
    } else {
      itineraryDays.push({
        day: i,
        title: `Deep Heritage & Scenic Exploration: Day ${i}`,
        morning: `Guided sunrise tour of major monuments (avoiding midday heat and crowds).`,
        afternoon: `Interactive workshop or authentic culinary tasting session focused on ${interests[1] || 'Local Culture'}.`,
        evening: `Scenic river cruise, evening temple ceremony, or night market exploration.`,
        meals: "Locally curated dining with regional favorites",
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
    recommendedTransport: `${transport} (High-speed trains, scenic private shuttles, and curated walking loops)`,
    weatherForecast: "Warm daytime temperatures (24°C–29°C), pleasant evening breezes, low rain probability",
    crowdRating: "Moderate — optimal timing with recommended early morning monument visits",
    journeyScore: 94,
    dayByDay: itineraryDays,
    safetyTips: [
      "Carry bottled or purified water when exploring heritage trails.",
      "Keep digital and offline copies of your visa, passport, and train reservations.",
      "Dress respectfully when visiting active places of worship."
    ]
  };
};

export const replanTripForWeather = async (tripPlan, weatherAlert) => {
  const alertCondition = weatherAlert?.condition || "Heavy Torrential Rains & Flash Flood Watch";
  const advisory = weatherAlert?.advisory || "Outdoor excursions are compromised. Transfer immediately to indoor cultural sanctuaries.";
  
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

  const updatedDayByDay = (tripPlan.dayByDay || []).map((day, idx) => {
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

