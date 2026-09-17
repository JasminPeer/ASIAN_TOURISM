import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { countriesData as initialCountries } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGET_SEED_PATH = path.join(__dirname, 'seedData.js');

// Complete List of All Asian Countries (48 Countries)
const extraCountries = [
  {
    id: "russia",
    name: "Russia (Siberia & Far East)",
    code: "RU",
    continentRegion: "North / Central Asia",
    capital: "Moscow / Vladivostok",
    description: "The vast Asian expanse of the Russian continent, featuring Lake Baikal—the world's deepest freshwater lake—and Kamchatka's Pacific volcanic ring.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75" },
    flag: "🇷🇺",
    coordinates: [55.7558, 37.6173],
    zoom: 3,
    bestSeason: "June to August (Summer) & January to March (Winter Ice)",
    currency: "RUB (₽)",
    languages: ["Russian", "Buryat"],
    heritageCount: 11,
    popularActivities: ["Trans-Siberian Overland Railway", "Lake Baikal Winter Clear Ice Walking", "Kamchatka Valley of Geysers"],
    estimatedDailyBudget: "$45 - $130 / day",
    journeyScore: 89
  },
  {
    id: "syria",
    name: "Syria",
    code: "SY",
    continentRegion: "West Asia",
    capital: "Damascus",
    description: "An ancient civilizational crossroads, home to ancient Palmyra Roman colonnades, Krak des Chevaliers crusader fort, and Damascus Old City.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75" },
    flag: "🇸🇾",
    coordinates: [34.8021, 38.9968],
    zoom: 6,
    bestSeason: "April to May & September to October",
    currency: "SYP (£S)",
    languages: ["Arabic"],
    heritageCount: 6,
    popularActivities: ["Palmyra Ancient Colonnades", "Krak des Chevaliers Castle", "Damascus Umayyad Mosque"],
    estimatedDailyBudget: "$30 - $80 / day",
    journeyScore: 81
  },
  {
    id: "yemen",
    name: "Yemen",
    code: "YE",
    continentRegion: "West Asia",
    capital: "Sana'a",
    description: "Land of the Queen of Sheba, famed for the fairytale mud-brick skyscrapers of Shibam—the 'Manhattan of the Desert'—and alien dragon's blood trees of Socotra.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75" },
    flag: "🇾🇪",
    coordinates: [15.5527, 48.5164],
    zoom: 6,
    bestSeason: "October to April (Socotra & Highlands)",
    currency: "YER (﷼)",
    languages: ["Arabic", "Soqotri"],
    heritageCount: 4,
    popularActivities: ["Socotra Island Dragon Blood Tree Treks", "Shibam Ancient Mud Skyscraper Walks", "Old Walled City of Sana'a"],
    estimatedDailyBudget: "$40 - $110 / day",
    journeyScore: 83
  },
  {
    id: "israel",
    name: "Israel",
    code: "IL",
    continentRegion: "West Asia",
    capital: "Jerusalem",
    description: "A sacred meeting ground of world faiths, boasting the ancient stone ramparts of Jerusalem's Old City, buoyant waters of the Dead Sea, and Mediterranean Tel Aviv.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75" },
    flag: "🇮🇱",
    coordinates: [31.0461, 34.8516],
    zoom: 7,
    bestSeason: "March to May & October to November",
    currency: "ILS (₪)",
    languages: ["Hebrew", "Arabic", "English"],
    heritageCount: 9,
    popularActivities: ["Jerusalem Old City Western Wall & Holy Sepulchre", "Dead Sea Floating", "Masada Desert Fortress Sunrise", "Tel Aviv Mediterranean Beaches"],
    estimatedDailyBudget: "$90 - $260 / day",
    journeyScore: 92
  },
  {
    id: "palestine",
    name: "Palestine",
    code: "PS",
    continentRegion: "West Asia",
    capital: "Ramallah / East Jerusalem",
    description: "An ancient land deeply rooted in millennia of olive harvest heritage, Church of the Nativity in Bethlehem, the ancient springs of Jericho, and vibrant souqs of Hebron.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75" },
    flag: "🇵🇸",
    coordinates: [31.9522, 35.2332],
    zoom: 8,
    bestSeason: "March to May & September to November",
    currency: "ILS (₪) / JOD",
    languages: ["Arabic"],
    heritageCount: 4,
    popularActivities: ["Bethlehem Church of the Nativity Pilgrimage", "Jericho World's Oldest City Ruins", "Hebron Glass & Pottery Artisan Workshops"],
    estimatedDailyBudget: "$35 - $95 / day",
    journeyScore: 86
  }
];

// Merge unique countries
const existingIds = new Set(initialCountries.map(c => c.id));
const allCountries = [...initialCountries];
extraCountries.forEach(ec => {
  if (!existingIds.has(ec.id)) {
    allCountries.push(ec);
    existingIds.add(ec.id);
  }
});

console.log(`Total Asian countries assembled: ${allCountries.length}`);

// Regions Data
const allRegions = [
  // India
  {
    id: "tamil-nadu",
    countryCode: "IN",
    countryId: "india",
    name: "Tamil Nadu",
    capital: "Chennai",
    description: "The civilizational cradle of Dravidian arts, famed for thousand-pillar granite temples, Nilgiri hill stations, classical Bharatanatyam, and Coromandel coastal shores.",
    media: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75",
    coordinates: [11.1271, 78.6569],
    destinationsCount: 8
  },
  {
    id: "kerala",
    countryCode: "IN",
    countryId: "india",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    description: "God's Own Country, famed for emerald palm-fringed backwaters, Ayurvedic wellness retreats, Arabian Sea cliffs, and misty tea plantations of Munnar.",
    media: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=75",
    coordinates: [10.8505, 76.2711],
    destinationsCount: 5
  },
  {
    id: "rajasthan",
    countryCode: "IN",
    countryId: "india",
    name: "Rajasthan",
    capital: "Jaipur",
    description: "The land of Rajput kings, colossal desert hill forts, opulent mirrored palaces, sand dunes of the Thar, and kaleidoscopic folk festivals.",
    media: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75",
    coordinates: [27.0238, 74.2179],
    destinationsCount: 6
  },
  {
    id: "uttar-pradesh",
    countryCode: "IN",
    countryId: "india",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    description: "Heartland of northern heritage, home to the ivory-white Taj Mahal, the 3,000-year-old sacred river ghats of Varanasi, and Nawabi culinary grandeur.",
    media: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=75",
    coordinates: [26.8467, 80.9462],
    destinationsCount: 4
  },
  {
    id: "maharashtra",
    countryCode: "IN",
    countryId: "india",
    name: "Maharashtra",
    capital: "Mumbai",
    description: "From the electrifying coastal skyline and Bollywood energy of Mumbai to the rock-cut Buddhist & Hindu caves of Ajanta and Ellora.",
    media: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=75",
    coordinates: [19.7515, 75.7139],
    destinationsCount: 3
  },
  {
    id: "karnataka",
    countryCode: "IN",
    countryId: "india",
    name: "Karnataka",
    capital: "Bengaluru",
    description: "Ancient stone kingdoms of Hampi, royal Mysore Palace, coffee estates of Coorg, and pristine Western Ghats rainforests.",
    media: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75",
    coordinates: [15.3173, 75.7139],
    destinationsCount: 3
  },
  {
    id: "goa",
    countryCode: "IN",
    countryId: "india",
    name: "Goa",
    capital: "Panaji",
    description: "Golden palm beaches, Portuguese colonial baroque churches, spice plantations, and vibrant coastal shacks.",
    media: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=75",
    coordinates: [15.2993, 74.1240],
    destinationsCount: 2
  },
  // Japan
  {
    id: "kansai",
    countryCode: "JP",
    countryId: "japan",
    name: "Kansai (Kyoto, Osaka, Nara)",
    capital: "Kyoto / Osaka",
    description: "Japan's thousand-year imperial cultural epicenter, housing thousands of Shinto shrines, Zen rock gardens, historic geisha districts, and UNESCO castles.",
    media: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=75",
    coordinates: [35.0116, 135.7681],
    destinationsCount: 5
  },
  {
    id: "kanto",
    countryCode: "JP",
    countryId: "japan",
    name: "Kanto (Tokyo & Mount Fuji Area)",
    capital: "Tokyo",
    description: "The cybernetic metropolis of Tokyo framed by sacred Mount Fuji, historic Asakusa, and hot spring ryokans of Hakone.",
    media: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75",
    coordinates: [35.6762, 139.6503],
    destinationsCount: 4
  },
  {
    id: "chubu",
    countryCode: "JP",
    countryId: "japan",
    name: "Chubu (Japanese Alps & Shirakawa-go)",
    capital: "Nagoya / Takayama",
    description: "The snow-covered roof of Japan, home to the UNESCO thatched farmhouses of Shirakawa-go and historic samurai towns.",
    media: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
    coordinates: [36.2562, 136.9066],
    destinationsCount: 3
  },
  // Thailand
  {
    id: "northern-thailand",
    countryCode: "TH",
    countryId: "thailand",
    name: "Northern Thailand (Chiang Mai & Chiang Rai)",
    capital: "Chiang Mai",
    description: "Misty mountain jungles, sacred teak Lanna Kingdom wats, ethical elephant reserves, and artisanal hill-tribe culture.",
    media: "https://images.unsplash.com/photo-1512553353684-82a6abac253b?auto=format&fit=crop&w=1200&q=75",
    coordinates: [18.7883, 98.9853],
    destinationsCount: 4
  },
  {
    id: "central-thailand",
    countryCode: "TH",
    countryId: "thailand",
    name: "Central Thailand (Bangkok & Ayutthaya)",
    capital: "Bangkok",
    description: "Gilded Grand Palace courtyards, Chao Phraya river transport, floating markets, and ancient royal capitals.",
    media: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
    coordinates: [13.7563, 100.5018],
    destinationsCount: 3
  },
  {
    id: "southern-thailand",
    countryCode: "TH",
    countryId: "thailand",
    name: "Southern Islands (Phuket & Krabi)",
    capital: "Phuket",
    description: "Limestone karsts soaring out of the emerald Andaman Sea, coral reefs, and world-renowned tropical beaches.",
    media: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
    coordinates: [7.8804, 98.3923],
    destinationsCount: 3
  }
];

// Helper to create standard 12-month weather data
const generate12MonthWeather = (baseTemp, rainBase, crowdSeason = [10, 11, 0, 1]) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((m, idx) => {
    const isPeak = crowdSeason.includes(idx);
    const isMonsoon = [5, 6, 7].includes(idx);
    const temp = Math.round(baseTemp + Math.sin((idx / 12) * Math.PI * 2) * 5);
    const rain = isMonsoon ? Math.min(85, rainBase * 3) : Math.max(5, Math.round(rainBase * (0.8 + Math.random() * 0.4)));
    const crowd = isPeak ? "Peak Crowd 🔴" : isMonsoon ? "Low Crowd 🟢" : "Moderate 🟡";
    return {
      month: m,
      temp,
      rainProb: rain,
      humidity: isMonsoon ? 80 : 58,
      crowd,
      weatherScore: isPeak ? 94 : isMonsoon ? 72 : 86,
      recommended: !isMonsoon
    };
  });
};

// Complete Master Destinations with all 25 properties
const allDestinations = [
  // --- INDIA: TAMIL NADU (8 Distinct Destinations) ---
  {
    id: "madurai",
    name: "Madurai Meenakshi Temple City",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Heritage",
    coordinates: [9.9195, 78.1193],
    tagline: "The 2,500-year-old Athens of the East",
    description: "One of the oldest continuously inhabited cities on earth, centered around the colossal polychrome gopurams of the sacred Meenakshi Sundareswarar Temple complex.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75" },
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=75",
      "https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=800&q=75"
    ],
    whyVisit: "To experience living ancient Dravidian temple rituals, thousand-pillar granite halls, night pooja processions, and authentic Chettinad feasts.",
    bestTime: "October to March",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 65, factors: "High during Chithirai festival and weekend temple darshan" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$55 - $95 / day", luxury: "$140 - $280 / day", currency: "INR / USD" },
    journeyScore: { total: 95, weather: 88, heritage: 99, culture: 98, accessibility: 92, budget: 95 },
    transportation: {
      nearestAirport: "Madurai International Airport (IXM) - 12 km",
      nearestRailway: "Madurai Junction (MDU) - 1.5 km",
      localTransit: "Prepaid auto-rickshaws, air-conditioned city buses, app taxis (Ola/Uber)",
      tips: "Walking is ideal around the concentric heritage streets circling Meenakshi Temple."
    },
    localGuide: {
      transitOptions: "Madurai Junction is connected directly to Chennai, Bengaluru, and Delhi via Vande Bharat and Superfast expresses.",
      nearbyHotels: [
        { name: "Heritage Madurai", priceCategory: "Luxury", distance: "4 km from temple", rating: 4.8, facilities: ["Geoffrey Bawa architecture", "Olympic pool", "Ayurvedic spa"], samplePrice: "₹8,500/night" },
        { name: "Courtyard by Marriott Madurai", priceCategory: "Premium", distance: "3.5 km from temple", rating: 4.6, facilities: ["Modern suites", "Multi-cuisine buffet", "Fitness center"], samplePrice: "₹5,200/night" },
        { name: "The Gateway Hotel Pasumalai", priceCategory: "Heritage", distance: "5 km from temple", rating: 4.7, facilities: ["Hilltop peacock gardens", "Historic bungalow"], samplePrice: "₹7,200/night" }
      ],
      nearbyRestaurants: [
        { name: "Murugan Idli Shop", cuisine: "Authentic South Indian", priceLevel: "Budget (₹150-₹300)", popularDishes: ["Melt-in-mouth Ghee Podi Idli", "Jigarthanda", "Chutney platter"] },
        { name: "Amma Mess", cuisine: "Chettinad Non-Veg", priceLevel: "Moderate (₹300-₹600)", popularDishes: ["Kari Dosa", "Bone Marrow Omelette", "Meen Kuzhambu"] },
        { name: "Famous Jigarthanda Shop", cuisine: "Madurai Desserts", priceLevel: "Budget (₹80)", popularDishes: ["Special Badam Pisin Jigarthanda with Ice Cream"] }
      ],
      mustTryFood: ["Kari Dosa", "Famous Madurai Jigarthanda", "Bun Parotta with Salna", "Chettinad Pepper Mutton"]
    },
    transportComparison: [
      { mode: "Train (Vande Bharat Express)", costRange: "₹950 - ₹1,800", duration: "5h 50m from Chennai", comfort: "High" },
      { mode: "Flight", costRange: "₹2,800 - ₹5,500", duration: "1h 10m from Chennai", comfort: "Very High" },
      { mode: "AC Sleeper Bus", costRange: "₹700 - ₹1,200", duration: "8 hours overnight", comfort: "Moderate" }
    ],
    heritageInfo: {
      era: "Classical Era (6th Century CE / Nayak Dynasty Expansion)",
      historicalEra: "Classical Era",
      architecture: "Dravidian Temple Granite Architecture",
      unesco: false,
      significance: "Spiritual epicenter of classical Tamil culture with 14 gopurams reaching up to 52 meters."
    },
    weatherByMonth: generate12MonthWeather(30, 20),
    weatherAlerts: {
      hasAlert: false,
      condition: "Golden Sunshine & Mild Breeze",
      advisory: "Ideal travel conditions. Temple stone floors can be warm at midday—visit early morning or evening.",
      indoorAlternatives: ["Tirumalai Nayakkar Mahal Light & Sound Show", "Gandhi Memorial Museum Madurai"]
    },
    festivals: [{ name: "Chithirai Thiruvizha", timing: "April / May", desc: "Coronation and grand chariot procession of Goddess Meenakshi attracting millions." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "chennai",
    name: "Chennai Coastal Capital & Kapaleeshwarar",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Culture",
    coordinates: [13.0827, 80.2707],
    tagline: "Gateway to South Indian classical arts & Marina shoreline",
    description: "The cosmopolitan capital of Tamil Nadu, renowned for Marina Beach—the world's second-longest urban beach—Mylapore's 7th-century Kapaleeshwarar Temple, and the Carnatic Music Season.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To listen to world-class December Carnatic vocalists, walk the colonial Fort St. George, and savor authentic filter coffee in Mylapore.",
    bestTime: "November to February",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 60, factors: "Peak during Margazhi Music Season in December" },
    estimatedBudget: { budget: "$30 - $50 / day", moderate: "$60 - $120 / day", luxury: "$150 - $350 / day", currency: "INR / USD" },
    journeyScore: { total: 93, weather: 86, heritage: 94, culture: 99, accessibility: 98, budget: 92 },
    transportation: {
      nearestAirport: "Chennai International Airport (MAA) - connected by Metro",
      nearestRailway: "Chennai Central (MAS) & Chennai Egmore (MS)",
      localTransit: "Chennai Metro Rail, Suburban trains, Metropolitan buses, Auto-rickshaws",
      tips: "Use Chennai Metro for traffic-free transit between the airport, Central station, and shopping districts."
    },
    localGuide: {
      transitOptions: "Direct metro connects Airport to Chennai Central in 35 minutes.",
      nearbyHotels: [
        { name: "Taj Coromandel", priceCategory: "Luxury", distance: "Nungambakkam", rating: 4.8, facilities: ["Legendary Southern Spice restaurant", "Pool", "Jiva Spa"], samplePrice: "₹10,500/night" },
        { name: "The Leela Palace Chennai", priceCategory: "Luxury Oceanfront", distance: "Adyar Seaface", rating: 4.9, facilities: ["Chettinad palace design", "Bay of Bengal sea views"], samplePrice: "₹14,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Rayar's Mess", cuisine: "Traditional Mylapore Tiffin", priceLevel: "Budget (₹100)", popularDishes: ["Crisp Medu Vada", "Ghee Pongal", "Degree Filter Coffee"] },
        { name: "Southern Spice at Taj", cuisine: "Haute South Indian", priceLevel: "Fine Dining", popularDishes: ["Attukal Paya", "Kozhi Melagu Curry", "Elaneer Payasam"] }
      ],
      mustTryFood: ["Mylapore Degree Filter Coffee", "Crisp Ghee Roast Dosa", "Chettinad Crab Curry", "Marina Sundal"]
    },
    transportComparison: [
      { mode: "Metro / Suburban Train", costRange: "₹20 - ₹60", duration: "30 mins", comfort: "High" },
      { mode: "App Cab (Uber/Ola)", costRange: "₹350 - ₹600", duration: "45 mins", comfort: "High" }
    ],
    heritageInfo: {
      era: "Classical Era (7th Century CE Pallava & Nayak)",
      historicalEra: "Classical Era",
      architecture: "Dravidian Gopuram Architecture",
      unesco: false,
      significance: "Ancient Shaivite shrine praised in Sangam Tevaram hymns."
    },
    weatherByMonth: generate12MonthWeather(29, 25),
    weatherAlerts: { hasAlert: false, condition: "Coastal Sea Breeze", advisory: "Pleasant evening strolls on Marina.", indoorAlternatives: ["Government Museum Egmore Bronzes", "San Thome Basilica"] },
    festivals: [{ name: "Madras Music Season", timing: "Mid-December to Mid-January", desc: "The world's largest classical music festival featuring thousands of Carnatic concerts." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "thanjavur",
    name: "Thanjavur & The Great Brihadeeswarar Temple",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Heritage",
    coordinates: [10.7870, 79.1378],
    tagline: "The Big Temple: Masterpiece of the Imperial Chola Dynasty",
    description: "Built in 1010 CE by Emperor Raja Raja Chola I, this UNESCO World Heritage monument features an 80-tonne single granite block crowning a 66-meter monolithic vimana tower.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To witness one of the greatest engineering feats of human history, where shadow never touches the base at noon, and admire ancient Chola fresco paintings.",
    bestTime: "October to March",
    crowdPrediction: { level: "Low to Moderate", statusColor: "text-emerald-400", score: 45, factors: "Serene except during Maha Shivaratri" },
    estimatedBudget: { budget: "$20 - $40 / day", moderate: "$45 - $80 / day", luxury: "$110 - $220 / day", currency: "INR / USD" },
    journeyScore: { total: 96, weather: 88, heritage: 100, culture: 97, accessibility: 88, budget: 96 },
    transportation: {
      nearestAirport: "Tiruchirappalli International Airport (TRZ) - 55 km",
      nearestRailway: "Thanjavur Junction (TJ) - 2 km",
      localTransit: "Auto-rickshaws, local town buses, taxis",
      tips: "Visit during late afternoon when the sunset bathes the gold-hued granite tower in magical amber light."
    },
    localGuide: {
      transitOptions: "Frequent express trains from Chennai (6 hrs) and Trichy (50 mins).",
      nearbyHotels: [
        { name: "Svatma Thanjavur", priceCategory: "Heritage Luxury", distance: "2.5 km from temple", rating: 4.9, facilities: ["Restored heritage mansion", "Carnatic concerts", "Bronze sculpting workshop"], samplePrice: "₹12,000/night" },
        { name: "Great Trails River View Resort", priceCategory: "Resort", distance: "4 km", rating: 4.6, facilities: ["Vennar river views", "Open-air dining"], samplePrice: "₹5,500/night" }
      ],
      nearbyRestaurants: [
        { name: "Sathars", cuisine: "South Indian Non-Veg", priceLevel: "Budget", popularDishes: ["Thanjavur Mutton Biryani", "Coin Parotta"] },
        { name: "Aaryas Thanjavur", cuisine: "Pure Veg South Indian", priceLevel: "Budget", popularDishes: ["South Indian Thali Meal on Banana Leaf", "Filter Coffee"] }
      ],
      mustTryFood: ["Thanjavur Ash Gourd Halwa", "Kadappa Lentil Stew", "Thanjavur Traditional Banana Leaf Meals"]
    },
    transportComparison: [
      { mode: "Train from Chennai (Cholan Express)", costRange: "₹350 - ₹1,100", duration: "6h 15m", comfort: "High" },
      { mode: "Taxi from Trichy Airport", costRange: "₹1,400 - ₹1,800", duration: "55 mins", comfort: "Very High" }
    ],
    heritageInfo: {
      era: "Classical Era (1010 CE Chola Empire)",
      historicalEra: "Classical Era",
      architecture: "Chola Monolithic Granite Temple Architecture",
      unesco: true,
      significance: "Part of the UNESCO World Heritage site 'Great Living Chola Temples'."
    },
    weatherByMonth: generate12MonthWeather(29, 22),
    weatherAlerts: { hasAlert: false, condition: "Pleasant & Clear", advisory: "Great visibility for architectural photography.", indoorAlternatives: ["Thanjavur Maratha Palace & Saraswathi Mahal Library"] },
    festivals: [{ name: "Brihadeeswarar Temple Chariot Festival", timing: "April", desc: "Immense wooden temple car pulled by thousands of devotees." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram Shore Temples & Rock Reliefs",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Heritage",
    coordinates: [12.6269, 80.1927],
    tagline: "7th-century open-air monolithic rock sanctuaries on the sea",
    description: "UNESCO World Heritage ancient port city of the Pallava kings, celebrated for the Shore Temple braving sea waves, the monolithic Pancha Rathas, and Arjuna's Penance—the world's largest open-air rock bas-relief.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To admire 1,300-year-old rock-cut elephants and chariots carved directly from granite boulders right beside rolling ocean waves.",
    bestTime: "October to March",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 62, factors: "Busy on weekends with Chennai day-trippers" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$55 - $110 / day", luxury: "$150 - $350 / day", currency: "INR / USD" },
    journeyScore: { total: 95, weather: 88, heritage: 99, culture: 96, accessibility: 94, budget: 93 },
    transportation: {
      nearestAirport: "Chennai International Airport (MAA) - 55 km via scenic East Coast Road (ECR)",
      nearestRailway: "Chengalpattu Junction (CGL) - 29 km",
      localTransit: "Bicycle rentals, auto-rickshaws, walking (sites are within a 2 km radius)",
      tips: "Rent a bicycle to leisurely ride between the Shore Temple, Krishna's Butterball, and the Pancha Rathas."
    },
    localGuide: {
      transitOptions: "Scenic 1-hour drive along the East Coast Road from Chennai.",
      nearbyHotels: [
        { name: "Radisson Blu Resort Temple Bay", priceCategory: "Beachfront Luxury", distance: "Shorefront", rating: 4.8, facilities: ["27,000 sq ft meandering pool", "Beachside chalets"], samplePrice: "₹11,000/night" },
        { name: "InterContinental Chennai Mahabalipuram", priceCategory: "Luxury", distance: "10 km", rating: 4.8, facilities: ["Private white sand beach", "Ayurvedic center"], samplePrice: "₹13,500/night" }
      ],
      nearbyRestaurants: [
        { name: "Moonrakers", cuisine: "Fresh Seafood", priceLevel: "Moderate", popularDishes: ["Grilled Garlic Butter Jumbo Prawns", "Catch of the Day Calamari", "Fish Curry"] },
        { name: "Seashore Garden Restaurant", cuisine: "Seafood & Continental", priceLevel: "Moderate", popularDishes: ["Tandoori Tiger Prawns", "Cold Beer overlooking Shore Temple"] }
      ],
      mustTryFood: ["Fresh Arabian Sea Crab Roast", "Banana Leaf Fish Fry", "Coconut Water on Beach"]
    },
    transportComparison: [
      { mode: "Scenic ECR Taxi from Chennai", costRange: "₹1,200 - ₹1,800", duration: "1 hour", comfort: "Very High" },
      { mode: "AC Bus (Route 588 / 599)", costRange: "₹55", duration: "1h 45m", comfort: "Moderate" }
    ],
    heritageInfo: {
      era: "Classical Era (7th–8th Century CE Pallava Dynasty)",
      historicalEra: "Classical Era",
      architecture: "Pallava Monolithic & Structural Rock Architecture",
      unesco: true,
      significance: "Masterpiece of early Dravidian stone architecture on UNESCO list since 1984."
    },
    weatherByMonth: generate12MonthWeather(28, 20),
    weatherAlerts: { hasAlert: false, condition: "Pleasant Coastal Sun", advisory: "Gentle sea breeze. Wear sun protection during midday.", indoorAlternatives: ["Heritage Stone Carving Workshops"] },
    festivals: [{ name: "Mamallapuram Dance Festival", timing: "January / February", desc: "Four-week open-air classical dance festival against the backdrop of Arjuna's Penance." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "ooty",
    name: "Ooty & Nilgiri Mountain Railway",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Mountains",
    coordinates: [11.4102, 76.6950],
    tagline: "The Queen of Hill Stations in the Blue Mountains",
    description: "Nestled at 2,240 meters amidst the Blue Mountains (Nilgiris), featuring the UNESCO steam-powered rack-and-pinion Nilgiri Mountain Toy Train, rolling tea estates, and botanical gardens.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To ride the century-old steam toy train chugging across 250 bridges and through 16 tunnels amidst rolling eucalyptus clouds.",
    bestTime: "October to June",
    crowdPrediction: { level: "High in Summer", statusColor: "text-orange-400", score: 70, factors: "Peak during May Summer Flower Show" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$50 - $95 / day", luxury: "$130 - $280 / day", currency: "INR / USD" },
    journeyScore: { total: 93, weather: 95, heritage: 92, culture: 90, accessibility: 88, budget: 92 },
    transportation: {
      nearestAirport: "Coimbatore International Airport (CJB) - 88 km",
      nearestRailway: "Mettupalayam (MTP) for toy train or Udhagamandalam (Ooty) station",
      localTransit: "Taxis, mountain jeeps, rental motorbikes",
      tips: "Book the Nilgiri Toy Train (Mettupalayam to Ooty) months ahead—tickets sell out rapidly."
    },
    localGuide: {
      transitOptions: "Mountain road via 36 hairpin bends from Kallar / Mettupalayam.",
      nearbyHotels: [
        { name: "Savoy - IHCL SeleQtions Ooty", priceCategory: "Colonial Luxury", distance: "Town center", rating: 4.8, facilities: ["180-year-old British colonial cottages", "Fireplace in rooms"], samplePrice: "₹10,500/night" },
        { name: "Sterling Ooty Fern Hill", priceCategory: "Resort", distance: "Fern Hill", rating: 4.5, facilities: ["Valley viewpoints", "Tea garden strolls"], samplePrice: "₹5,500/night" }
      ],
      nearbyRestaurants: [
        { name: "Shinkow's Chinese Restaurant", cuisine: "Authentic Anglo-Chinese", priceLevel: "Budget to Moderate", popularDishes: ["Handmade Wonton Soup", "Chili Pork", "Fried Noodles"] },
        { name: "Earl's Secret", cuisine: "Continental & Colonial", priceLevel: "Fine Dining", popularDishes: ["Roast Chicken", "Apple Pie with Ice Cream"] }
      ],
      mustTryFood: ["Nilgiri High-Grown Black Tea", "Handmade Ooty Dark Chocolates", "Ooty Varkey (crisp flaky pastry)"]
    },
    transportComparison: [
      { mode: "Nilgiri Mountain Toy Train", costRange: "₹205 (First Class)", duration: "4h 45m (scenic chug)", comfort: "Romantic Heritage" },
      { mode: "Taxi from Coimbatore Airport", costRange: "₹2,200 - ₹2,800", duration: "2h 30m", comfort: "High" }
    ],
    heritageInfo: {
      era: "Colonial Era (1908 CE)",
      historicalEra: "Early Modern Era",
      architecture: "British Alpine Hill Station & Swiss-engineered Rack Railway",
      unesco: true,
      significance: "Part of the UNESCO Mountain Railways of India World Heritage site."
    },
    weatherByMonth: generate12MonthWeather(16, 30, [3, 4, 9, 10]),
    weatherAlerts: { hasAlert: false, condition: "Misty Alpine Breeze", advisory: "Cool nights (8°C–12°C). Carry warm woolens.", indoorAlternatives: ["Ooty Tea Factory & Museum Tour"] },
    festivals: [{ name: "Ooty Summer Festival & Flower Show", timing: "May", desc: "Exhibition of 150,000 cut flowers and cultural dance performances in the Botanical Garden." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal Star Lake & Pine Forests",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Mountains",
    coordinates: [10.2381, 77.4892],
    tagline: "The Princess of Hill Stations nestled in the Palani Hills",
    description: "Perched at 2,133 meters, famed for its star-shaped central lake, dense pine forest canopies, mist-veiled Pillar Rocks cliffs, and the rare Kurinji flower blooming once every 12 years.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To pedal rowboats across the tranquil star lake, cycle along Coaker's Walk edge of the clouds, and walk through silent eucalyptus forests.",
    bestTime: "September to May",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 55, factors: "Busy in April–May school holidays" },
    estimatedBudget: { budget: "$20 - $40 / day", moderate: "$50 - $90 / day", luxury: "$120 - $260 / day", currency: "INR / USD" },
    journeyScore: { total: 92, weather: 96, heritage: 88, culture: 89, accessibility: 86, budget: 94 },
    transportation: {
      nearestAirport: "Madurai International Airport (IXM) - 120 km",
      nearestRailway: "Kodai Road (KQN) - 80 km",
      localTransit: "Local cabs, bicycle rentals, walking loops",
      tips: "Rent a tandem bicycle to cycle the 5 km lake perimeter loop early in the morning."
    },
    localGuide: {
      transitOptions: "3-hour scenic ghat road drive from Madurai.",
      nearbyHotels: [
        { name: "The Tamara Kodai", priceCategory: "Luxury Heritage", distance: "2 km from lake", rating: 4.9, facilities: ["1840s French missionary estate", "Heated outdoor pool"], samplePrice: "₹14,500/night" },
        { name: "Sterling Kodaikanal Lake", priceCategory: "Resort", distance: "Lakefront", rating: 4.5, facilities: ["Lake views", "Campfire nights"], samplePrice: "₹5,800/night" }
      ],
      nearbyRestaurants: [
        { name: "Cloud Street", cuisine: "Wood-fired Pizza & Bakery", priceLevel: "Moderate", popularDishes: ["Thin-crust Four Cheese Pizza", "Homemade Lemon Tart", "Fresh Pasta"] },
        { name: "Altaf's Cafe", cuisine: "Middle Eastern & Organic", priceLevel: "Budget", popularDishes: ["Falafel Platter", "Shakshuka", "Ginger Lemon Honey Tea"] }
      ],
      mustTryFood: ["Fresh Kodai Plum & Peach Preserves", "Homemade Spiced Dark Chocolate", "Hot Cheese Omelettes"]
    },
    transportComparison: [
      { mode: "Taxi from Madurai Airport", costRange: "₹2,800 - ₹3,500", duration: "3 hours", comfort: "Very High" },
      { mode: "State Transport Ghat Bus", costRange: "₹110", duration: "4 hours", comfort: "Basic" }
    ],
    heritageInfo: {
      era: "Early Modern Era (1845 CE)",
      historicalEra: "Early Modern Era",
      architecture: "American & European Missionary Hill Sanctuary",
      unesco: false,
      significance: "Established as a refuge from plains malaria with pristine microclimate."
    },
    weatherByMonth: generate12MonthWeather(17, 28),
    weatherAlerts: { hasAlert: false, condition: "Crisp Mountain Mist", advisory: "Brisk breeze; light sweaters required throughout the year.", indoorAlternatives: ["Shembaganur Museum of Natural History"] },
    festivals: [{ name: "Kurinji Flower Blooming", timing: "Once Every 12 Years (Next: 2030)", desc: "The hills turn entirely purple with millions of blossoming Neelakurinji shrubs." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "rameswaram",
    name: "Rameswaram Island & Ramanathaswamy Temple",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Spiritual",
    coordinates: [9.2876, 79.3129],
    tagline: "Sacred Island Corridor & the Pamban Sea Bridge",
    description: "Located on Pamban Island connected to mainland India by the historic marine railway bridge, renowned for the world's longest temple corridor with 1,212 carved pillars and 22 sacred teertham bathing wells.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To cross the cantilever railway bridge over the turquoise ocean, walk down the longest pillar corridor in existence, and stand at Dhanushkodi—the ghost town looking across Adam's Bridge to Sri Lanka.",
    bestTime: "October to April",
    crowdPrediction: { level: "Moderate to High", statusColor: "text-orange-400", score: 68, factors: "High during Amavasya and Maha Shivaratri" },
    estimatedBudget: { budget: "$20 - $35 / day", moderate: "$45 - $80 / day", luxury: "$100 - $200 / day", currency: "INR / USD" },
    journeyScore: { total: 94, weather: 88, heritage: 98, culture: 99, accessibility: 89, budget: 95 },
    transportation: {
      nearestAirport: "Madurai International Airport (IXM) - 170 km",
      nearestRailway: "Rameswaram Railway Station (RMM) - right on the island",
      localTransit: "Auto-rickshaws, 4x4 beach jeeps to Dhanushkodi, town buses",
      tips: "Take an early morning 4WD jeep to the Dhanushkodi sand spit where the Bay of Bengal meets the Indian Ocean."
    },
    localGuide: {
      transitOptions: "Trains cross the spectacular Pamban sea bridge right into Rameswaram.",
      nearbyHotels: [
        { name: "Daiwik Hotels Rameswaram", priceCategory: "Pilgrim Luxury", distance: "1.8 km from temple", rating: 4.6, facilities: ["Spiritual concierge", "Clean pure veg dining"], samplePrice: "₹4,200/night" },
        { name: "Hyatt Place Rameswaram", priceCategory: "Modern Premium", distance: "1 km from temple", rating: 4.7, facilities: ["Swimming pool", "24/7 fitness center"], samplePrice: "₹5,800/night" }
      ],
      nearbyRestaurants: [
        { name: "The Curry at Daiwik", cuisine: "Pure Vegetarian Indian", priceLevel: "Moderate", popularDishes: ["South Indian Special Thali", "Curd Rice with Pomegranate"] },
        { name: "Ram Nivas Mess", cuisine: "Traditional Tamil Tiffin", priceLevel: "Budget", popularDishes: ["Hot Rava Dosa", "Filter Coffee"] }
      ],
      mustTryFood: ["Rameswaram Coastal Fish Curry (in coastal villages)", "Nei Dosa", "Elaneer Coconut Pudding"]
    },
    transportComparison: [
      { mode: "Rameswaram Express Train from Chennai", costRange: "₹450 - ₹1,400", duration: "11 hours overnight", comfort: "High" },
      { mode: "Taxi from Madurai Airport", costRange: "₹3,200 - ₹3,800", duration: "3h 15m", comfort: "Very High" }
    ],
    heritageInfo: {
      era: "Classical & Medieval Era (12th–17th Century Sethupathi rulers)",
      historicalEra: "Medieval Era",
      architecture: "Dravidian Sandstone Pillar Corridor Architecture",
      unesco: false,
      significance: "One of the four sacred Char Dham pilgrimage sites of Hinduism."
    },
    weatherByMonth: generate12MonthWeather(29, 22),
    weatherAlerts: { hasAlert: false, condition: "Oceanic Sun & Breeze", advisory: "Saline coastal air; ocean currents are strong at Dhanushkodi.", indoorAlternatives: ["Dr. APJ Abdul Kalam Memorial"] },
    festivals: [{ name: "Maha Shivaratri", timing: "February / March", desc: "Night-long devotional prayers and holy dips in the 22 theerthams." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari Land's End & Vivekananda Rock",
    country: "India",
    countryCode: "IN",
    regionId: "tamil-nadu",
    regionName: "Tamil Nadu",
    category: "Nature",
    coordinates: [8.0883, 77.5385],
    tagline: "The southernmost tip of the Indian subcontinent",
    description: "The dramatic convergence of three oceans: the Arabian Sea, Indian Ocean, and Bay of Bengal, famous for simultaneous sunset and moonrise over the water, and the 133-foot Thiruvalluvar stone colossus.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To take a ferry to Vivekananda Rock Memorial where Swami Vivekananda meditated, and watch the sun dip into the ocean where three great seas unite.",
    bestTime: "October to March (Chitra Pournami in April for simultaneous sunset and moonrise)",
    crowdPrediction: { level: "High at Sunset", statusColor: "text-orange-400", score: 65, factors: "Ferry queues peak between 10am - 3pm" },
    estimatedBudget: { budget: "$20 - $35 / day", moderate: "$45 - $80 / day", luxury: "$100 - $220 / day", currency: "INR / USD" },
    journeyScore: { total: 93, weather: 90, heritage: 94, culture: 95, accessibility: 91, budget: 95 },
    transportation: {
      nearestAirport: "Trivandrum International Airport (TRV) in Kerala - 90 km",
      nearestRailway: "Kanyakumari Railway Station (CAPE) - 1 km from beach",
      localTransit: "Walking (coastal promenade), auto-rickshaws, government ferry to rock memorial",
      tips: "Catch the first ferry at 07:45 AM to beat the crowd to Vivekananda Rock."
    },
    localGuide: {
      transitOptions: "Kanyakumari is the terminus of India's longest railway route (Dibrugarh to Kanyakumari).",
      nearbyHotels: [
        { name: "Sparsa Resort Kanyakumari", priceCategory: "Eco Luxury", distance: "Sea facing", rating: 4.7, facilities: ["Oceanview rooms", "Ayurvedic spa", "Eco-friendly design"], samplePrice: "₹5,600/night" },
        { name: "Hotel Annai Resorts", priceCategory: "Resort", distance: "800m from rock ferry", rating: 4.5, facilities: ["Seaview balcony", "Multi-cuisine restaurant"], samplePrice: "₹4,200/night" }
      ],
      nearbyRestaurants: [
        { name: "The Ocean Heritage Restaurant", cuisine: "South Indian Coastal", priceLevel: "Moderate", popularDishes: ["Kanyakumari Meen Porichathu (Fish Fry)", "Nanjil Nattu Fish Curry"] },
        { name: "Saravana Pure Veg", cuisine: "South Indian Tiffin", priceLevel: "Budget", popularDishes: ["Crisp Podi Dosa", "South Indian Meals"] }
      ],
      mustTryFood: ["Nanjil Nadu Fish Curry with Red Rice", "Kothu Parotta", "Kanyakumari Red Banana (Sevvaazhai)"]
    },
    transportComparison: [
      { mode: "Taxi from Trivandrum Airport", costRange: "₹2,200 - ₹2,800", duration: "2h 30m", comfort: "Very High" },
      { mode: "Express Train from Trivandrum", costRange: "₹120 - ₹450", duration: "2 hours", comfort: "High" }
    ],
    heritageInfo: {
      era: "Modern Heritage & Classical Era (1970 CE Memorial / Ancient Temple)",
      historicalEra: "Modern Heritage",
      architecture: "Memorial Stone Architecture & Thiruvalluvar Colossus",
      unesco: false,
      significance: "Sacred confluence (Triveni Sangam) and tribute to ancient philosopher-poet Thiruvalluvar."
    },
    weatherByMonth: generate12MonthWeather(29, 20),
    weatherAlerts: { hasAlert: false, condition: "Brisk Oceanic Breeze", advisory: "High winds at Vivekananda rock; hold hats and cameras securely.", indoorAlternatives: ["Vivekananda Memorial Hall Archives", "Gandhi Memorial Mandapam"] },
    festivals: [{ name: "Chitra Pournami", timing: "April Full Moon", desc: "Simultaneous sunset and full moon rise visible on the same ocean horizon." }],
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },

  // --- INDIA: OTHER FAMOUS DESTINATIONS ---
  {
    id: "taj-mahal-agra",
    name: "Agra & The Taj Mahal",
    country: "India",
    countryCode: "IN",
    regionId: "uttar-pradesh",
    regionName: "Uttar Pradesh",
    category: "Heritage",
    coordinates: [27.1751, 78.0421],
    tagline: "An immortal poem in ivory-white Makrana marble",
    description: "Commissioned in 1632 by Mughal Emperor Shah Jahan, it stands as the jewel of Muslim art in India, with pietra dura gemstone inlays and symmetric Mughal charbagh gardens.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To witness the world wonder shimmer pink at sunrise, explore the red sandstone Agra Fort, and taste world-famous Agra petha.",
    bestTime: "October to March",
    crowdPrediction: { level: "Peak Crowd 🔴", statusColor: "text-red-500", score: 90, factors: "Closed Fridays; sunrise entrance offers shortest queues" },
    estimatedBudget: { budget: "$30 - $55 / day", moderate: "$65 - $120 / day", luxury: "$160 - $400 / day", currency: "INR / USD" },
    journeyScore: { total: 97, weather: 90, heritage: 100, culture: 96, accessibility: 95, budget: 92 },
    transportation: {
      nearestAirport: "Indira Gandhi International Airport, New Delhi (DEL) - 210 km via Yamuna Expressway",
      nearestRailway: "Agra Cantt (AGC) - Gatimaan Express connects from Delhi in 100 minutes",
      localTransit: "Electric battery auto-rickshaws, pollution-free golf carts in heritage zone, Uber",
      tips: "Book sunrise entry tickets online on the ASI portal to avoid huge ticket lines."
    },
    localGuide: {
      transitOptions: "Gatimaan Express (Fastest train) leaves Delhi Hazrat Nizamuddin at 08:10 AM, arrives Agra Cantt 09:50 AM.",
      nearbyHotels: [
        { name: "The Oberoi Amarvilas Agra", priceCategory: "Ultra Luxury", distance: "600m from Taj Mahal", rating: 4.9, facilities: ["Every room has direct Taj Mahal view", "Golf cart transfers", "Luxury spa"], samplePrice: "₹42,000/night" },
        { name: "ITC Mughal Agra", priceCategory: "Luxury Resort", distance: "3 km from Taj", rating: 4.7, facilities: ["35 acres of Mughal gardens", "Kaya Kalp Spa"], samplePrice: "₹9,500/night" }
      ],
      nearbyRestaurants: [
        { name: "Peshawri at ITC Mughal", cuisine: "Mughlai & North Indian", priceLevel: "Fine Dining", popularDishes: ["Dal Bukhara (slow-cooked 18 hours)", "Sikandari Raan", "Garlic Naan"] },
        { name: "Pinch of Spice", cuisine: "North Indian & Mughlai", priceLevel: "Moderate", popularDishes: ["Chicken Tikka Lababdar", "Paneer Pasanda"] }
      ],
      mustTryFood: ["Authentic Kesar Agra Petha", "Bedai with Aloo Sabzi & Hot Jalebi", "Mughlai Korma"]
    },
    transportComparison: [
      { mode: "Gatimaan Express High-Speed Train", costRange: "₹860 - ₹1,550", duration: "1h 40m from Delhi", comfort: "Very High" },
      { mode: "Private Car via Yamuna Expressway", costRange: "₹2,800 - ₹3,500", duration: "3 hours", comfort: "High" }
    ],
    heritageInfo: {
      era: "Medieval Era (1631–1648 CE)",
      historicalEra: "Medieval Era",
      architecture: "Mughal Architecture with Pietra Dura Inlay",
      unesco: true,
      significance: "One of the New Seven Wonders of the World and UNESCO World Heritage site."
    },
    weatherByMonth: generate12MonthWeather(25, 12, [10, 11, 0, 1, 2]),
    weatherAlerts: { hasAlert: false, condition: "Golden Daylight", advisory: "Taj Mahal is closed every Friday for prayers.", indoorAlternatives: ["Agra Fort Jahangiri Mahal", "Itmad-ud-Daulah (Baby Taj)"] },
    festivals: [{ name: "Taj Mahotsav", timing: "February 18–27", desc: "Ten-day cultural festival with artisan handicrafts, folk dances, and food stalls." }],
    virtualTourId: "tour-taj-mahal",
    isHiddenGem: false
  },
  {
    id: "jaipur",
    name: "Jaipur Pink City & Amer Fort",
    country: "India",
    countryCode: "IN",
    regionId: "rajasthan",
    regionName: "Rajasthan",
    category: "Heritage",
    coordinates: [26.9124, 75.7873],
    tagline: "The royal Pink City of palaces, hill forts, and gemstones",
    description: "Capital of Rajasthan, famed for the honeycomb façade of Hawa Mahal, the lakeside hilltop Amer Fort with its mirrored Sheesh Mahal, and UNESCO Jantar Mantar.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To climb the ramparts of Amer Fort, shop for block-printed textiles in Johari Bazaar, and photograph the pastel pink city gates.",
    bestTime: "October to March",
    crowdPrediction: { level: "High Crowd", statusColor: "text-amber-500", score: 75, factors: "Peak during winter holiday and Jaipur Literature Festival in January" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$55 - $110 / day", luxury: "$150 - $450 / day", currency: "INR / USD" },
    journeyScore: { total: 96, weather: 91, heritage: 99, culture: 98, accessibility: 94, budget: 92 },
    transportation: {
      nearestAirport: "Jaipur International Airport (JAI) - 13 km",
      nearestRailway: "Jaipur Junction (JP) - Vande Bharat connects to Delhi in 3h 40m",
      localTransit: "Jaipur Metro, auto-rickshaws, Uber, electric cabs",
      tips: "Buy a composite 2-day entry ticket covering Amer Fort, Hawa Mahal, Jantar Mantar, and Nahargarh."
    },
    localGuide: {
      transitOptions: "Vande Bharat Express connects Delhi to Jaipur in under 4 hours.",
      nearbyHotels: [
        { name: "Rambagh Palace Jaipur", priceCategory: "Palace Luxury", distance: "Bhawani Singh Rd", rating: 4.9, facilities: ["Former residence of the Maharaja", "Peacock gardens", "Royal dining"], samplePrice: "₹38,000/night" },
        { name: "Samode Haveli", priceCategory: "Heritage Haveli", distance: "Old City", rating: 4.8, facilities: ["175-year-old painted frescoes", "Courtyard pool"], samplePrice: "₹14,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Laxmi Mishthan Bhandar (LMB)", cuisine: "Rajasthani Traditional", priceLevel: "Moderate", popularDishes: ["Dal Baati Churma Thali", "Pyaaz Kachori", "Ghewar"] },
        { name: "1135 AD at Amer Fort", cuisine: "Royal Rajputana Cuisine", priceLevel: "Fine Dining", popularDishes: ["Laal Maas", "Safed Maas", "Rose Scented Kheer"] }
      ],
      mustTryFood: ["Authentic Fiery Laal Maas", "Dal Baati Churma with Ghee", "Rawat Pyaaz Kachori", "Paneer Ghewar"]
    },
    transportComparison: [
      { mode: "Vande Bharat Express Train", costRange: "₹880 - ₹1,650", duration: "3h 45m from Delhi", comfort: "Very High" },
      { mode: "Flight from Mumbai/Delhi", costRange: "₹2,500 - ₹4,800", duration: "1 hour", comfort: "Very High" }
    ],
    heritageInfo: {
      era: "Early Modern Era (1727 CE Maharaja Sawai Jai Singh II)",
      historicalEra: "Early Modern Era",
      architecture: "Rajput & Mughal Fusion Stone Architecture",
      unesco: true,
      significance: "Jaipur City inscribed on UNESCO list as a masterpiece of ancient urban planning."
    },
    weatherByMonth: generate12MonthWeather(24, 10),
    weatherAlerts: { hasAlert: false, condition: "Warm Winter Sun", advisory: "Sunny afternoons; cool evenings around 12°C in December.", indoorAlternatives: ["City Palace Museum & Armory", "Anokhi Museum of Hand Printing"] },
    festivals: [{ name: "Jaipur Literature Festival", timing: "January", desc: "The world's largest free literary festival gathering global authors and thinkers." }],
    virtualTourId: "tour-taj-mahal",
    isHiddenGem: false
  },
  {
    id: "varanasi",
    name: "Varanasi (Kashi) Sacred River Ghats",
    country: "India",
    countryCode: "IN",
    regionId: "uttar-pradesh",
    regionName: "Uttar Pradesh",
    category: "Spiritual",
    coordinates: [25.3176, 82.9739],
    tagline: "The 3,000-year-old spiritual heart of India on the holy Ganges",
    description: "One of the oldest living cities in the world, sacred to Shiva, where 88 stone ghats meet the holy Ganga, illuminated each evening by the synchronized brass lamps of the Ganga Aarti.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To experience a sunrise rowing boat along the misty Ganges, witness the celestial evening Aarti at Dashashwamedh Ghat, and visit Sarnath where Buddha gave his first sermon.",
    bestTime: "October to March",
    crowdPrediction: { level: "High Crowd", statusColor: "text-amber-500", score: 78, factors: "Devotees gather continuously; morning boat rides are peaceful" },
    estimatedBudget: { budget: "$20 - $35 / day", moderate: "$45 - $85 / day", luxury: "$120 - $300 / day", currency: "INR / USD" },
    journeyScore: { total: 96, weather: 88, heritage: 99, culture: 100, accessibility: 91, budget: 96 },
    transportation: {
      nearestAirport: "Lal Bahadur Shastri International Airport (VNS) - 24 km",
      nearestRailway: "Varanasi Junction (BSB) & Pt. Deen Dayal Upadhyaya Junction",
      localTransit: "Cycle-rickshaws, electric autos, rowing boats on Ganga",
      tips: "Hire a hand-rowed wooden boat at 05:30 AM from Assi Ghat to Manikarnika Ghat."
    },
    localGuide: {
      transitOptions: "Vande Bharat Express links Delhi to Varanasi in 8 hours.",
      nearbyHotels: [
        { name: "BrijRama Palace Varanasi", priceCategory: "Heritage Luxury", distance: "On Darbhanga Ghat", rating: 4.9, facilities: ["Historical 18th-century palace right on the river", "Private boat transfer"], samplePrice: "₹18,000/night" },
        { name: "Taj Ganges Varanasi", priceCategory: "Luxury", distance: "Cantonment", rating: 4.8, facilities: ["12 acres of gardens", "Pool", "Spa"], samplePrice: "₹11,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Kashi Chaat Bhandar", cuisine: "Famous Varanasi Street Food", priceLevel: "Budget", popularDishes: ["Tamatar Chaat", "Dahi Puri", "Palak Patta Chaat"] },
        { name: "Blue Lassi Shop", cuisine: "Artisanal Lassi", priceLevel: "Budget", popularDishes: ["Pomegranate Lassi with Rabri and Pistachio"] }
      ],
      mustTryFood: ["Banarasi Tamatar Chaat", "Makkhan Malai (Winter Milk Cloud Foam)", "Banarasi Paan", "Kachori Jalebi Breakfast"]
    },
    transportComparison: [
      { mode: "Vande Bharat Train from Delhi", costRange: "₹1,550 - ₹2,900", duration: "8 hours", comfort: "Very High" },
      { mode: "Flight from Delhi/Mumbai", costRange: "₹3,200 - ₹5,800", duration: "1h 20m", comfort: "Very High" }
    ],
    heritageInfo: {
      era: "Ancient & Medieval Era (1200 BCE to 18th Century Maratha reconstructions)",
      historicalEra: "Ancient Era",
      architecture: "Riverside Stone Ghat Palaces & Kashi Vishwanath Gold Spire",
      unesco: false,
      significance: "Spiritual capital of India where liberation (Moksha) has been sought for millennia."
    },
    weatherByMonth: generate12MonthWeather(25, 18),
    weatherAlerts: { hasAlert: false, condition: "Sacred Morning Mist", advisory: "Dense winter fog possible in Dec–Jan mornings.", indoorAlternatives: ["Sarnath Archaeological Museum (Ashoka Lion Capital)"] },
    festivals: [{ name: "Dev Deepawali", timing: "November (Kartik Poornima)", desc: "A million earthen lamps lit across all 88 ghats turning the river into a sea of stars." }],
    virtualTourId: "tour-taj-mahal",
    isHiddenGem: false
  },

  // --- JAPAN: 8 MAJOR DESTINATIONS ---
  {
    id: "kyoto-temples",
    name: "Kyoto Imperial Temples & Zen Gardens",
    country: "Japan",
    countryCode: "JP",
    regionId: "kansai",
    regionName: "Kansai",
    category: "Heritage",
    coordinates: [35.0116, 135.7681],
    tagline: "Heart of thousand-year imperial Shinto & Zen serenity",
    description: "Former imperial capital of Japan for over a millennium, housing over 2,000 temples and shrines, including the shimmering Kinkaku-ji and 10,000 vermilion gates of Fushimi Inari.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To walk under glowing torii gates, meditate in dry Zen rock gardens of Ryoan-ji, and taste ceremonial Uji matcha tea.",
    bestTime: "March to May (Sakura) & October to November (Momiji)",
    crowdPrediction: { level: "Peak Crowd 🔴 in Sakura", statusColor: "text-red-500", score: 85, factors: "Visit Fushimi Inari at dawn (06:00 AM) to experience serene empty paths" },
    estimatedBudget: { budget: "$70 - $110 / day", moderate: "$140 - $220 / day", luxury: "$350 - $800 / day", currency: "JPY / USD" },
    journeyScore: { total: 97, weather: 92, heritage: 100, culture: 100, accessibility: 98, budget: 82 },
    transportation: {
      nearestAirport: "Kansai International Airport (KIX) - 75 min on JR Haruka Express",
      nearestRailway: "Kyoto Station (Tokaido Shinkansen bullet train from Tokyo in 135 mins)",
      localTransit: "Kyoto City Subway, pristine bus network, electric rental bicycles",
      tips: "Purchase an IC card (ICOCA/Suica) for tap-and-go transit across all trains and buses."
    },
    localGuide: {
      transitOptions: "Tokaido Shinkansen connects Tokyo to Kyoto in 2 hours 15 minutes.",
      nearbyHotels: [
        { name: "The Ritz-Carlton Kyoto", priceCategory: "Ultra Luxury", distance: "Kamogawa River", rating: 4.9, facilities: ["Traditional machiya aesthetics", "Michelin tempura"], samplePrice: "¥120,000/night" },
        { name: "Gion Hatanaka Ryokan", priceCategory: "Traditional Ryokan", distance: "Gion Quarter", rating: 4.8, facilities: ["Kaiseki banquet in room", "Hinoki cedar bath"], samplePrice: "¥55,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Gion Karyo", cuisine: "Seasonal Kaiseki", priceLevel: "Fine Dining", popularDishes: ["10-Course Kyoto Spring Kaiseki", "Steamed Tilefish with Lotus Root"] },
        { name: "Honke Owariya", cuisine: "Historic Soba (est. 1465)", priceLevel: "Moderate", popularDishes: ["Hourai Soba with 8 condiments", "Soba Soba confection"] }
      ],
      mustTryFood: ["Kaiseki Ryori Haute Cuisine", "Uji Ceremonial Matcha Parfait", "Yudofu (Simmered Silken Tofu)"]
    },
    transportComparison: [
      { mode: "Shinkansen Bullet Train from Tokyo", costRange: "¥14,000 ($95)", duration: "2h 15m", comfort: "Supreme" },
      { mode: "Highway Overnight Bus (Willer Express)", costRange: "¥4,500 ($30)", duration: "7h 30m", comfort: "Moderate" }
    ],
    heritageInfo: {
      era: "Classical & Medieval Era (794–1868 CE Heian to Edo Periods)",
      historicalEra: "Classical Era",
      architecture: "Japanese Traditional Timber Post-and-Beam & Zen Garden Landscapes",
      unesco: true,
      significance: "Historic Monuments of Ancient Kyoto designated a UNESCO World Heritage site."
    },
    weatherByMonth: generate12MonthWeather(16, 25, [3, 4, 10, 11]),
    weatherAlerts: { hasAlert: false, condition: "Crisp Temple Sunlight", advisory: "Slip-on shoes recommended for frequent shoe removal at temples.", indoorAlternatives: ["Kyoto National Museum", "Gion Corner Cultural Theater"] },
    festivals: [{ name: "Gion Matsuri", timing: "July", desc: "Month-long festival with gigantic multi-story wooden floats parading through Kyoto." }],
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },
  {
    id: "tokyo",
    name: "Tokyo Metropolis & Asakusa Senso-ji",
    country: "Japan",
    countryCode: "JP",
    regionId: "kanto",
    regionName: "Kanto",
    category: "City",
    coordinates: [35.6762, 139.6503],
    tagline: "The hyper-modern capital where neon towers meet ancient Edo shrines",
    description: "The world's most populous and impeccably organized metropolis, combining 7th-century Senso-ji temple in Asakusa with the world's busiest Shibuya Scramble crossing and Tsukiji sushi markets.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To experience TeamLab Borderless immersive digital art, cross the neon crossing in Shibuya, and savor omakase sushi at 6 AM in Toyosu.",
    bestTime: "March to May & September to November",
    crowdPrediction: { level: "High Crowd", statusColor: "text-amber-500", score: 80, factors: "Trains are busy 08:00 - 09:00 AM weekdays" },
    estimatedBudget: { budget: "$80 - $130 / day", moderate: "$160 - $280 / day", luxury: "$400 - $1000 / day", currency: "JPY / USD" },
    journeyScore: { total: 97, weather: 91, heritage: 94, culture: 99, accessibility: 100, budget: 80 },
    transportation: {
      nearestAirport: "Tokyo Haneda (HND) - 25 min by monorail / Tokyo Narita (NRT) - 50 min by Narita Express",
      nearestRailway: "Tokyo Station, Shinjuku Station, Shibuya Station",
      localTransit: "JR Yamanote Line, Tokyo Metro, Toei Subway",
      tips: "Download Google Maps or Japan Travel by NAVITIME for platform-accurate train transfers."
    },
    localGuide: {
      transitOptions: "The world's most punctual urban train network with departures every 2 minutes.",
      nearbyHotels: [
        { name: "Aman Tokyo", priceCategory: "Ultra Luxury", distance: "Otemachi", rating: 4.9, facilities: ["Floor-to-ceiling Mount Fuji views", "Traditional black basalt baths"], samplePrice: "¥180,000/night" },
        { name: "Hotel Gracery Shinjuku", priceCategory: "Modern Mid-range", distance: "Shinjuku Kabukicho", rating: 4.6, facilities: ["Life-sized Godzilla head terrace", "Direct subway access"], samplePrice: "¥24,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Daiwa Sushi (Toyosu)", cuisine: "Edomae Omakase Sushi", priceLevel: "Premium (¥6,000)", popularDishes: ["Otoro Fatty Tuna", "Uni Sea Urchin", "Fresh Anago Eel"] },
        { name: "Ichiran Ramen Shibuya", cuisine: "Tonkotsu Ramen", priceLevel: "Budget (¥1,100)", popularDishes: ["Customizable Pork Bone Broth Ramen with spicy red sauce"] }
      ],
      mustTryFood: ["Edomae Omakase Nigiri Sushi", "Rich Tonkotsu Ramen", "Yakitori Skewers under Yurakucho tracks", "Monjayaki"]
    },
    transportComparison: [
      { mode: "Tokyo Metro 24-Hour Pass", costRange: "¥800 ($5.50)", duration: "Unlimited 24-hr rides", comfort: "Supreme" },
      { mode: "Tokyo Taxi", costRange: "¥3,000 - ¥6,000", duration: "Varies by traffic", comfort: "High" }
    ],
    heritageInfo: {
      era: "Classical to Modern Era (628 CE Senso-ji founding to Meiji Restoration)",
      historicalEra: "Classical Era",
      architecture: "Edo Timber Temples & Japanese Modernism",
      unesco: false,
      significance: "Oldest Buddhist temple in Tokyo (Senso-ji) and capital of modern Japan."
    },
    weatherByMonth: generate12MonthWeather(16, 20),
    weatherAlerts: { hasAlert: false, condition: "Clear Skyline", advisory: "Clear skies; Mount Fuji visible from Shibuya Sky.", indoorAlternatives: ["TeamLab Planets Immersive Digital Museum", "Tokyo National Museum Ueno"] },
    festivals: [{ name: "Sanja Matsuri (Asakusa)", timing: "Third Weekend of May", desc: "Over 100 mikoshi shrines carried through Asakusa by two million revelers." }],
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },
  {
    id: "mount-fuji",
    name: "Mount Fuji & Five Lakes (Fuji-Goko)",
    country: "Japan",
    countryCode: "JP",
    regionId: "kanto",
    regionName: "Kanto",
    category: "Mountains",
    coordinates: [35.3606, 138.7274],
    tagline: "The sacred snow-capped volcano and eternal muse of Japan",
    description: "Rising 3,776 meters as Japan's highest peak, Mount Fuji has been worshipped as a sacred kami mountain and painted by Hokusai. The Five Lakes below offer iconic mirror reflections and hot spring onsens.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To view Fuji reflected on Lake Kawaguchiko framed by cherry blossoms or maple leaves, and soak in an open-air hot spring.",
    bestTime: "November to February (Best snow cone visibility) & July–August (Climbing season)",
    crowdPrediction: { level: "High on Weekends", statusColor: "text-amber-500", score: 72, factors: "Early mornings have best clear skies before clouds roll in" },
    estimatedBudget: { budget: "$60 - $95 / day", moderate: "$130 - $220 / day", luxury: "$300 - $700 / day", currency: "JPY / USD" },
    journeyScore: { total: 95, weather: 90, heritage: 96, culture: 96, accessibility: 92, budget: 85 },
    transportation: {
      nearestAirport: "Tokyo Haneda (HND) - 110 km",
      nearestRailway: "Kawaguchiko Station (Fuji Excursion direct express train from Shinjuku in 115 mins)",
      localTransit: "Fuji Retro Bus, rental bicycles along the lake shores",
      tips: "Take the direct Fuji Excursion train from Shinjuku for a smooth journey without transfers."
    },
    localGuide: {
      transitOptions: "Direct Fuji Excursion express leaves Shinjuku Station daily at 07:30, 08:30, and 09:30 AM.",
      nearbyHotels: [
        { name: "Hoshinoya Fuji", priceCategory: "Glamping Luxury", distance: "Lake Kawaguchiko", rating: 4.9, facilities: ["Cabin balcony with private fire pit", "Direct view of Fuji", "Forest dining"], samplePrice: "¥95,000/night" },
        { name: "Fuji Onsenji Yumedono", priceCategory: "Onsen Ryokan", distance: "500m from lake", rating: 4.8, facilities: ["Private open-air hot spring bath in room", "Multi-course Kaiseki"], samplePrice: "¥60,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Hoto Fudo", cuisine: "Yamanashi Regional Cuisine", priceLevel: "Budget to Moderate (¥1,300)", popularDishes: ["Hoto Noodles (flat udon stewed in miso broth with pumpkin and mountain vegetables)"] }
      ],
      mustTryFood: ["Yamanashi Hoto Miso Noodles", "Fujiyama Craft Beer", "Fresh Koshu Grapes & Peaches"]
    },
    transportComparison: [
      { mode: "Direct Fuji Excursion Express Train", costRange: "¥4,130 ($28)", duration: "1h 55m from Shinjuku", comfort: "Very High" },
      { mode: "Highway Bus from Shinjuku Expressway Bus Terminal", costRange: "¥2,200 ($15)", duration: "2 hours", comfort: "High" }
    ],
    heritageInfo: {
      era: "Living Sacred Heritage & Ancient Era",
      historicalEra: "Ancient Era",
      architecture: "Sacred Volcanic Caldera & Sengen Shinto Mountain Shrines",
      unesco: true,
      significance: "Inscribed on UNESCO World Heritage list as 'Fujisan, sacred place and source of artistic inspiration'."
    },
    weatherByMonth: generate12MonthWeather(10, 20),
    weatherAlerts: { hasAlert: false, condition: "Clear Mountain Visibility", advisory: "Fuji visibility is highest early morning (07:00–10:00 AM).", indoorAlternatives: ["Itchiku Kubota Art Museum (Tsujigahana Silk Kimonos)"] },
    festivals: [{ name: "Fuji Shibazakura Festival", timing: "Mid-April to Late May", desc: "800,000 pink moss phlox blooms create a vivid pink carpet beneath Mount Fuji." }],
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },

  // --- CAMBODIA: ANGKOR WAT ---
  {
    id: "angkor-wat",
    name: "Angkor Wat Archaeological Park",
    country: "Cambodia",
    countryCode: "KH",
    regionId: "siem-reap",
    regionName: "Siem Reap",
    category: "Heritage",
    coordinates: [13.4125, 103.8670],
    tagline: "The supreme religious monument in human history",
    description: "Built in the early 12th century by King Suryavarman II as the state temple and capital city, Angkor Wat symbolizes Mount Meru—the home of the gods—surrounded by a 5-kilometer-long moat and adorned with bas-relief apsara dancers.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To watch the sun rise behind five iconic lotus towers, explore giant tree roots strangling Ta Prohm, and marvel at bas-relief carvings of the Churning of the Ocean of Milk.",
    bestTime: "November to March",
    crowdPrediction: { level: "High at Sunrise", statusColor: "text-amber-500", score: 75, factors: "Outer temples (Banteay Srei, Preah Khan) are peaceful and less visited" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$55 - $100 / day", luxury: "$160 - $380 / day", currency: "USD / KHR" },
    journeyScore: { total: 96, weather: 89, heritage: 100, culture: 98, accessibility: 89, budget: 95 },
    transportation: {
      nearestAirport: "Siem Reap-Angkor International Airport (SAI) - 45 km",
      nearestRailway: "N/A (Buses and domestic flights from Phnom Penh)",
      localTransit: "Dedicated private tuk-tuk drivers, electric bicycles",
      tips: "Hire a friendly licensed tuk-tuk driver for $20-$25 for the full-day grand temple circuit."
    },
    localGuide: {
      transitOptions: "Airport shuttles take 50 minutes on the new expressway from SAI airport.",
      nearbyHotels: [
        { name: "Amansara Siem Reap", priceCategory: "Ultra Luxury", distance: "10 min from Angkor", rating: 4.9, facilities: ["Former royal guesthouse of King Sihanouk", "Private temple remork excursions"], samplePrice: "$1,100/night" },
        { name: "Shinta Mani Angkor", priceCategory: "Boutique Luxury", distance: "French Quarter", rating: 4.8, facilities: ["Bill Bensley design", "Saltwater pool"], samplePrice: "$180/night" }
      ],
      nearbyRestaurants: [
        { name: "Cuisine Wat Damnak", cuisine: "Khmer Fine Dining", priceLevel: "Fine Dining ($45)", popularDishes: ["Mekong Langoustine with Green Mango", "Slow-braised Beef with Wild Curry Leaves"] },
        { name: "Marum", cuisine: "Creative Khmer Tapas", priceLevel: "Moderate ($10-$18)", popularDishes: ["Lotus Root Salad", "Silkworms with Herbs (adventurous)", "Fish Amok"] }
      ],
      mustTryFood: ["Traditional Fish Amok steamed in Banana Leaf", "Nom Banh Chok Khmer Rice Noodles", "Lok Lak Stir-Fried Beef with Pepper Lime Dip"]
    },
    transportComparison: [
      { mode: "Full-Day Private Tuk-Tuk with Driver", costRange: "$18 - $25", duration: "Full Day (Sunrise to Sunset)", comfort: "Iconic & Breezy" },
      { mode: "Air-Conditioned Private SUV", costRange: "$45 - $60", duration: "Full Day", comfort: "Very High" }
    ],
    heritageInfo: {
      era: "Classical Era (1113–1150 CE Khmer Empire)",
      historicalEra: "Classical Era",
      architecture: "Khmer Temple Mountain Sandstone Architecture",
      unesco: true,
      significance: "Largest religious monument in the world spanning 400 square kilometers."
    },
    weatherByMonth: generate12MonthWeather(28, 20),
    weatherAlerts: { hasAlert: false, condition: "Warm Tropical Sunlight", advisory: "Bring hydration and sun protection for temple climbing.", indoorAlternatives: ["Angkor National Museum (Gallery of 1,000 Buddhas)"] },
    festivals: [{ name: "Khmer New Year (Chaul Chnam Thmey)", timing: "Mid-April", desc: "Temple blessings, traditional water throwing, and classical games around Angkor." }],
    virtualTourId: "tour-angkor-wat",
    isHiddenGem: false
  },

  // --- INDONESIA: BOROBUDUR ---
  {
    id: "borobudur",
    name: "Borobudur & Prambanan Temple Compounds",
    country: "Indonesia",
    countryCode: "ID",
    regionId: "central-java",
    regionName: "Central Java",
    category: "Heritage",
    coordinates: [-7.6079, 110.2038],
    tagline: "The world's grandest Buddhist pyramid surrounded by active twin volcanoes",
    description: "Constructed in the 9th century by the Sailendra Dynasty, Borobudur rises in nine stacked stone terraces crowned by 72 perforated stupas, with 504 Buddha statues gazing across the volcanic valley of Kedu.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To climb through three Buddhist cosmological realms (Kamadhatu, Rupadhatu, Arupadhatu) at sunrise against Mount Merapi's morning mist.",
    bestTime: "May to September",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 60, factors: "Strict visitor quota on monument terraces keeps crowds well regulated" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$55 - $95 / day", luxury: "$150 - $350 / day", currency: "IDR / USD" },
    journeyScore: { total: 95, weather: 91, heritage: 100, culture: 96, accessibility: 88, budget: 93 },
    transportation: {
      nearestAirport: "Yogyakarta International Airport (YIA) - 45 km",
      nearestRailway: "Yogyakarta Tugu Station (YK) - 38 km",
      localTransit: "Private charter cars, tourist shuttle buses, Grab taxis",
      tips: "Book the official temple monument ticket online in advance to access the upper stupa terraces."
    },
    localGuide: {
      transitOptions: "Frequent high-speed trains from Jakarta to Yogyakarta in 6 hours, then 1-hour shuttle to Borobudur.",
      nearbyHotels: [
        { name: "Amanjiwo", priceCategory: "Ultra Luxury", distance: "Overlooking Borobudur", rating: 4.9, facilities: ["Limestone rotunda mimicking Borobudur", "Private view of stupas"], samplePrice: "$950/night" },
        { name: "Plataran Borobudur Resort & Spa", priceCategory: "Luxury Resort", distance: "2 km", rating: 4.8, facilities: ["Private pool villas", "Javanese spa"], samplePrice: "$220/night" }
      ],
      nearbyRestaurants: [
        { name: "Stupa Restaurant by Plataran", cuisine: "Traditional Javanese", priceLevel: "Moderate", popularDishes: ["Bebek Goreng Crispy Duck", "Nasi Goreng Kampung", "Es Cendol"] }
      ],
      mustTryFood: ["Gudeg Jogja (Slow-cooked Jackfruit with Coconut)", "Bakpia Pathok Pastries", "Sate Klathak (Iron-skewer Mutton Satay)"]
    },
    transportComparison: [
      { mode: "Private Car Charter with Driver", costRange: "IDR 600,000 ($38)", duration: "1 hour from Yogyakarta", comfort: "Very High" },
      { mode: "DAMRI Airport Shuttle Bus", costRange: "IDR 50,000 ($3.20)", duration: "1h 30m", comfort: "Moderate" }
    ],
    heritageInfo: {
      era: "Classical Era (c. 750–825 CE Sailendra Dynasty)",
      historicalEra: "Classical Era",
      architecture: "Javanese Buddhist Stepped Pyramid Andesite Stone Architecture",
      unesco: true,
      significance: "Single largest Buddhist temple monument in existence."
    },
    weatherByMonth: generate12MonthWeather(28, 25),
    weatherAlerts: { hasAlert: false, condition: "Sunny Tropical Climate", advisory: "Wear slip-on footwear and comfortable temple walking shoes.", indoorAlternatives: ["Karmawibhangga Museum (Hidden relief carvings)"] },
    festivals: [{ name: "Waisak (Vesak Day)", timing: "May (Full Moon)", desc: "Thousands of Buddhist monks walk from Mendut to Borobudur, culminating in release of sky lanterns." }],
    virtualTourId: "tour-borobudur",
    isHiddenGem: false
  },

  // --- CHINA: BEIJING & FORBIDDEN CITY ---
  {
    id: "beijing-forbidden-city",
    name: "Beijing & The Imperial Forbidden City",
    country: "China",
    countryCode: "CN",
    regionId: "north-china",
    regionName: "North China",
    category: "Heritage",
    coordinates: [39.9163, 116.3972],
    tagline: "The imperial heart of Ming and Qing dynasties for five centuries",
    description: "The world's largest palatial complex spanning 980 surviving wooden buildings and 8,700 bays, housing 24 emperors, crowned by golden glazed roof tiles and vermilion walls.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To walk through the Meridian Gate into the Hall of Supreme Harmony, stroll the Jingshan Park hill overlooking the sea of gold roofs, and taste authentic Peking roast duck.",
    bestTime: "April to May & September to October (Golden Autumn)",
    crowdPrediction: { level: "Peak Crowd 🔴", statusColor: "text-red-500", score: 88, factors: "Strict daily quota of 30,000 visitors; tickets must be booked 7 days in advance" },
    estimatedBudget: { budget: "$40 - $70 / day", moderate: "$80 - $160 / day", luxury: "$250 - $600 / day", currency: "CNY / USD" },
    journeyScore: { total: 96, weather: 90, heritage: 100, culture: 98, accessibility: 98, budget: 88 },
    transportation: {
      nearestAirport: "Beijing Capital (PEK) / Beijing Daxing (PKX) - direct high-speed subways",
      nearestRailway: "Beijing South Railway Station (Bullet trains to Shanghai in 4h 18m)",
      localTransit: "Beijing Subway Lines 1 & 8 (Tiananmen East / West)",
      tips: "Book entry tickets online 7 days in advance at 8:00 PM Beijing time when slots release."
    },
    localGuide: {
      transitOptions: "Beijing Subway Line 1 takes you directly to Tiananmen East station.",
      nearbyHotels: [
        { name: "The Peninsula Beijing", priceCategory: "Ultra Luxury", distance: "Wangfujing (1.5 km)", rating: 4.9, facilities: ["All-suite rooms", "Michelin dining", "Rolls-Royce fleet"], samplePrice: "¥3,200/night" },
        { name: "Mandarin Oriental Wangfujing", priceCategory: "Luxury", distance: "1.2 km", rating: 4.9, facilities: ["Roof terrace overlooking Forbidden City"], samplePrice: "¥4,500/night" }
      ],
      nearbyRestaurants: [
        { name: "Siji Minfu Roast Duck", cuisine: "Authentic Peking Duck", priceLevel: "Moderate (¥180)", popularDishes: ["Crisp Wood-fired Peking Roast Duck with pancakes and sweet bean sauce"] },
        { name: "Dali Courtyard", cuisine: "Yunnan Cuisine", priceLevel: "Moderate", popularDishes: ["Lemongrass Grilled Fish", "Wild Mushroom Salad"] }
      ],
      mustTryFood: ["Authentic Wood-fired Peking Roast Duck", "Zhajiangmian Hand-pulled Noodles", "Jiaozi Dumplings"]
    },
    transportComparison: [
      { mode: "Beijing Subway", costRange: "¥3 - ¥7 ($0.50 - $1.00)", duration: "Fast & Traffic-free", comfort: "Very High" },
      { mode: "High-Speed Train from Shanghai", costRange: "¥553 ($78)", duration: "4h 18m (350 km/h)", comfort: "Supreme" }
    ],
    heritageInfo: {
      era: "Medieval to Early Modern Era (1420 CE Ming & Qing Dynasties)",
      historicalEra: "Medieval Era",
      architecture: "Traditional Chinese Post-and-Beam Timber Framing with Dougong Brackets",
      unesco: true,
      significance: "Largest and best-preserved ancient timber palatial complex on Earth."
    },
    weatherByMonth: generate12MonthWeather(15, 15, [8, 9, 3, 4]),
    weatherAlerts: { hasAlert: false, condition: "Pleasant Crisp Sunlight", advisory: "Passport required for entry gate security checks.", indoorAlternatives: ["Palace Museum Treasure Gallery", "National Museum of China"] },
    festivals: [{ name: "Golden Autumn Chrysanthemum Fair", timing: "October", desc: "Thousands of imperial chrysanthemum pots in Beihai and Jingshan parks." }],
    virtualTourId: "tour-great-wall",
    isHiddenGem: false
  },
  {
    id: "great-wall",
    name: "The Great Wall of China (Mutianyu)",
    country: "China",
    countryCode: "CN",
    regionId: "north-china",
    regionName: "North China",
    category: "Heritage",
    coordinates: [40.4319, 116.5704],
    tagline: "The 21,000-kilometer stone dragon winding across mountain ridges",
    description: "One of the greatest engineering wonders of civilization, the Mutianyu section features 22 watchtowers winding through lush pine forests, accessible by cable car and thrilling alpine toboggan.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To hike along ancient granite watchtowers stretching across green mountain crests and ride the toboggan slide down the valley.",
    bestTime: "April to May & September to November",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 60, factors: "Much less crowded than Badaling" },
    estimatedBudget: { budget: "$35 - $60 / day", moderate: "$75 - $130 / day", luxury: "$200 - $450 / day", currency: "CNY / USD" },
    journeyScore: { total: 97, weather: 90, heritage: 100, culture: 96, accessibility: 90, budget: 90 },
    transportation: {
      nearestAirport: "Beijing Capital (PEK) - 55 km",
      nearestRailway: "Huairou North Railway Station",
      localTransit: "Mubus direct shuttle from Dongzhimen, private charter car",
      tips: "Take the cable car up to Tower 14, hike up to Tower 20, and ride the toboggan down from Tower 6."
    },
    localGuide: {
      transitOptions: "Mubus departs Dongzhimen subway in Beijing daily at 07:30 and 08:30 AM (90 mins).",
      nearbyHotels: [
        { name: "The Brickyard Retreat at Mutianyu", priceCategory: "Eco Boutique", distance: "2 km from wall", rating: 4.8, facilities: ["Renovated tile factory", "Direct views of Great Wall", "Outdoor hot tub"], samplePrice: "¥1,800/night" }
      ],
      nearbyRestaurants: [
        { name: "Xin Sishun Chestnut Chicken", cuisine: "Huairou Local Specialty", priceLevel: "Moderate", popularDishes: ["Stewed Farm Chicken with Huairou Chestnuts", "Rainbow Trout"] }
      ],
      mustTryFood: ["Huairou Roasted Chestnuts", "Fresh Mountain River Rainbow Trout", "Chinese Country Cornbread"]
    },
    transportComparison: [
      { mode: "Direct Mubus Tourist Express", costRange: "¥80 ($11) roundtrip", duration: "1h 30m", comfort: "High" },
      { mode: "Private Chauffeured Car", costRange: "¥600 ($85)", duration: "1h 15m", comfort: "Very High" }
    ],
    heritageInfo: {
      era: "Ancient to Medieval Era (7th Cent BCE to 1569 CE Ming Dynasty)",
      historicalEra: "Medieval Era",
      architecture: "Military Granite Masonry with Crenellated Watchtowers",
      unesco: true,
      significance: "World's longest military defense fortification and premier UNESCO World Heritage Site."
    },
    weatherByMonth: generate12MonthWeather(14, 18),
    weatherAlerts: { hasAlert: false, condition: "Clear Mountain Ridge Sunlight", advisory: "Steep steps; wear sturdy hiking sneakers.", indoorAlternatives: ["Great Wall Museum at Badaling"] },
    festivals: [{ name: "Great Wall Marathon", timing: "May", desc: "Global athletes racing along 5,164 stone steps of the Great Wall." }],
    virtualTourId: "tour-great-wall",
    isHiddenGem: false
  },

  // --- JORDAN: PETRA ---
  {
    id: "petra",
    name: "Petra & The Treasury (Al-Khazneh)",
    country: "Jordan",
    countryCode: "JO",
    regionId: "wadi-musa",
    regionName: "Ma'an Governorate",
    category: "Heritage",
    coordinates: [30.3285, 35.4444],
    tagline: "The rose-red city half as old as time",
    description: "Carved directly into the vibrant pink sandstone cliffs by the Nabataean civilization over 2,000 years ago, hidden at the end of the narrow Siq canyon chasm.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75" },
    gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=75"],
    whyVisit: "To walk through the narrow Siq canyon and gasp as the 40-meter Treasury facade emerges between red rock walls, then hike to the colossal Monastery (Ad-Deir).",
    bestTime: "March to May & September to November",
    crowdPrediction: { level: "Moderate to High", statusColor: "text-amber-500", score: 70, factors: "Arrive at 06:00 AM opening for empty Siq canyon walk" },
    estimatedBudget: { budget: "$60 - $95 / day", moderate: "$110 - $200 / day", luxury: "$250 - $600 / day", currency: "JOD / USD" },
    journeyScore: { total: 96, weather: 90, heritage: 100, culture: 96, accessibility: 88, budget: 85 },
    transportation: {
      nearestAirport: "Queen Alia International Airport (AMM) in Amman - 215 km / King Hussein Airport Aqaba (AQJ) - 125 km",
      nearestRailway: "N/A (JETT tourist bus from Amman or private taxi)",
      localTransit: "Walking (primary mode - expect 15-20 km hiking per day), authorized Bedouin donkeys/camels",
      tips: "Buy the Jordan Pass before flying—it covers your visa fee and Petra entry tickets."
    },
    localGuide: {
      transitOptions: "Daily JETT bus departs Amman 7th Circle at 06:30 AM directly to Petra Visitor Center.",
      nearbyHotels: [
        { name: "Mövenpick Resort Petra", priceCategory: "Luxury", distance: "Directly opposite entrance gate", rating: 4.8, facilities: ["Oriental courtyard", "Rooftop garden", "Pool"], samplePrice: "JOD 180 ($250)/night" },
        { name: "Petra Bubble Luxotel", priceCategory: "Glamping Luxury", distance: "10 min", rating: 4.7, facilities: ["Transparent bubble domes under stars", "Hot tubs"], samplePrice: "JOD 220 ($310)/night" }
      ],
      nearbyRestaurants: [
        { name: "Al-Wadi Restaurant", cuisine: "Traditional Jordanian", priceLevel: "Moderate", popularDishes: ["Jordanian Mansaf (Lamb cooked in fermented dried yogurt)", "Maqluba", "Fresh Hummus"] }
      ],
      mustTryFood: ["Jordanian Mansaf with Rice and Pine Nuts", "Bedouin Sweet Sage Tea", "Warm Knafeh Pastry"]
    },
    transportComparison: [
      { mode: "JETT Tourist Express Bus from Amman", costRange: "JOD 11 ($15)", duration: "3h 30m", comfort: "High" },
      { mode: "Private Taxi from Amman Airport", costRange: "JOD 75 - 85 ($110)", duration: "2h 45m", comfort: "Very High" }
    ],
    heritageInfo: {
      era: "Classical Era (1st Century BCE to 1st Century CE Nabataean Kingdom)",
      historicalEra: "Classical Era",
      architecture: "Nabataean Rock-Cut Hellenistic Sandstone Architecture",
      unesco: true,
      significance: "One of the New Seven Wonders of the World and premier archaeological icon of the Middle East."
    },
    weatherByMonth: generate12MonthWeather(20, 10),
    weatherAlerts: { hasAlert: false, condition: "Desert Sunshine", advisory: "Hydrate and wear trail shoes for canyon climbing.", indoorAlternatives: ["Petra Museum (State-of-the-art interactive exhibits at gate)"] },
    festivals: [{ name: "Petra by Night", timing: "Every Monday, Wednesday, Thursday", desc: "The Siq and Treasury illuminated by over 1,500 glowing candles with traditional Bedouin flute music." }],
    virtualTourId: "tour-petra",
    isHiddenGem: false
  }
];

// Master Heritage Sites
const allHeritageSites = [
  {
    id: "meenakshi-amman",
    name: "Arulmigu Meenakshi Sundareswarar Temple",
    destinationId: "madurai",
    country: "India",
    countryCode: "IN",
    location: "Madurai, Tamil Nadu",
    period: "Classical Era",
    exactEra: "6th–17th Century CE",
    architecture: "Dravidian Granite Temple Architecture",
    unesco: false,
    significance: "Dedicated to Goddess Meenakshi (an avatar of Parvati) and her consort Sundareswarar (Shiva), featuring 14 majestic gopurams encrusted with 33,000 mythological figures and the Hall of 1,000 Pillars.",
    historyTimeline: [
      { year: "c. 6th Cent CE", event: "Mentioned in early classical Tamil Sangam literature." },
      { year: "1310 CE", event: "Ransacked during Malik Kafur's southern invasion." },
      { year: "1559–1659 CE", event: "Restored and greatly expanded to present grandeur under King Tirumala Nayak." },
      { year: "1995 CE", event: "Grand Maha Kumbhabhishekam consecrated with polychrome sculpture restoration." }
    ],
    media: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  {
    id: "taj-mahal",
    name: "The Taj Mahal",
    destinationId: "taj-mahal-agra",
    country: "India",
    countryCode: "IN",
    location: "Agra, Uttar Pradesh",
    period: "Medieval Era",
    exactEra: "1631–1648 CE",
    architecture: "Mughal Architecture (Persian, Indian, and Islamic fusion)",
    unesco: true,
    significance: "Masterpiece of world heritage built from pure white Makrana marble inlaid with semi-precious lapis lazuli, turquoise, and carnelian overlooking the Yamuna River.",
    historyTimeline: [
      { year: "1631 CE", event: "Empress Mumtaz Mahal passes away; Shah Jahan commissions the mausoleum." },
      { year: "1648 CE", event: "Central marble dome and tomb completed by over 20,000 royal artisans." },
      { year: "1653 CE", event: "Surrounding garden quadrants, mosque, and Jawab finalized." },
      { year: "1983 CE", event: "Inscribed onto the UNESCO World Heritage list." }
    ],
    media: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  {
    id: "fushimi-inari",
    name: "Fushimi Inari-Taisha Shrine",
    destinationId: "kyoto-temples",
    country: "Japan",
    countryCode: "JP",
    location: "Kyoto, Kansai",
    period: "Classical Era",
    exactEra: "711 CE (Early Heian Period)",
    architecture: "Shinto Shrine Architecture (Nagare-zukuri)",
    unesco: true,
    significance: "Head shrine of Inari, the kami of rice and agriculture. Renowned for over 10,000 vermilion torii gates winding up sacred Mount Inari.",
    historyTimeline: [
      { year: "711 CE", event: "Founded on Inariyama hill by the Hata clan." },
      { year: "816 CE", event: "Relocated to current base at the request of monk Kukai." },
      { year: "1499 CE", event: "Main hall rebuilt following destruction during the Onin War." },
      { year: "1994 CE", event: "Inscribed as part of UNESCO Historic Monuments of Ancient Kyoto." }
    ],
    media: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  {
    id: "angkor-wat-monument",
    name: "Angkor Wat Supreme Temple",
    destinationId: "angkor-wat",
    country: "Cambodia",
    countryCode: "KH",
    location: "Siem Reap",
    period: "Classical Era",
    exactEra: "1113–1150 CE",
    architecture: "Khmer Temple Mountain Style",
    unesco: true,
    significance: "Commissioned by King Suryavarman II, representing Mount Meru—the home of the devas in Hindu mythology—surrounded by a 5-kilometer-long moat.",
    historyTimeline: [
      { year: "1113 CE", event: "King Suryavarman II begins construction as royal mausoleum for Vishnu." },
      { year: "Late 12th Cent", event: "Gradual transformation into a Theravada Buddhist sanctuary." },
      { year: "1992 CE", event: "Inscribed onto UNESCO World Heritage list." }
    ],
    media: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  {
    id: "borobudur-monument",
    name: "Borobudur Buddhist Stupa Complex",
    destinationId: "borobudur",
    country: "Indonesia",
    countryCode: "ID",
    location: "Magelang, Central Java",
    period: "Classical Era",
    exactEra: "c. 750–825 CE",
    architecture: "Javanese Buddhist Andesite Stone Pyramid Architecture",
    unesco: true,
    significance: "Colossal stepped pyramid made of two million volcanic stone blocks representing the Buddhist path to enlightenment.",
    historyTimeline: [
      { year: "778 CE", event: "Commenced under the Sailendra Dynasty." },
      { year: "1814 CE", event: "Rediscovered in the jungle by Sir Thomas Stamford Raffles." },
      { year: "1991 CE", event: "Designated a UNESCO World Heritage Site." }
    ],
    media: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  {
    id: "petra-treasury",
    name: "Petra Al-Khazneh (The Treasury)",
    destinationId: "petra",
    country: "Jordan",
    countryCode: "JO",
    location: "Wadi Musa, Ma'an",
    period: "Classical Era",
    exactEra: "1st Century BCE",
    architecture: "Nabataean Hellenistic Rock-Cut Architecture",
    unesco: true,
    significance: "A 40-meter-high classical facade carved straight out of the sheer rose-red sandstone cliff face.",
    historyTimeline: [
      { year: "1st Cent BCE", event: "Carved as a royal mausoleum by King Aretas IV." },
      { year: "1812 CE", event: "Swiss explorer Johann Ludwig Burckhardt disguises himself to reveal the lost city to the modern world." },
      { year: "2007 CE", event: "Voted one of the New Seven Wonders of the World." }
    ],
    media: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  // Ancient Era Sites
  {
    id: "varanasi-ghats-monument",
    name: "Varanasi Sacred River Ghats & Kashi Vishwanath",
    destinationId: "varanasi",
    country: "India",
    countryCode: "IN",
    location: "Varanasi, Uttar Pradesh",
    period: "Ancient Era",
    historicalEra: "Ancient Era",
    exactEra: "c. 1200 BCE – Present",
    architecture: "Ancient Hindu Riverfront Sacred Stone Steps Architecture",
    unesco: false,
    significance: "The spiritual capital of India and one of the world's oldest continuously inhabited cities on the banks of holy Mother Ganga.",
    historyTimeline: [
      { year: "c. 1200 BCE", event: "Rigvedic hymns and early Vedic settlements along the sacred river banks." },
      { year: "528 BCE", event: "Gautama Buddha delivers his First Sermon at nearby Sarnath." },
      { year: "1780 CE", event: "Queen Ahilyabai Holkar rebuilds the Kashi Vishwanath Golden Temple." }
    ],
    media: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  {
    id: "qin-terracotta",
    name: "Mausoleum of the First Qin Emperor & Terracotta Army",
    destinationId: "beijing-forbidden-city",
    country: "China",
    countryCode: "CN",
    location: "Xi'an, Shaanxi",
    period: "Ancient Era",
    historicalEra: "Ancient Era",
    exactEra: "246–210 BCE",
    architecture: "Qin Imperial Underground Necropolis & Terracotta Statuary",
    unesco: true,
    significance: "Thousands of life-sized terracotta warriors, chariots, and horses guarding the tomb of Qin Shi Huang, unifier of China.",
    historyTimeline: [
      { year: "246 BCE", event: "Qin Shi Huang ascends throne and commissions the colossal necropolis." },
      { year: "1974 CE", event: "Local farmers discover the terracotta figures while digging a water well." },
      { year: "1987 CE", event: "Designated a UNESCO World Heritage Site." }
    ],
    media: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  // Classical Era Site
  {
    id: "thanjavur-brihadeeswarar",
    name: "Brihadeeswarar Temple (Peruvudaiyar Kovil)",
    destinationId: "thanjavur",
    country: "India",
    countryCode: "IN",
    location: "Thanjavur, Tamil Nadu",
    period: "Classical Era",
    historicalEra: "Classical Era",
    exactEra: "1010 CE (Chola Dynasty)",
    architecture: "Dravidian Granite Chola Imperial Architecture",
    unesco: true,
    significance: "Built entirely of granite, crowned with an 80-tonne single granite block cupola resting atop a 66-meter monolithic vimana.",
    historyTimeline: [
      { year: "1010 CE", event: "Emperor Rajaraja Chola I consecrates the Mahastupa on the 25th year of his reign." },
      { year: "1987 CE", event: "Inscribed onto the UNESCO World Heritage list as Great Living Chola Temples." }
    ],
    media: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  // Medieval Era Site
  {
    id: "beijing-forbidden-city",
    name: "The Forbidden City (Palace Museum)",
    destinationId: "beijing-forbidden-city",
    country: "China",
    countryCode: "CN",
    location: "Beijing",
    period: "Medieval Era",
    historicalEra: "Medieval Era",
    exactEra: "1406–1420 CE (Ming Dynasty)",
    architecture: "Classical Chinese Imperial Wooden Architecture",
    unesco: true,
    significance: "World's largest preserved ancient wooden palace complex consisting of 980 surviving buildings across 72 hectares.",
    historyTimeline: [
      { year: "1406 CE", event: "The Yongle Emperor of the Ming Dynasty commissions the construction." },
      { year: "1420 CE", event: "Completed after 14 years of construction by over one million workers." },
      { year: "1987 CE", event: "Inscribed as a UNESCO World Heritage Site." }
    ],
    media: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  // Early Modern Era Sites
  {
    id: "hawa-mahal-monument",
    name: "Hawa Mahal (Palace of the Winds)",
    destinationId: "jaipur",
    country: "India",
    countryCode: "IN",
    location: "Jaipur, Rajasthan",
    period: "Early Modern Era",
    historicalEra: "Early Modern Era",
    exactEra: "1799 CE",
    architecture: "Rajput & Mughal Red Sandstone Jharokha Architecture",
    unesco: true,
    significance: "Five-story pink sandstone honeycomb facade featuring 953 intricately carved jharokha latticed windows.",
    historyTimeline: [
      { year: "1799 CE", event: "Built by Maharaja Sawai Pratap Singh inspired by Khetri Mahal." },
      { year: "2019 CE", event: "Jaipur City inscribed onto UNESCO World Heritage list." }
    ],
    media: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  {
    id: "nilgiri-toy-train-heritage",
    name: "Nilgiri Mountain Railway Toy Train",
    destinationId: "ooty",
    country: "India",
    countryCode: "IN",
    location: "Ooty / Nilgiris, Tamil Nadu",
    period: "Early Modern Era",
    historicalEra: "Early Modern Era",
    exactEra: "1908 CE",
    architecture: "Swiss-engineered Abt Alternate Rack and Pinion Mountain Railway",
    unesco: true,
    significance: "Asia's steepest rack-and-pinion railway ascending from 326m to 2,203m across 250 bridges and 16 tunnels.",
    historyTimeline: [
      { year: "1899 CE", event: "First section completed up to Coonoor." },
      { year: "1908 CE", event: "Full line to Ooty officially opened." },
      { year: "2005 CE", event: "Inscribed onto UNESCO World Heritage list as Mountain Railways of India." }
    ],
    media: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  },
  // Modern Living Heritage
  {
    id: "gardens-by-the-bay-monument",
    name: "Gardens by the Bay & Supertree Grove",
    destinationId: "singapore",
    country: "Singapore",
    countryCode: "SG",
    location: "Marina Bay",
    period: "Modern Heritage",
    historicalEra: "Modern",
    exactEra: "2012 CE",
    architecture: "Futuristic Sustainable Biophilic Architecture",
    unesco: false,
    significance: "Iconic sustainable 50-meter vertical gardens fitted with photovoltaic cells, rainwater collection, and air intake funnels.",
    historyTimeline: [
      { year: "2006 CE", event: "International design competition won by Grant Associates." },
      { year: "2012 CE", event: "Official public opening to global acclaim." }
    ],
    media: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=75",
    virtualTourAvailable: true
  }
];

// Scalable 360° Virtual Tours for Major Asian Tourist Places
const allVirtualTours = [
  {
    id: "tour-meenakshi",
    title: "Meenakshi Sundareswarar Temple Hall of 1,000 Pillars",
    heritageId: "meenakshi-amman",
    locationName: "Madurai, Tamil Nadu, India",
    panoramaUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2500&q=90",
    audioGuideText: "Welcome to the Meenakshi Sundareswarar Temple thousand-pillar hall. Notice how each granite pillar is sculpted from a single solid monolith, depicting mythical yalis, celestial musicians, and cosmic mandalas. Above you, vibrant cosmological mandalas represent the cosmic dance of Shiva.",
    hotspots: [
      { id: "hs-1", title: "South Gopuram", description: "The tallest tower reaching 51.9 meters high, featuring over 1,511 colorful deities.", coords: { x: 30, y: 40 } },
      { id: "hs-2", title: "Golden Lotus Tank (Potramarai Kulam)", description: "Sacred pond where devotees bathe and Sangam academy tested classical Tamil poetry.", coords: { x: 60, y: 70 } },
      { id: "hs-3", title: "Musical Granite Columns", description: "Carved pillars near the northern tower that ring with distinct musical pitches when gently struck.", coords: { x: 75, y: 35 } }
    ]
  },
  {
    id: "tour-taj-mahal",
    title: "The Taj Mahal Charbagh & Marble Plinth",
    heritageId: "taj-mahal",
    locationName: "Agra, Uttar Pradesh, India",
    panoramaUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2500&q=90",
    audioGuideText: "You are standing on the white marble plinth of the Taj Mahal. The symmetry is mathematically immaculate from every quadrant. Notice how the four surrounding minarets lean outward by a fraction of a degree—an intentional structural safeguard.",
    hotspots: [
      { id: "hs-taj-1", title: "Central Marble Onion Dome", description: "Rising 35 meters with gilded lotus finial blending Hindu and Persian motifs.", coords: { x: 50, y: 25 } },
      { id: "hs-taj-2", title: "Pietra Dura Inlay Panels", description: "Semi-precious lapis lazuli, turquoise, and carnelian fitted seamlessly into white Makrana marble.", coords: { x: 42, y: 60 } },
      { id: "hs-taj-3", title: "Yamuna River Promenade", description: "The northern terrace overlooking the sacred Yamuna river.", coords: { x: 80, y: 55 } }
    ]
  },
  {
    id: "tour-fushimi-inari",
    title: "Fushimi Inari Senbon Torii Corridor",
    heritageId: "fushimi-inari",
    locationName: "Kyoto, Kansai, Japan",
    panoramaUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2500&q=90",
    audioGuideText: "Step into the vermilion tunnel of Fushimi Inari-Taisha. The distinctive orange-red hue, shu-iro, is believed to repel evil spirits and honor the rice kami Inari. The black calligraphy on each pillar represents prayers for prosperity by dedicated pilgrims.",
    hotspots: [
      { id: "hs-fi-1", title: "Kitsune Fox Messenger", description: "Stone fox statues holding the key to the rice granary.", coords: { x: 25, y: 65 } },
      { id: "hs-fi-2", title: "Senbon Torii Archways", description: "Dense corridor of thousands of torii gates creating a magical tunnel of light.", coords: { x: 50, y: 40 } }
    ]
  },
  {
    id: "tour-angkor-wat",
    title: "Angkor Wat Central Lotus Sanctuary & Moat",
    heritageId: "angkor-wat-monument",
    locationName: "Siem Reap, Cambodia",
    panoramaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2500&q=90",
    audioGuideText: "Welcome to Angkor Wat. As you cross the sandstone causeway spanning the sacred moat, you enter a microcosm of the Hindu cosmos: the moat represents the cosmic ocean, and the five central towers symbolize the peaks of holy Mount Meru.",
    hotspots: [
      { id: "hs-aw-1", title: "Ocean of Milk Bas-Relief", description: "A 49-meter carving depicting 88 devas and 92 asuras churning the cosmic ocean.", coords: { x: 35, y: 55 } },
      { id: "hs-aw-2", title: "Central Lotus Sanctuary", description: "The supreme sanctum soaring 65 meters above ground level.", coords: { x: 50, y: 30 } }
    ]
  },
  {
    id: "tour-borobudur",
    title: "Borobudur Stupa Terraces Over Mount Merapi",
    heritageId: "borobudur-monument",
    locationName: "Central Java, Indonesia",
    panoramaUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2500&q=90",
    audioGuideText: "You are standing on the circular highest terrace of Borobudur. Surrounding you are 72 perforated diamond-lattice stupas, each enshrining a seated Buddha meditating toward the volcanic horizon.",
    hotspots: [
      { id: "hs-bb-1", title: "Perforated Diamond Stupa", description: "Lattice stone stupa symbolizing the formless realm of Arupadhatu.", coords: { x: 45, y: 45 } },
      { id: "hs-bb-2", title: "Mount Merapi Volcano View", description: "Active volcanic cone framing the temple in sunrise mists.", coords: { x: 80, y: 25 } }
    ]
  },
  {
    id: "tour-great-wall",
    title: "Great Wall of China Watchtower Ridge",
    heritageId: "beijing-forbidden-city",
    locationName: "Mutianyu, Beijing, China",
    panoramaUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2500&q=90",
    audioGuideText: "Stand atop Watchtower 14 of the Great Wall at Mutianyu. Below you, the stone ramparts follow the knife-edge crests of the mountains, built by hundreds of thousands of soldiers and stonemasons over centuries.",
    hotspots: [
      { id: "hs-gw-1", title: "Granite Parapet Watchtower", description: "Two-story fortified military watchtower with arrow slits and signal fire hearths.", coords: { x: 40, y: 50 } }
    ]
  },
  {
    id: "tour-petra",
    title: "Petra Siq Chasm & Treasury Facade",
    heritageId: "petra-treasury",
    locationName: "Petra, Jordan",
    panoramaUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2500&q=90",
    audioGuideText: "Emerging from the shaded, towering sandstone cliffs of the Siq, the sunlit rose-red Corinthian columns and urn of Al-Khazneh appear. Notice how the Nabataeans carved this monument directly from the top down.",
    hotspots: [
      { id: "hs-pt-1", title: "The Urn Finial", description: "Local legend claimed Bedouin raiders hid treasure in this top stone urn.", coords: { x: 50, y: 20 } }
    ]
  }
];

// Historical Eras Metadata for Real Era Filtering
const historicalErasData = [
  {
    id: "ancient",
    name: "Ancient Era",
    subtitle: "Pre-500 CE",
    description: "The dawn of Asian civilizations: Indus Valley, early Vedic settlements, Maurya Empire, Qin & Han Dynasties, and early Buddhist & Shinto sanctuaries.",
    timeline: "c. 3000 BCE – 500 CE",
    associatedCountries: ["India", "China", "Japan", "Jordan", "Iran", "Iraq"],
    historicalFacts: [
      "Indus Valley cities like Mohenjo-daro possessed the world's earliest planned urban grids and covered brick sewers.",
      "Emperor Ashoka erected polished sandstone pillars across the subcontinent inscribed with edicts of non-violence in 250 BCE.",
      "The first unified Chinese imperial dynasty constructed the early Great Wall under Qin Shi Huang."
    ],
    representativeDestinations: ["varanasi", "mount-fuji", "petra"]
  },
  {
    id: "classical",
    name: "Classical Era",
    subtitle: "500–1200 CE",
    description: "The golden age of stone temple architecture, philosophy, and classical arts across the Chola, Pallava, Tang/Song, Khmer, and Sailendra dynasties.",
    timeline: "500 CE – 1200 CE",
    associatedCountries: ["India", "Cambodia", "Indonesia", "Japan", "China", "Sri Lanka"],
    historicalFacts: [
      "The Chola emperors built Brihadeeswarar Temple in Thanjavur, crowning a 66-meter monolithic granite vimana with an 80-tonne granite dome block.",
      "Angkor Wat was constructed in Cambodia using over 5 million tonnes of sandstone transported via water canals.",
      "Borobudur in Java was assembled from 2 million volcanic andesite stone blocks without mortar."
    ],
    representativeDestinations: ["madurai", "thanjavur", "mahabalipuram", "kyoto-temples", "angkor-wat", "borobudur"]
  },
  {
    id: "medieval",
    name: "Medieval Era",
    subtitle: "1200–1600 CE",
    description: "An era of colossal forts, imperial capitals, Islamic and Persian architectural synthesis, Samurai castle builders, and the height of the Silk Road.",
    timeline: "1200 CE – 1600 CE",
    associatedCountries: ["India", "China", "Japan", "Uzbekistan", "Turkey", "Iran"],
    historicalFacts: [
      "The Ming Dynasty moved the Chinese capital to Beijing and completed the Forbidden City with 980 surviving wooden buildings in 1420.",
      "Mughal Emperor Shah Jahan commissioned the white marble Taj Mahal in 1632, combining Persian, Islamic, and Indian architectural craftsmanship."
    ],
    representativeDestinations: ["taj-mahal-agra", "beijing-forbidden-city", "great-wall", "rameswaram"]
  },
  {
    id: "early-modern",
    name: "Early Modern Era",
    subtitle: "1600–1940 CE",
    description: "The age of maritime trading posts, Rajput planned pink cities, Edo period peaceful seclusion in Japan, and mountain hill-station railways.",
    timeline: "1600 CE – 1940 CE",
    associatedCountries: ["India", "Japan", "Sri Lanka", "Vietnam", "Malaysia"],
    historicalFacts: [
      "Maharaja Sawai Jai Singh II founded the planned Pink City of Jaipur in 1727 based on ancient Vastu Shastra principles.",
      "The British engineered the Nilgiri Mountain Railway toy train in Ooty using Swiss rack-and-pinion systems to conquer steep mountain gradients."
    ],
    representativeDestinations: ["jaipur", "ooty", "kodaikanal"]
  },
  {
    id: "modern",
    name: "Modern Heritage",
    subtitle: "1940 CE – Present",
    description: "Post-independence cultural preservation, colossal maritime sculptures, sustainable modern icons, and visionary architectural masterpieces.",
    timeline: "1940 CE – Present",
    associatedCountries: ["India", "Singapore", "UAE", "Japan", "South Korea"],
    historicalFacts: [
      "Kanyakumari erected the 133-foot Thiruvalluvar stone colossus on rock reefs where three oceans meet.",
      "Singapore engineered Gardens by the Bay, blending 18 Supertrees with biophilic architecture and sustainable solar harvesting."
    ],
    representativeDestinations: ["kanyakumari", "tokyo"]
  }
];

// 12-Month Recommendations with Category A (Best Weather & Low Crowd) and Category B (Festivals)
const monthlyRecommendations = {
  january: {
    month: "January",
    categoryA: [
      { country: "Thailand", destination: "Phuket & Krabi", reason: "Dry sunny season, crystal clear Andaman Sea, calm waters." },
      { country: "Sri Lanka", destination: "Galle & South Coast", reason: "Mild humidity, sunny beaches, and ideal blue whale watching." },
      { country: "India", destination: "Tamil Nadu & Kerala", reason: "Crisp comfortable winter weather (22°C–28°C), low rain." }
    ],
    categoryB: [
      { name: "Pongal Harvest Festival", country: "India", destination: "Madurai & Tamil Nadu", timing: "Mid-January", whyVisit: "Traditional harvest cooking, decorated oxen, and temple celebrations." },
      { name: "Harbin Ice & Snow Festival", country: "China", destination: "Harbin", timing: "All Month", whyVisit: "Colossal illuminated neon ice palaces carved from frozen rivers." }
    ]
  },
  february: {
    month: "February",
    categoryA: [
      { country: "Cambodia", destination: "Angkor Wat", reason: "Pleasant mornings, dry paths, clear golden sunrise visibility." },
      { country: "India", destination: "Agra & Rajasthan", reason: "Cool breezy days, Taj Mahotsav cultural events, comfortable fort walks." }
    ],
    categoryB: [
      { name: "Chinese Spring Festival", country: "China / Singapore", destination: "Beijing & Singapore Chinatown", timing: "Late Jan / Feb", whyVisit: "Dragon dances, lantern streets, and street food banquets." },
      { name: "Sapporo Snow Festival", country: "Japan", destination: "Hokkaido", timing: "Early February", whyVisit: "Giant snow sculptures and Hokkaido winter ramen." }
    ]
  },
  march: {
    month: "March",
    categoryA: [
      { country: "Vietnam", destination: "Hanoi & Ha Long Bay", reason: "Mild springtime temperatures, low rain, and pleasant bay cruising." },
      { country: "Nepal", destination: "Pokhara & Kathmandu", reason: "Rhododendron forests blooming across Himalayan trails." }
    ],
    categoryB: [
      { name: "Holi (Festival of Colors)", country: "India", destination: "Jaipur & Mathura", timing: "Mid-March", whyVisit: "Spectacular communal celebration with organic colors and sweets." },
      { name: "Nyepi (Day of Silence)", country: "Indonesia", destination: "Bali", timing: "Late March", whyVisit: "Ogoh-ogoh demon monster parades followed by a day of absolute island meditation." }
    ]
  },
  april: {
    month: "April",
    categoryA: [
      { country: "Japan", destination: "Kyoto & Tokyo", reason: "Peak Sakura cherry blossom canopies arching over rivers and shrines." },
      { country: "Uzbekistan", destination: "Samarkand & Bukhara", reason: "Warm spring days on the Silk Road before summer heat sets in." }
    ],
    categoryB: [
      { name: "Songkran Water Festival", country: "Thailand", destination: "Chiang Mai & Bangkok", timing: "April 13–15", whyVisit: "Joyous nationwide water-splashing celebration for Thai New Year." },
      { name: "Chithirai Festival", country: "India", destination: "Madurai", timing: "Mid-April", whyVisit: "A million devotees gather for the celestial wedding of Goddess Meenakshi." }
    ]
  },
  may: {
    month: "May",
    categoryA: [
      { country: "Indonesia", destination: "Bali & Borobudur", reason: "Start of the dry season, low rain, crisp sunrise over volcanic calderas." },
      { country: "Bhutan", destination: "Paro & Punakha", reason: "Clear Himalayan mountain passes and blooming valleys." }
    ],
    categoryB: [
      { name: "Waisak at Borobudur", country: "Indonesia", destination: "Borobudur", timing: "May Full Moon", whyVisit: "Thousands of meditating monks releasing glowing paper lanterns over stupas." }
    ]
  },
  june: {
    month: "June",
    categoryA: [
      { country: "Mongolia", destination: "Ulaanbaatar & Gobi", reason: "Warm summer days, green steppes, and ideal nomadic horseback yurt stays." },
      { country: "Indonesia", destination: "Komodo & Flores", reason: "Calm tropical seas, prime diving, and sunny savannah dragon treks." }
    ],
    categoryB: [
      { name: "Dragon Boat Festival", country: "China", destination: "Hangzhou & Hong Kong", timing: "June", whyVisit: "Rhythmic drum-beat dragon boat races and sticky rice zongzi." }
    ]
  },
  july: {
    month: "July",
    categoryA: [
      { country: "India (Himalayas)", destination: "Ladakh & Spiti", reason: "High mountain passes open, crystal clear Pangong Tso Lake under sunny skies." },
      { country: "Kyrgyzstan", destination: "Song-Kul Lake", reason: "Lush alpine meadows, nomadic horse festivals, and comfortable yurt camping." }
    ],
    categoryB: [
      { name: "Gion Matsuri", country: "Japan", destination: "Kyoto", timing: "Entire Month", whyVisit: "Gigantic multi-ton wooden yamaboko floats parading through historic Kyoto." },
      { name: "Naadam Festival", country: "Mongolia", destination: "Ulaanbaatar", timing: "July 11–15", whyVisit: "Nomadic mastery of wrestling, horse racing, and archery." }
    ]
  },
  august: {
    month: "August",
    categoryA: [
      { country: "Indonesia", destination: "Raja Ampat & Bali", reason: "Dry sunny trade winds, ideal surf and marine reef visibility." },
      { country: "Japan", destination: "Hokkaido", reason: "Cooler climate, endless lavender and sunflower fields in Furano." }
    ],
    categoryB: [
      { name: "Esala Perahera", country: "Sri Lanka", destination: "Kandy", timing: "August", whyVisit: "Spectacular nighttime procession of the sacred tooth relic with fire dancers." },
      { name: "Aomori Nebuta Matsuri", timing: "Early August", country: "Japan", destination: "Aomori", whyVisit: "Enormous glowing paper warrior floats pulled through vibrant streets." }
    ]
  },
  september: {
    month: "September",
    categoryA: [
      { country: "China", destination: "Beijing & Great Wall", reason: "Autumn air, brilliant golden light, pleasant hiking temperatures." },
      { country: "South Korea", destination: "Seoul & Jeju Island", reason: "Clear blue skies, low rainfall, comfortable city and crater hiking." }
    ],
    categoryB: [
      { name: "Mid-Autumn Mooncake Festival", country: "China / Vietnam", destination: "Hoi An & Beijing", timing: "September Full Moon", whyVisit: "Streets filled with glowing lanterns, family banquets, and sweet mooncakes." },
      { name: "Ziro Music Festival", country: "India", destination: "Ziro Valley, Arunachal", timing: "Late September", whyVisit: "Eco-friendly open-air music festival in bamboo-clad Apatani tribal valleys." }
    ]
  },
  october: {
    month: "October",
    categoryA: [
      { country: "Nepal", destination: "Everest & Annapurna", reason: "Peak trekking season, crystalline mountain panoramas with zero haze." },
      { country: "Jordan", destination: "Petra & Wadi Rum", reason: "Pleasant desert days (24°C), comfortable hiking through the Siq." },
      { country: "India", destination: "Rajasthan & Golden Triangle", reason: "Start of the pleasant winter season, royal palaces illuminated." }
    ],
    categoryB: [
      { name: "Diwali (Festival of Lights)", country: "India", destination: "Varanasi, Jaipur, Delhi", timing: "October / November", whyVisit: "Thousands of earthen lamps glowing on temples and river ghats." }
    ]
  },
  november: {
    month: "November",
    categoryA: [
      { country: "Japan", destination: "Kyoto & Nara", reason: "Fiery red Japanese maple leaves (Momiji) draping Zen rock gardens." },
      { country: "Thailand", destination: "Chiang Mai & Bangkok", reason: "Pleasant cool breeze, dry weather, and festival season." },
      { country: "India", destination: "Tamil Nadu, Kerala, Agra", reason: "Sunny daylight, cool evenings, prime monument photography." }
    ],
    categoryB: [
      { name: "Loy Krathong & Yi Peng", country: "Thailand", destination: "Chiang Mai", timing: "November Full Moon", whyVisit: "Thousands of glowing lanterns floating simultaneously into the night sky." },
      { name: "Dev Deepawali", country: "India", destination: "Varanasi", timing: "November", whyVisit: "All 88 stone ghats illuminated by over one million oil lamps." }
    ]
  },
  december: {
    month: "December",
    categoryA: [
      { country: "Maldives", destination: "Ari & Baa Atolls", reason: "Calm turquoise lagoons, zero rainfall, perfect coral visibility." },
      { country: "India", destination: "Goa & Kerala", reason: "Warm beaches, backwater houseboat cruises, vibrant coastal nightlife." },
      { country: "UAE", destination: "Dubai & Abu Dhabi", reason: "Ideal desert camping, comfortable 24°C weather, outdoor exploration." }
    ],
    categoryB: [
      { name: "Madras Music Season", country: "India", destination: "Chennai, Tamil Nadu", timing: "Mid-December to January", whyVisit: "World's largest classical Carnatic music and Bharatanatyam dance festival." },
      { name: "Shirakawa-go Winter Snowfall", country: "Japan", destination: "Gifu", timing: "Late December", whyVisit: "Fairytale thatched farmhouses under pure white snow." }
    ]
  }
};

const gamificationBadges = [
  { id: "badge-asia-explorer", name: "Asia Explorer", icon: "🌏", description: "Stamp 3 different Asian countries in your Travel Passport", xpReward: 150, requiredCount: 3, category: "country" },
  { id: "badge-heritage-hunter", name: "Heritage Hunter", icon: "🏛", description: "Explore 3 ancient heritage sites and read their historical timelines", xpReward: 200, requiredCount: 3, category: "heritage" },
  { id: "badge-virtual-voyager", name: "Virtual Voyager", icon: "🕶", description: "Complete 2 immersive 360° virtual tours with audio guides", xpReward: 250, requiredCount: 2, category: "virtualTour" },
  { id: "badge-nature-seeker", name: "Nature Seeker", icon: "🌿", description: "Discover off-the-beaten-path hidden gems of Asia", xpReward: 180, requiredCount: 2, category: "nature" },
  { id: "badge-master-planner", name: "Master Trip Architect", icon: "✨", description: "Generate and save a personalized AI travel journey", xpReward: 300, requiredCount: 1, category: "trip" }
];

// Assemble Output File Content
const fileContent = `// ASIA EXPLORA - Scalable Master Tourism Dataset
// Auto-generated production dataset containing all 48 Asian countries, regions, destinations, heritage, virtual tours, and climate intelligence.

export const countriesData = ${JSON.stringify(allCountries, null, 2)};

export const regionsData = ${JSON.stringify(allRegions, null, 2)};

export const destinationsData = ${JSON.stringify(allDestinations, null, 2)};

export const heritageSitesData = ${JSON.stringify(allHeritageSites, null, 2)};

export const virtualToursData = ${JSON.stringify(allVirtualTours, null, 2)};

export const historicalErasData = ${JSON.stringify(historicalErasData, null, 2)};

export const monthlyRecommendations = ${JSON.stringify(monthlyRecommendations, null, 2)};

export const gamificationBadges = ${JSON.stringify(gamificationBadges, null, 2)};
`;

fs.writeFileSync(TARGET_SEED_PATH, fileContent, 'utf-8');
console.log("Successfully compiled and wrote complete seedData.js!");
console.log(`Destinations: ${allDestinations.length}, Regions: ${allRegions.length}, Virtual Tours: ${allVirtualTours.length}`);
