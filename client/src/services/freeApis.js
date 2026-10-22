// ASIA EXPLORA - Free & Open Tourism APIs Service
// Provides live weather (Open-Meteo), Geocoding (Photon), Routing (OSRM), POIs (Overpass), and optional Gemini AI

// 1. Open-Meteo Weather API (100% Free, No API key needed, unlimited educational usage)
export const fetchWeatherOpenMeteo = async (latitude, longitude) => {
  try {
    const lat = Number(latitude).toFixed(4);
    const lng = Number(longitude).toFixed(4);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    const data = await res.json();

    const current = data.current || {};
    const daily = data.daily || {};

    // Interpret WMO weather codes
    const interpretWeatherCode = (code) => {
      if (code === 0) return { label: 'Clear Sky', icon: '☀️', condition: 'Sunny & Ideal' };
      if ([1, 2].includes(code)) return { label: 'Partly Cloudy', icon: '⛅', condition: 'Pleasant & Mild' };
      if (code === 3) return { label: 'Overcast', icon: '☁️', condition: 'Cool & Shaded' };
      if ([45, 48].includes(code)) return { label: 'Misty / Fog', icon: '🌫️', condition: 'Atmospheric Fog' };
      if ([51, 53, 55, 61, 63].includes(code)) return { label: 'Light Rain', icon: '🌦️', condition: 'Carrying Umbrella Advised' };
      if ([65, 80, 81, 82].includes(code)) return { label: 'Heavy Showers', icon: '🌧️', condition: 'Indoor Sightseeing Recommended' };
      if ([71, 73, 75, 77, 85].includes(code)) return { label: 'Snowfall', icon: '❄️', condition: 'Winter Scenic Wonder' };
      if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️', condition: 'Storm Advisory In Place' };
      return { label: 'Clear & Moderate', icon: '🌤️', condition: 'Great Sightseeing' };
    };

    const weatherInfo = interpretWeatherCode(current.weather_code || 0);

    return {
      success: true,
      provider: 'Open-Meteo (Free Open API)',
      currentTemp: Math.round(current.temperature_2m ?? 26),
      apparentTemp: Math.round(current.apparent_temperature ?? 26),
      humidity: Math.round(current.relative_humidity_2m ?? 65),
      windSpeed: Math.round(current.wind_speed_10m ?? 8),
      isDay: current.is_day === 1,
      weatherCode: current.weather_code,
      label: weatherInfo.label,
      icon: weatherInfo.icon,
      condition: weatherInfo.condition,
      forecastDaily: (daily.time || []).slice(0, 5).map((date, idx) => ({
        date,
        maxTemp: Math.round(daily.temperature_2m_max?.[idx] ?? 28),
        minTemp: Math.round(daily.temperature_2m_min?.[idx] ?? 20),
        precip: daily.precipitation_sum?.[idx] ?? 0,
        ...interpretWeatherCode(daily.weather_code?.[idx] ?? 0)
      }))
    };
  } catch (err) {
    console.warn("Open-Meteo fallback triggered:", err);
    return null;
  }
};

// 2. Photon Geocoding API by Komoot (100% Free, based on OpenStreetMap data)
export const fetchPhotonGeocode = async (searchQuery) => {
  if (!searchQuery || searchQuery.trim().length < 2) return [];
  try {
    const query = encodeURIComponent(searchQuery.trim());
    const res = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=6`);
    if (!res.ok) throw new Error(`Photon failed: ${res.status}`);
    const data = await res.json();
    return (data.features || []).map(f => {
      const p = f.properties || {};
      const coords = f.geometry?.coordinates || [0, 0]; // [lng, lat]
      return {
        id: p.osm_id || Math.random(),
        name: p.name || searchQuery,
        country: p.country || '',
        city: p.city || p.state || '',
        coordinates: [coords[1], coords[0]], // return [lat, lng] for Leaflet
        formatted: [p.name, p.city, p.country].filter(Boolean).join(', ')
      };
    });
  } catch (err) {
    console.warn("Photon geocode fallback:", err);
    return [];
  }
};

// 3. OSRM (Open Source Routing Machine) - Real road travel way trails (100% Free)
export const fetchOSRMRoute = async (startCoords, endCoords) => {
  try {
    // OSRM expects {lng},{lat};{lng},{lat}
    const [startLat, startLng] = startCoords;
    const [endLat, endLng] = endCoords;
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`OSRM failed: ${res.status}`);
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      // Convert coordinates from [lng, lat] to [lat, lng] for Leaflet
      const polyline = (route.geometry?.coordinates || []).map(coord => [coord[1], coord[0]]);
      return {
        success: true,
        provider: 'OSRM (Open Source Routing)',
        distanceKm: (route.distance / 1000).toFixed(1),
        durationHours: (route.duration / 3600).toFixed(1),
        durationMinutes: Math.round(route.duration / 60),
        polyline: polyline
      };
    }
    return null;
  } catch (err) {
    console.warn("OSRM routing fallback (using straight trail):", err);
    return {
      success: true,
      provider: 'Direct GeoTrail',
      distanceKm: (getHaversineDistance(startCoords, endCoords)).toFixed(1),
      durationMinutes: Math.round(getHaversineDistance(startCoords, endCoords) * 1.5),
      polyline: [startCoords, endCoords]
    };
  }
};

// Helper: Haversine distance in km
export const getHaversineDistance = (coords1, coords2) => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// 4. Overpass API for Heritage & Tourism POIs (OpenStreetMap)
export const fetchOverpassPOIs = async (lat, lng, radiusMeters = 5000) => {
  try {
    const query = `
      [out:json][timeout:10];
      (
        node["historic"](around:${radiusMeters},${lat},${lng});
        node["tourism"](around:${radiusMeters},${lat},${lng});
      );
      out center 15;
    `;
    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Overpass query failed");
    const data = await res.json();
    return (data.elements || []).map(el => ({
      id: el.id,
      name: el.tags?.name || el.tags?.historic || 'Historic Landmark',
      type: el.tags?.historic || el.tags?.tourism || 'Heritage Site',
      lat: el.lat,
      lng: el.lon,
      tourism: el.tags?.tourism
    }));
  } catch (err) {
    console.warn("Overpass POI fetch error:", err);
    return [];
  }
};

// 5. Google Gemini AI Service (Optional - uses process.env.VITE_GEMINI_API_KEY with built-in Luna AI fallback)
export const askGeminiAI = async (prompt, systemInstruction = "") => {
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey !== "optional_gemini_api_key_here") {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction ? systemInstruction + "\n\n" : ""}User: ${prompt}` }]
          }
        ]
      };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return { success: true, provider: 'Google Gemini 1.5 Flash', reply: text };
      }
    } catch (err) {
      console.warn("Gemini API call failed, using Luna AI engine:", err);
    }
  }

  // Built-in Intelligent Asia Tourism Assistant fallback
  return {
    success: true,
    provider: 'Luna AI Knowledge Core',
    reply: generateLunaFallbackReply(prompt)
  };
};

const generateLunaFallbackReply = (query) => {
  const q = (query || '').toLowerCase();
  if (q.includes('japan') || q.includes('fuji') || q.includes('kyoto') || q.includes('tokyo')) {
    return "🎌 **Japan Travel Guidance:**\n- **Best Season:** Cherry blossoms in Late March–April or vibrant autumn foliage in November.\n- **Top Highlights:** Kyoto's Fushimi Inari Senbon Torii corridor, Mount Fuji Five Lakes, Tokyo's Shibuya crossing, and Miyajima floating torii gate.\n- **Budget:** $75–$210 USD/day. Get the 7-day or 14-day JR Regional Pass for seamless Shinkansen bullet train transit!";
  }
  if (q.includes('india') || q.includes('taj') || q.includes('varanasi') || q.includes('delhi')) {
    return "🇮🇳 **India Heritage Expedition:**\n- **Golden Triangle:** Delhi (Red Fort, Qutub Minar), Agra (The Taj Mahal at sunrise), and Jaipur (Amber Fort, Hawa Mahal).\n- **Spiritual Epochs:** Experience the Ganga Aarti at Dashashwamedh Ghat in Varanasi and Madurai's Meenakshi Temple.\n- **Best Season:** October through March when daytime temperatures are pleasant (20–28°C).\n- **Budget:** $35–$120 USD/day.";
  }
  if (q.includes('vietnam') || q.includes('ha long') || q.includes('hanoi') || q.includes('hoi an')) {
    return "🇻🇳 **Vietnam Explorer:**\n- **Must-Visit:** Overnight cruise on Ha Long Bay & Lan Ha Bay, lantern-lit alleys of Hoi An Ancient Town, and Phong Nha Son Doong cave expeditions.\n- **Culinary Must-Try:** Pho Bo, Banh Mi pate, and egg coffee along Hanoi's French Quarter.\n- **Best Months:** February to April (spring) and August to October.";
  }
  if (q.includes('myanmar') || q.includes('bagan') || q.includes('yangon')) {
    return "🇲🇲 **Myanmar Ancient Trails:**\n- **Bagan Archaeological Zone:** Over 2,200 ancient Buddhist temples and stupas dating from the 9th to 13th centuries across the dry plains.\n- **Inle Lake:** Floating gardens, stilt-village monasteries, and leg-rowing Intha fishermen.\n- **Shwedagon Pagoda (Yangon):** 99-meter golden stupa adorned with 5,448 diamonds.";
  }
  return `✨ **Luna AI Traveler Insight:**\nAsia offers unmatched geographic and civilizational diversity across its 48 sovereign nations. For the optimal experience:\n- **Cultural & Heritage:** Visit Bagan (Myanmar), Angkor Wat (Cambodia), Sigiriya (Sri Lanka), and Samarkand (Uzbekistan).\n- **Islands & Coastlines:** Raja Ampat & Bali (Indonesia), El Nido (Philippines), and Baa Atoll (Maldives).\n- **Mountain Treks:** Annapurna Circuit (Nepal), Tiger's Nest (Bhutan), and Pamir Highway (Tajikistan).\n\nUse our **Plan Your Tour** interactive builder or check live weather below to personalize your journey!`;
};
