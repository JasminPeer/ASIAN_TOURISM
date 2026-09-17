import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  countriesData, 
  regionsData, 
  destinationsData, 
  heritageSitesData, 
  virtualToursData, 
  historicalErasData, 
  monthlyRecommendations, 
  gamificationBadges 
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SEED_PATH = path.join(__dirname, 'seedData.js');

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

const newDestinations = [
  // --- INDIA (Adding Agra, Jaipur, Varanasi, Delhi, Kerala, Goa, Mumbai, Kashmir) ---
  {
    id: "taj-mahal-agra",
    name: "Agra (Taj Mahal & Mughal Citadels)",
    country: "India",
    countryCode: "IN",
    regionId: "uttar-pradesh",
    regionName: "Uttar Pradesh",
    category: "Heritage",
    coordinates: [27.1751, 78.0421],
    tagline: "The Ivory-White Jewel of World Heritage",
    description: "Home to the immortal marble poem of the Taj Mahal, the colossal red sandstone Agra Fort, and the abandoned Mughal capital of Fatehpur Sikri.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To witness the sunrise reflection on the Taj Mahal's translucent Makrana marble dome and explore Mughal royal staterooms.",
    bestTime: "October to March",
    crowdPrediction: { level: "High Crowd", statusColor: "text-rose-400", score: 85, factors: "High year-round, peak on weekends" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$60 - $110 / day", luxury: "$180 - $350 / day", currency: "INR / USD" },
    journeyScore: { total: 98, weather: 90, heritage: 100, culture: 96, accessibility: 95, budget: 92 },
    transportation: { nearestAirport: "Agra Kheria Airport (AGR) / Delhi IGI (DEL) 200km", nearestRailway: "Agra Cantt (AGC) - 3 km", localTransit: "Prepaid electric autorickshaws, app cabs", tips: "The Gatimaan Express from Delhi reaches Agra in 100 minutes." },
    localGuide: {
      nearbyHotels: [
        { name: "The Oberoi Amarvilas", priceCategory: "Ultra-Luxury", distance: "600m from Taj Mahal", rating: 4.9, facilities: ["Direct Taj views from all rooms", "Royal spa", "Mughal courtyards"], samplePrice: "₹42,000/night" },
        { name: "ITC Mughal Agra", priceCategory: "Luxury Resort", distance: "3 km from Taj Mahal", rating: 4.6, facilities: ["Kaya Kalp Spa", "Mughal dining", "Expansive gardens"], samplePrice: "₹9,500/night" }
      ],
      nearbyRestaurants: [
        { name: "Peshawri (ITC Mughal)", cuisine: "Northwest Frontier", priceLevel: "Premium", popularDishes: ["Dal Bukhara", "Sikandari Raan", "Garlic Naan"] },
        { name: "Dasaprakash", cuisine: "South Indian & Thalis", priceLevel: "Moderate", popularDishes: ["Special Thali", "Masala Dosa"] }
      ],
      mustTryFood: ["Agra Petha (sweet ash gourd candy)", "Bedmi Puri with Aloo Sabzi", "Mughlai Korma"]
    },
    transportComparison: [
      { mode: "Gatimaan Express Train from Delhi", costRange: "₹750 - ₹1,500", duration: "1h 40m", comfort: "Very High" },
      { mode: "Yamuna Expressway Private Taxi", costRange: "₹2,500 - ₹3,500", duration: "3 hours", comfort: "High" }
    ],
    heritageInfo: { era: "Medieval Era (1631–1648 CE)", historicalEra: "Medieval Era", architecture: "Mughal White Marble & Red Sandstone", unesco: true, significance: "UNESCO World Heritage wonder built by Emperor Shah Jahan." },
    weatherByMonth: generate12MonthWeather(25, 18),
    weatherAlerts: { hasAlert: false, condition: "Sunny & Pleasant", advisory: "Early sunrise visits give crisp light and fewer crowds.", indoorAlternatives: ["Agra Fort Durbar Halls & Taj Museum"] },
    virtualTourId: "tour-taj-mahal",
    isHiddenGem: false
  },
  {
    id: "jaipur",
    name: "Jaipur (The Pink City)",
    country: "India",
    countryCode: "IN",
    regionId: "rajasthan",
    regionName: "Rajasthan",
    category: "Heritage",
    coordinates: [26.9124, 75.7873],
    tagline: "The Royal Realm of Rajput Forts & Palaces",
    description: "Capital of Rajasthan, famed for the honeycomb facade of Hawa Mahal, hilltop Amber Fort, City Palace, and astronomical observatory Jantar Mantar.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To ride up Amber Fort's ramparts, stroll through pink sandstone bazaars, and experience royal Rajput hospitality.",
    bestTime: "October to March",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 70, factors: "High during Diwali & Jaipur Literature Fest" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$60 - $110 / day", luxury: "$180 - $400 / day", currency: "INR / USD" },
    journeyScore: { total: 96, weather: 92, heritage: 98, culture: 97, accessibility: 94, budget: 93 },
    transportation: { nearestAirport: "Jaipur International Airport (JAI) - 12 km", nearestRailway: "Jaipur Junction (JP) - 2 km", localTransit: "Jaipur Metro, auto-rickshaws, cabs", tips: "Buy the Jaipur Composite Ticket for 8 key monuments." },
    localGuide: {
      nearbyHotels: [
        { name: "Rambagh Palace", priceCategory: "Heritage Palace", distance: "City center", rating: 4.9, facilities: ["Former residence of the Maharaja", "Peacock gardens", "Polo bar"], samplePrice: "₹48,000/night" },
        { name: "Alsisar Haveli", priceCategory: "Heritage Haveli", distance: "Old City", rating: 4.6, facilities: ["Traditional frescoed suites", "Courtyard pool"], samplePrice: "₹7,200/night" }
      ],
      nearbyRestaurants: [
        { name: "Laxmi Mishthan Bhandar (LMB)", cuisine: "Rajasthani Traditional", priceLevel: "Moderate", popularDishes: ["Dal Baati Churma", "Ghewar sweet", "Pyaaz Kachori"] },
        { name: "1135 AD (Amber Fort)", cuisine: "Royal Rajput Dining", priceLevel: "Luxury", popularDishes: ["Laal Maas", "Shahi Tukda"] }
      ],
      mustTryFood: ["Dal Baati Churma", "Laal Maas", "Pyaaz Ki Kachori", "Ghewar"]
    },
    transportComparison: [
      { mode: "Vande Bharat Express from Delhi", costRange: "₹850 - ₹1,600", duration: "3h 45m", comfort: "High" },
      { mode: "Flight from Mumbai/Bengaluru", costRange: "₹3,200 - ₹6,000", duration: "1h 45m", comfort: "Very High" }
    ],
    heritageInfo: { era: "Early Modern Era (1727 CE)", historicalEra: "Early Modern Era", architecture: "Rajput & Mughal Fortified Vastu Shastra Architecture", unesco: true, significance: "UNESCO World Heritage City founded by Maharaja Sawai Jai Singh II." },
    weatherByMonth: generate12MonthWeather(26, 12),
    weatherAlerts: { hasAlert: false, condition: "Pleasant & Breezy", advisory: "Mornings and evenings are exceptionally clear.", indoorAlternatives: ["City Palace Museum & Albert Hall Museum"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "varanasi",
    name: "Varanasi (Kashi Sacred River Ghats)",
    country: "India",
    countryCode: "IN",
    regionId: "uttar-pradesh",
    regionName: "Uttar Pradesh",
    category: "Spiritual",
    coordinates: [25.3176, 82.9739],
    tagline: "The World's Oldest Living Spiritual Capital",
    description: "Continuously inhabited for over 3,000 years along the crescent curve of holy Mother Ganga, featuring 88 ancient stone ghats, evening Ganga Aarti, and Kashi Vishwanath.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To witness the timeless sunrise boat row along Manikarnika and Dashashwamedh Ghats and experience the mesmerizing evening Ganga Aarti.",
    bestTime: "October to March",
    crowdPrediction: { level: "High Crowd", statusColor: "text-rose-400", score: 80, factors: "High on Dev Deepawali and auspicious full moons" },
    estimatedBudget: { budget: "$20 - $35 / day", moderate: "$50 - $90 / day", luxury: "$150 - $300 / day", currency: "INR / USD" },
    journeyScore: { total: 95, weather: 88, heritage: 99, culture: 100, accessibility: 88, budget: 95 },
    transportation: { nearestAirport: "Lal Bahadur Shastri Airport (VNS) - 24 km", nearestRailway: "Varanasi Junction (BSB) / Banaras - 3 km", localTransit: "Wooden rowboats, cycle rickshaws, walking the ghats", tips: "Walking along the ghats between Assi and Dashashwamedh is the best way to explore." },
    localGuide: {
      nearbyHotels: [
        { name: "BrijRama Palace", priceCategory: "Heritage Palace on Ghats", distance: "Darbhanga Ghat", rating: 4.8, facilities: ["18th-century Maratha palace", "Direct boat arrival", "Classical sitar recitals"], samplePrice: "₹24,000/night" },
        { name: "Taj Ganges Varanasi", priceCategory: "Luxury Hotel", distance: "Cantonment", rating: 4.6, facilities: ["12-acre gardens", "Pool", "Fine dining"], samplePrice: "₹11,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Kashi Chat Bhandar", cuisine: "Varanasi Street Food", priceLevel: "Budget (₹50-₹150)", popularDishes: ["Tamatar Chaat", "Dahi Chutney Golgappe", "Palak Chaat"] },
        { name: "Blue Lassi Shop", cuisine: "Artisanal Lassi", priceLevel: "Budget (₹60-₹120)", popularDishes: ["Pomegranate Pistachio Lassi", "Alphonso Mango Lassi"] }
      ],
      mustTryFood: ["Tamatar Chaat", "Banarasi Paan", "Malaiyo (saffron milk foam)", "Kachori Jalebi"]
    },
    transportComparison: [
      { mode: "Vande Bharat Express from New Delhi", costRange: "₹1,400 - ₹2,700", duration: "8 hours", comfort: "Very High" },
      { mode: "Flight from Delhi/Mumbai", costRange: "₹2,900 - ₹5,500", duration: "1h 20m", comfort: "Very High" }
    ],
    heritageInfo: { era: "Ancient Era (c. 1200 BCE – Present)", historicalEra: "Ancient Era", architecture: "Ancient Riverfront Stone Steps & Classical Temple Spires", unesco: false, significance: "Sacred civilizational hearth of Hinduism, Jainism, and Buddhism (Sarnath)." },
    weatherByMonth: generate12MonthWeather(26, 18),
    weatherAlerts: { hasAlert: false, condition: "Pleasant Winter River Breeze", advisory: "Wear slip-on shoes for temple visits.", indoorAlternatives: ["Sarnath Archaeological Museum", "Bharat Kala Bhavan"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "delhi",
    name: "Delhi (Imperial Mughal & Modern Capital)",
    country: "India",
    countryCode: "IN",
    regionId: "delhi",
    regionName: "Delhi NCR",
    category: "Heritage",
    coordinates: [28.6139, 77.2090],
    tagline: "The Seven Historic Cities of Empires",
    description: "India's vibrant capital, where ancient minarets like Qutub Minar, Mughal sandstone masterpieces like Humayun's Tomb, and colonial Lutyens boulevards meet world-class street food.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To explore 3 distinct UNESCO World Heritage sites, walk Chandni Chowk's historic spice markets, and tour the National Museum.",
    bestTime: "October to March",
    crowdPrediction: { level: "High", statusColor: "text-rose-400", score: 85, factors: "Busy metropolitan capital" },
    estimatedBudget: { budget: "$30 - $55 / day", moderate: "$70 - $130 / day", luxury: "$200 - $450 / day", currency: "INR / USD" },
    journeyScore: { total: 97, weather: 86, heritage: 99, culture: 98, accessibility: 98, budget: 92 },
    transportation: { nearestAirport: "Indira Gandhi International Airport (DEL) - 15 km", nearestRailway: "New Delhi Railway Station (NDLS)", localTransit: "Delhi Metro (world-class network), app taxis", tips: "The Delhi Metro Airport Express takes 20 mins to the city center." },
    localGuide: {
      nearbyHotels: [
        { name: "The Imperial New Delhi", priceCategory: "Colonial Luxury", distance: "Janpath / Connaught Place", rating: 4.8, facilities: ["Colonial art museum hotel", "Historic gardens", "4 restaurants"], samplePrice: "₹18,000/night" },
        { name: "The Leela Palace New Delhi", priceCategory: "Palatial Luxury", distance: "Chanakyapuri", rating: 4.9, facilities: ["Rooftop infinity pool", "Opulent royal design"], samplePrice: "₹25,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Karim's Old Delhi", cuisine: "Historic Mughlai", priceLevel: "Moderate", popularDishes: ["Mutton Burra", "Chicken Jahangiri", "Rumaali Roti"] },
        { name: "Indian Accent", cuisine: "Modern Indian Fine Dining", priceLevel: "Luxury", popularDishes: ["Tasting Menu", "Meetha Achar Pork Ribs"] }
      ],
      mustTryFood: ["Old Delhi Butter Chicken", "Chole Bhature", "Parathas of Paranthe Wali Gali", "Dahi Bhalla"]
    },
    transportComparison: [
      { mode: "Delhi Metro Airport Express", costRange: "₹60", duration: "19 minutes", comfort: "Very High" },
      { mode: "Prepaid Cab", costRange: "₹450 - ₹700", duration: "45 minutes", comfort: "High" }
    ],
    heritageInfo: { era: "Medieval & Early Modern Era", historicalEra: "Medieval Era", architecture: "Indo-Islamic Sandstone & Marble Architecture", unesco: true, significance: "Home to Qutub Minar, Humayun's Tomb, and Red Fort World Heritage sites." },
    weatherByMonth: generate12MonthWeather(24, 15),
    weatherAlerts: { hasAlert: false, condition: "Cool Sunny Winter Days", advisory: "November to February offers ideal sightseeing weather.", indoorAlternatives: ["National Museum", "National Gallery of Modern Art"] },
    virtualTourId: "tour-taj-mahal",
    isHiddenGem: false
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters & Munnar Hills",
    country: "India",
    countryCode: "IN",
    regionId: "kerala",
    regionName: "Kerala",
    category: "Nature",
    coordinates: [9.4981, 76.3388],
    tagline: "God's Own Country: Palm Lagoons & Tea Peaks",
    description: "Glide on traditional thatched Kettuvallam houseboats along emerald backwater canals in Alleppey, and ascend into the cool, misty tea estates of Munnar.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To unwind on tranquil waterways, experience authentic Ayurvedic rejuvenation massages, and watch traditional Kathakali martial dance.",
    bestTime: "September to March",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-emerald-400", score: 55, factors: "Relaxed resort flow" },
    estimatedBudget: { budget: "$30 - $55 / day", moderate: "$70 - $125 / day", luxury: "$180 - $380 / day", currency: "INR / USD" },
    journeyScore: { total: 96, weather: 94, heritage: 90, culture: 97, accessibility: 91, budget: 93 },
    transportation: { nearestAirport: "Cochin International Airport (COK) - 75 km to Alleppey", nearestRailway: "Alappuzha (ALLP) - 3 km", localTransit: "Ferries, motorized canoes, tourist houseboats", tips: "Overnight houseboat stays include a personal onboard chef." },
    localGuide: {
      nearbyHotels: [
        { name: "Kumarakom Lake Resort", priceCategory: "Luxury Resort", distance: "Vembanad Lakefront", rating: 4.9, facilities: ["Traditional heritage villas", "Ayurvedic spa", "Infinity pool"], samplePrice: "₹22,000/night" },
        { name: "Spice Tree Munnar", priceCategory: "Mountain Boutique", distance: "Munnar tea hills", rating: 4.7, facilities: ["Valley views", "Bison valley treks"], samplePrice: "₹12,000/night" }
      ],
      nearbyRestaurants: [
        { name: "History Restaurant (Brunton Boatyard)", cuisine: "Kerala Coastal Heritage", priceLevel: "Premium", popularDishes: ["Karimeen Pollichathu", "Syrian Beef Fry", "Appam with Stew"] },
        { name: "Thaff Restaurant", cuisine: "Local Kerala", priceLevel: "Budget", popularDishes: ["Malabar Fish Biryani", "Kerala Porotta"] }
      ],
      mustTryFood: ["Karimeen Pollichathu (Pearl Spot fish)", "Appam with Vegetable Ishtu", "Kerala Sadhya on banana leaf", "Puttu & Kadala Curry"]
    },
    transportComparison: [
      { mode: "Scenic Houseboat Cruise", costRange: "₹8,500 - ₹18,000 (all meals included)", duration: "21 hours overnight", comfort: "Luxury Rejuvenation" },
      { mode: "Government Public Ferry", costRange: "₹25", duration: "2h 30m", comfort: "Scenic Local" }
    ],
    heritageInfo: { era: "Living Culture & Colonial Heritage", historicalEra: "Early Modern Era", architecture: "Traditional Kerala Timber & Thatched Roof Architecture", unesco: false, significance: "Unique biophilic mangrove ecosystem and spice route trade cradle." },
    weatherByMonth: generate12MonthWeather(28, 45, [11, 0, 1]),
    weatherAlerts: { hasAlert: false, condition: "Gentle Coastal Breeze", advisory: "Tropical warmth. Carry light cottons and sun hats.", indoorAlternatives: ["Kerala Folklore Museum & Kathakali Centre"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "goa",
    name: "Goa (Golden Coast & Portuguese Heritage)",
    country: "India",
    countryCode: "IN",
    regionId: "goa",
    regionName: "Goa",
    category: "Beach",
    coordinates: [15.2993, 74.1240],
    tagline: "Sun-Drenched Arabian Sea & Baroque Basilicas",
    description: "India's beach paradise, featuring golden coconut-fringed sands, Portuguese colonial villas of Fontainhas, and UNESCO baroque churches of Old Goa.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To relax on pristine southern beaches (Palolem, Agonda), visit Basilica of Bom Jesus, and dine on fiery Goan fish curries.",
    bestTime: "November to March",
    crowdPrediction: { level: "High in Dec-Jan", statusColor: "text-amber-400", score: 75, factors: "Peak during Christmas and New Year" },
    estimatedBudget: { budget: "$25 - $50 / day", moderate: "$65 - $110 / day", luxury: "$160 - $350 / day", currency: "INR / USD" },
    journeyScore: { total: 94, weather: 92, heritage: 91, culture: 93, accessibility: 94, budget: 94 },
    transportation: { nearestAirport: "Dabolim (GOI) / Manohar International Mopa (GOX)", nearestRailway: "Madgaon (MAO) / Thivim (THVM)", localTransit: "Rented scooters, self-drive cars, local pilots", tips: "Rent an automatic scooter (₹350/day) for carefree coastal exploring." },
    localGuide: {
      nearbyHotels: [
        { name: "Taj Exotica Resort & Spa Goa", priceCategory: "Luxury Beachfront", distance: "Benaulim Beach", rating: 4.8, facilities: ["Private beach access", "Golf course", "Jiva spa"], samplePrice: "₹26,000/night" },
        { name: "Panjim Inn", priceCategory: "Heritage Mansion", distance: "Fontainhas Latin Quarter", rating: 4.5, facilities: ["19th-century Portuguese antique suites"], samplePrice: "₹5,500/night" }
      ],
      nearbyRestaurants: [
        { name: "Fisherman's Wharf", cuisine: "Goan Seafood", priceLevel: "Moderate to High", popularDishes: ["Goan Prawn Curry with Rice", "Kingfish Rawa Fry", "Crab Xacuti"] },
        { name: "Vinayak Family Restaurant", cuisine: "Authentic Local Goan", priceLevel: "Budget", popularDishes: ["Special Fish Thali", "Prawn Masala"] }
      ],
      mustTryFood: ["Goan Prawn Curry with Goan Red Rice", "Bebinca layered dessert", "Pork/Mushroom Vindaloo", "Poi bread"]
    },
    transportComparison: [
      { mode: "Direct Domestic Flight", costRange: "₹2,500 - ₹5,000", duration: "1 hour from Mumbai", comfort: "Very High" },
      { mode: "Vande Bharat / Tejas Express from Mumbai", costRange: "₹1,200 - ₹2,400", duration: "7h 45m scenic Konkan rail", comfort: "High" }
    ],
    heritageInfo: { era: "Early Modern Era (16th–17th Century)", historicalEra: "Early Modern Era", architecture: "Portuguese Baroque & Manueline Colonial Stone Architecture", unesco: true, significance: "Churches and Convents of Goa UNESCO site including Basilica of Bom Jesus." },
    weatherByMonth: generate12MonthWeather(28, 30, [11, 0, 1]),
    weatherAlerts: { hasAlert: false, condition: "Warm Beach Sunshine", advisory: "Sunny days and gentle sea breeze.", indoorAlternatives: ["Old Goa Museum & Houses of Goa Museum"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "mumbai",
    name: "Mumbai (Gateway of India & Colonial Skyline)",
    country: "India",
    countryCode: "IN",
    regionId: "maharashtra",
    regionName: "Maharashtra",
    category: "City",
    coordinates: [18.9220, 72.8347],
    tagline: "The Maximum City & Financial Heartland of India",
    description: "A pulsating coastal metropolis housing the UNESCO Victorian Gothic & Art Deco ensemble, the historic Gateway of India, Marine Drive's Queen's Necklace, and Bollywood.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To ride the historic sea ferries past the Gateway of India, visit Elephanta Caves, and walk along the Marine Drive sunset promenade.",
    bestTime: "November to February",
    crowdPrediction: { level: "High", statusColor: "text-rose-400", score: 88, factors: "Dense metropolitan energy" },
    estimatedBudget: { budget: "$35 - $60 / day", moderate: "$80 - $150 / day", luxury: "$220 - $500 / day", currency: "INR / USD" },
    journeyScore: { total: 95, weather: 88, heritage: 95, culture: 99, accessibility: 97, budget: 90 },
    transportation: { nearestAirport: "Chhatrapati Shivaji Maharaj International (BOM)", nearestRailway: "Chhatrapati Shivaji Maharaj Terminus (CSMT) UNESCO", localTransit: "Mumbai Local Trains, Metro line 3, iconic black-and-yellow Premier Padmini cabs", tips: "Take a scenic drive across the Bandra-Worli Sea Link." },
    localGuide: {
      nearbyHotels: [
        { name: "The Taj Mahal Palace Mumbai", priceCategory: "Grand Heritage Icon", distance: "Opposite Gateway of India", rating: 4.9, facilities: ["Legendary 1903 heritage hotel", "Harbor views", "Sea lounge high tea"], samplePrice: "₹28,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Trishna", cuisine: "Mangalorean Seafood", priceLevel: "High", popularDishes: ["Butter Pepper Garlic Crab", "Fish Koliwada"] },
        { name: "Britannia & Co.", cuisine: "Parsi Iranian Cafe", priceLevel: "Moderate", popularDishes: ["Berry Pulao", "Caramel Custard", "Sali Boti"] }
      ],
      mustTryFood: ["Vada Pav", "Pav Bhaji at Sardar", "Bombay Duck Fry", "Irani Chai with Bun Maska"]
    },
    transportComparison: [
      { mode: "Fast AC Local Train", costRange: "₹65", duration: "35 mins across city", comfort: "Moderate" },
      { mode: "App Cab / Black & Yellow Taxi", costRange: "₹250 - ₹500", duration: "45 mins", comfort: "High" }
    ],
    heritageInfo: { era: "Early Modern & Victorian Era (19th–20th Century)", historicalEra: "Early Modern Era", architecture: "Victorian Gothic Revival & Art Deco Architecture", unesco: true, significance: "Second largest Art Deco architectural collection in the world after Miami." },
    weatherByMonth: generate12MonthWeather(27, 40, [11, 0, 1]),
    weatherAlerts: { hasAlert: false, condition: "Comfortable Coastal Sun", advisory: "Winter temperatures hover around 22°C–30°C.", indoorAlternatives: ["Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (Prince of Wales Museum)"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "kashmir-valley",
    name: "Kashmir Valley & Dal Lake",
    country: "India",
    countryCode: "IN",
    regionId: "jammu-kashmir",
    regionName: "Jammu & Kashmir",
    category: "Mountains",
    coordinates: [34.0837, 74.7973],
    tagline: "Paradise on Earth: Alpine Lakes & Snow Meadows",
    description: "Framed by snow-capped Himalayan peaks, featuring intricately carved wooden houseboats on Dal Lake, floating vegetable markets, and Gulmarg's high-altitude gondola.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To glide silently on a vibrant Shikara boat through lotus pads, ski or ride the gondola in Gulmarg, and sip aromatic saffron Kahwa.",
    bestTime: "April to October (Spring/Summer) & December to February (Snow)",
    crowdPrediction: { level: "Moderate", statusColor: "text-amber-400", score: 60, factors: "Peak during summer tulip festival and winter snowfall" },
    estimatedBudget: { budget: "$30 - $55 / day", moderate: "$65 - $120 / day", luxury: "$170 - $360 / day", currency: "INR / USD" },
    journeyScore: { total: 96, weather: 95, heritage: 90, culture: 98, accessibility: 86, budget: 92 },
    transportation: { nearestAirport: "Sheikh ul-Alam International Airport Srinagar (SXR) - 14 km", nearestRailway: "Udhampur / Jammu Tawi (new rail link to Srinagar)", localTransit: "Shikara boats, private tourist taxis", tips: "Spend at least one night in a cedarwood houseboat on Dal or Nigeen Lake." },
    localGuide: {
      nearbyHotels: [
        { name: "The Khyber Himalayan Resort & Spa", priceCategory: "Alpine Luxury", distance: "Gulmarg", rating: 4.8, facilities: ["Heated glass-enclosed pool", "Ski-in/ski-out", "L'Occitane spa"], samplePrice: "₹28,000/night" },
        { name: "Sukoon Luxury Houseboat", priceCategory: "Heritage Houseboat", distance: "Dal Lake", rating: 4.7, facilities: ["Cedarwood suites", "Rooftop deck", "Traditional Wazwan"], samplePrice: "₹14,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Ahdoos Restaurant", cuisine: "Authentic Kashmiri Wazwan", priceLevel: "Moderate", popularDishes: ["Rogan Josh", "Gushtaba", "Rista", "Tabak Maaz"] },
        { name: "Mughal Darbar", cuisine: "Traditional Kashmiri", priceLevel: "Budget to Moderate", popularDishes: ["Kashmiri Pulao", "Seekh Tuji (barbecue skewers)"] }
      ],
      mustTryFood: ["Kashmiri Kahwa with crushed almonds", "Authentic Wazwan Feast", "Nadru Yakhni (lotus stem in yogurt)", "Sheermal bread"]
    },
    transportComparison: [
      { mode: "Direct Flight from Delhi", costRange: "₹3,500 - ₹7,000", duration: "1h 25m", comfort: "Very High" },
      { mode: "Scenic Overland Mountain Drive", costRange: "₹4,000 - ₹6,000", duration: "8 hours from Jammu", comfort: "High" }
    ],
    heritageInfo: { era: "Mughal Imperial Gardens Era (1619 CE)", historicalEra: "Medieval Era", architecture: "Mughal Terraced Charbagh & Kashmiri Cedarwood Architecture", unesco: false, significance: "Historic terraced gardens of Shalimar and Nishat Bagh built by Emperor Jahangir." },
    weatherByMonth: generate12MonthWeather(14, 25, [4, 5, 11, 0]),
    weatherAlerts: { hasAlert: false, condition: "Crisp Mountain Air", advisory: "Chilly evenings. Carry quality woolens and pashmina shawls.", indoorAlternatives: ["SPS Museum Srinagar", "Kashmiri Handloom & Carpet Weaving Centers"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },

  // --- JAPAN (Tokyo, Osaka, Nara, Hiroshima, Hokkaido, Okinawa) ---
  {
    id: "tokyo",
    name: "Tokyo (Cybernetic Metropolis & Historic Shrines)",
    country: "Japan",
    countryCode: "JP",
    regionId: "kanto",
    regionName: "Kanto",
    category: "City",
    coordinates: [35.6762, 139.6503],
    tagline: "Where Ancient Edo Tradition Meets Neon Cyberpunk",
    description: "The world's most populous metropolitan wonder: ancient Senso-ji temple in Asakusa, Shibuya's pulsing diagonal crossing, teamLab immersive digital art, and Michelin-starred culinary back-alleys.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To experience seamless Yamanote transit, marvel at Shibuya Crossing from above, and dine in hidden Omoide Yokocho lantern alleys.",
    bestTime: "March to May & September to November",
    crowdPrediction: { level: "High", statusColor: "text-rose-400", score: 85, factors: "Busy urban flow" },
    estimatedBudget: { budget: "$60 - $110 / day", moderate: "$130 - $240 / day", luxury: "$350 - $800 / day", currency: "JPY / USD" },
    journeyScore: { total: 98, weather: 92, heritage: 96, culture: 99, accessibility: 100, budget: 88 },
    transportation: { nearestAirport: "Haneda (HND) 15km / Narita (NRT) 60km", nearestRailway: "Tokyo Station (Shinkansen bullet train hub)", localTransit: "Tokyo Metro, JR Yamanote Line, Suica / Pasmo IC card", tips: "Tap Suica on your phone for instant subway gate entry." },
    localGuide: {
      nearbyHotels: [
        { name: "Aman Tokyo", priceCategory: "Ultra-Luxury", distance: "Otemachi", rating: 4.9, facilities: ["Ryokan-inspired suites", "Panoramic Mount Fuji views", "Traditional onsen spa"], samplePrice: "¥160,000/night" },
        { name: "Hotel Gracery Shinjuku", priceCategory: "Boutique Themed", distance: "Kabukicho", rating: 4.5, facilities: ["Godzilla head balcony", "Direct subway access"], samplePrice: "¥22,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Sukiyabashi Jiro", cuisine: "Edomae Sushi", priceLevel: "Ultra Fine Dining", popularDishes: ["Omakase 20-piece nigiri"] },
        { name: "Ichiran Ramen Shibuya", cuisine: "Tonkotsu Ramen", priceLevel: "Budget", popularDishes: ["Custom broth tonkotsu ramen with soft-boiled egg"] }
      ],
      mustTryFood: ["Fresh Edomae Nigiri Sushi", "Crispy Tonkatsu", "Wagyu Sukiyaki", "Tsukiji Tamagoyaki"]
    },
    transportComparison: [
      { mode: "Tokyo Monorail from Haneda", costRange: "¥500 ($3.50)", duration: "13 minutes", comfort: "Very High" },
      { mode: "Narita Express (N'EX)", costRange: "¥3,070 ($20)", duration: "53 minutes", comfort: "Very High" }
    ],
    heritageInfo: { era: "Edo Period to Modern (1603 CE – Present)", historicalEra: "Early Modern Era", architecture: "Edo Timber Shinto & High-Tech Contemporary Architecture", unesco: false, significance: "Historic seat of the Tokugawa Shogunate and Imperial Palace gardens." },
    weatherByMonth: generate12MonthWeather(18, 20, [3, 4, 10, 11]),
    weatherAlerts: { hasAlert: false, condition: "Pleasant Clear Blue Skies", advisory: "Crisp autumn/spring air. Wear walking shoes.", indoorAlternatives: ["teamLab Planets", "Tokyo National Museum in Ueno"] },
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },
  {
    id: "osaka",
    name: "Osaka (The Nation's Kitchen & Castle)",
    country: "Japan",
    countryCode: "JP",
    regionId: "kansai",
    regionName: "Kansai",
    category: "Food",
    coordinates: [34.6937, 135.5023],
    tagline: "Japan's Street Food Capital & Merchant Heart",
    description: "Famed for its motto 'kuidaore' (eat until you drop), the neon Glico Man over Dotonbori canal, five-story Osaka Castle, and warm outgoing local culture.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1590559899731-a3f07b743759?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To eat sizzling piping-hot Takoyaki by the canal, visit the majestic moated Osaka Castle, and explore lively nightlife in Namba.",
    bestTime: "March to May & October to November",
    crowdPrediction: { level: "High in Dotonbori", statusColor: "text-amber-400", score: 78, factors: "Vibrant weekend evenings" },
    estimatedBudget: { budget: "$55 - $95 / day", moderate: "$110 - $210 / day", luxury: "$300 - $650 / day", currency: "JPY / USD" },
    journeyScore: { total: 96, weather: 90, heritage: 94, culture: 98, accessibility: 98, budget: 92 },
    transportation: { nearestAirport: "Kansai International Airport (KIX) - 40 km", nearestRailway: "Shin-Osaka Station (Tokaido / Sanyo Shinkansen)", localTransit: "Osaka Loop Line, Midosuji subway line", tips: "KIX Airport is connected directly to Namba via the Nankai Rapi:t express." },
    localGuide: {
      nearbyHotels: [
        { name: "The Ritz-Carlton Osaka", priceCategory: "Classic Luxury", distance: "Umeda", rating: 4.8, facilities: ["18th-century Georgian design", "Michelin French dining"], samplePrice: "¥65,000/night" },
        { name: "Cross Hotel Osaka", priceCategory: "Modern Boutique", distance: "Dotonbori", rating: 4.5, facilities: ["Steps from Dotonbori canal", "Design rooms"], samplePrice: "¥18,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Kukuru Takoyaki", cuisine: "Osaka Street Food", priceLevel: "Budget", popularDishes: ["Bikkuri Takoyaki with octopus tentacle", "Akashiyaki"] },
        { name: "Mizuno", cuisine: "Okonomiyaki", priceLevel: "Budget to Moderate", popularDishes: ["Yamaimo-yaki cabbage savory pancake with pork and scallops"] }
      ],
      mustTryFood: ["Fresh Takoyaki octopus balls", "Okonomiyaki savory pancake", "Kushikatsu fried skewers in Shinsekai", "Kitsune Udon"]
    },
    transportComparison: [
      { mode: "Tokaido Shinkansen from Kyoto", costRange: "¥1,450", duration: "13 minutes", comfort: "Bullet Train" },
      { mode: "JR Special Rapid Service", costRange: "¥580", duration: "29 minutes", comfort: "High" }
    ],
    heritageInfo: { era: "Azuchi-Momoyama Period (1583 CE)", historicalEra: "Medieval Era", architecture: "Japanese Castle Stone Rampart & Turret Architecture", unesco: false, significance: "Toyotomi Hideyoshi's seat of power during the unification of Japan." },
    weatherByMonth: generate12MonthWeather(19, 22),
    weatherAlerts: { hasAlert: false, condition: "Pleasant", advisory: "Great dining weather.", indoorAlternatives: ["Osaka Aquarium Kaiyukan", "Umeda Sky Building"] },
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },
  {
    id: "nara",
    name: "Nara (Ancient Imperial Capital & Sacred Deer)",
    country: "Japan",
    countryCode: "JP",
    regionId: "kansai",
    regionName: "Kansai",
    category: "Heritage",
    coordinates: [34.6851, 135.8048],
    tagline: "The First Permanent Imperial Capital of Japan",
    description: "Home to Todai-ji—the world's largest wooden building housing a colossal 15-meter bronze Buddha—and over 1,200 free-roaming sacred Shinto deer in Nara Park.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To feed deer crackers (shika-senbei) to polite bowing deer and gaze up at the colossal Daibutsu bronze Buddha in Todai-ji.",
    bestTime: "March to May & October to November",
    crowdPrediction: { level: "Moderate", statusColor: "text-emerald-400", score: 62, factors: "Busy during midday school trips" },
    estimatedBudget: { budget: "$45 - $80 / day", moderate: "$95 - $180 / day", luxury: "$260 - $550 / day", currency: "JPY / USD" },
    journeyScore: { total: 97, weather: 92, heritage: 99, culture: 98, accessibility: 95, budget: 93 },
    transportation: { nearestAirport: "Osaka Itami (ITM) 45km / Kansai (KIX) 65km", nearestRailway: "Kintetsu-Nara / JR Nara Station", localTransit: "Walking loops, Nara city tourist buses", tips: "Kintetsu-Nara Station is a 5-minute walk to Nara Park." },
    localGuide: {
      nearbyHotels: [
        { name: "Nara Hotel", priceCategory: "Imperial Heritage", distance: "Nara Park", rating: 4.8, facilities: ["1909 classical wooden hotel", "Guest of emperors and Albert Einstein"], samplePrice: "¥38,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Shizuka", cuisine: "Kamameshi (Iron Pot Rice)", priceLevel: "Moderate", popularDishes: ["Nara Seven Delicacies Kamameshi", "Unagi Kamameshi"] }
      ],
      mustTryFood: ["Kaki-no-ha Sushi (persimmon leaf-wrapped sushi)", "Miwa Somen cold noodles", "Yamato green tea wagashi"]
    },
    transportComparison: [
      { mode: "Kintetsu Express Train from Kyoto", costRange: "¥720", duration: "35 minutes", comfort: "High" },
      { mode: "Kintetsu Rapid from Osaka Namba", costRange: "¥680", duration: "38 minutes", comfort: "High" }
    ],
    heritageInfo: { era: "Classical Nara Period (710–794 CE)", historicalEra: "Classical Era", architecture: "Classical Buddhist Wooden Pavilion Architecture", unesco: true, significance: "UNESCO Historic Monuments of Ancient Nara." },
    weatherByMonth: generate12MonthWeather(17, 20),
    weatherAlerts: { hasAlert: false, condition: "Sunny & Mild", advisory: "Keep food wrapped around friendly deer.", indoorAlternatives: ["Nara National Museum (Buddhist sculpture hall)"] },
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },
  {
    id: "hiroshima",
    name: "Hiroshima & Miyajima Floating Torii",
    country: "Japan",
    countryCode: "JP",
    regionId: "chugoku",
    regionName: "Chugoku",
    category: "Heritage",
    coordinates: [34.3853, 132.4553],
    tagline: "The City of Peace & The Island of Gods",
    description: "From the solemn Atomic Bomb Dome and Peace Memorial Park in Hiroshima to the vermilion Grand Torii Gate of Itsukushima Shrine rising majestically from the Seto Inland Sea.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To ring the Peace Bell, fold a paper crane, and watch the high-tide sea mirror beneath Miyajima's floating torii gate at sunset.",
    bestTime: "March to May & September to November",
    crowdPrediction: { level: "Moderate", statusColor: "text-amber-400", score: 65, factors: "Steady international visitors" },
    estimatedBudget: { budget: "$45 - $85 / day", moderate: "$100 - $190 / day", luxury: "$280 - $550 / day", currency: "JPY / USD" },
    journeyScore: { total: 96, weather: 90, heritage: 99, culture: 98, accessibility: 94, budget: 92 },
    transportation: { nearestAirport: "Hiroshima Airport (HIJ)", nearestRailway: "Hiroshima Station (Sanyo Shinkansen)", localTransit: "Hiroden streetcars (trams), JR Miyajima ferry", tips: "The JR Pass fully covers the ferry to Miyajima Island." },
    localGuide: {
      nearbyHotels: [
        { name: "Kurayado Iroha", priceCategory: "Luxury Ryokan", distance: "Miyajima Island", rating: 4.8, facilities: ["Open-air rooftop bath over sea", "Kaiseki dining"], samplePrice: "¥52,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Nagataya", cuisine: "Hiroshima-style Okonomiyaki", priceLevel: "Budget", popularDishes: ["Hiroshima Okonomiyaki layered with soba noodles and squid"] }
      ],
      mustTryFood: ["Hiroshima-style layered Okonomiyaki", "Fresh Seto Inland Sea Grilled Oysters", "Momiji Manju maple leaf pastries"]
    },
    transportComparison: [
      { mode: "Sanyo Shinkansen Bullet Train from Osaka", costRange: "¥10,630", duration: "1h 25m", comfort: "Very High" },
      { mode: "JR Ferry to Miyajima", costRange: "¥200", duration: "10 minutes", comfort: "Scenic Sea" }
    ],
    heritageInfo: { era: "Classical Era (Itsukushima c. 593 CE) & Modern", historicalEra: "Classical Era", architecture: "Heian Shinto Shinden-zukuri & Atomic Memorial", unesco: true, significance: "Two UNESCO World Heritage sites: Itsukushima Shrine and Hiroshima Peace Memorial." },
    weatherByMonth: generate12MonthWeather(18, 22),
    weatherAlerts: { hasAlert: false, condition: "Pleasant Maritime Air", advisory: "Check tide tables to catch the torii gate at high tide.", indoorAlternatives: ["Hiroshima Peace Memorial Museum"] },
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },
  {
    id: "hokkaido",
    name: "Hokkaido (Sapporo & Lavender Meadows)",
    country: "Japan",
    countryCode: "JP",
    regionId: "hokkaido",
    regionName: "Hokkaido",
    category: "Mountains",
    coordinates: [43.0642, 141.3469],
    tagline: "The Wild Northern Frontier & Powder Snow Haven",
    description: "Japan's northern wilderness, famed for powdery Niseko ski slopes, Sapporo Snow Festival giant ice sculptures, Furano's rolling purple lavender hills, and steaming volcanic onsens.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To taste legendary fresh snow crab and soup curry, soak in outdoor hot springs surrounded by snow, and stroll lavender meadows in summer.",
    bestTime: "December to March (Winter Snow) & June to August (Summer Flowers)",
    crowdPrediction: { level: "Peak in Winter", statusColor: "text-amber-400", score: 72, factors: "High during February Snow Festival" },
    estimatedBudget: { budget: "$55 - $95 / day", moderate: "$120 - $220 / day", luxury: "$320 - $700 / day", currency: "JPY / USD" },
    journeyScore: { total: 96, weather: 95, heritage: 88, culture: 92, accessibility: 90, budget: 91 },
    transportation: { nearestAirport: "New Chitose Airport (CTS) - 45 km to Sapporo", nearestRailway: "Sapporo Station (JR Hokkaido)", localTransit: "JR Hokkaido rail, rental cars (recommended for summer)", tips: "Rent a 4WD vehicle with English GPS for exploring Furano & Biei." },
    localGuide: {
      nearbyHotels: [
        { name: "Jozankei Daiichi Hotel Suizan-tei", priceCategory: "Onsen Ryokan", distance: "Jozankei Valley", rating: 4.8, facilities: ["Private forest hot spring baths", "Seasonal kaiseki"], samplePrice: "¥45,000/night" }
      ],
      nearbyRestaurants: [
        { name: "Garaku Soup Curry", cuisine: "Hokkaido Specialty", priceLevel: "Moderate", popularDishes: ["Tender Chicken Leg Soup Curry", "Pork Belly Broth"] }
      ],
      mustTryFood: ["Hokkaido Soup Curry", "King Crab & Sea Urchin (Uni) Donburi", "Sapporo Miso Ramen", "Melon soft-serve ice cream"]
    },
    transportComparison: [
      { mode: "Domestic Flight Tokyo Haneda to Sapporo", costRange: "¥10,000 - ¥20,000", duration: "1h 35m", comfort: "Very High" },
      { mode: "JR Rapid Airport Train", costRange: "¥1,150", duration: "37 minutes", comfort: "High" }
    ],
    heritageInfo: { era: "Indigenous Ainu & Meiji Pioneer Era (19th Century)", historicalEra: "Early Modern Era", architecture: "Ainu Traditional & Red Brick Pioneer Architecture", unesco: true, significance: "Shiretoko UNESCO Natural Heritage national park." },
    weatherByMonth: generate12MonthWeather(8, 25, [6, 7, 0, 1]),
    weatherAlerts: { hasAlert: false, condition: "Cool Alpine Breeze / Snow", advisory: "Dress in layered thermal winter wear in winter.", indoorAlternatives: ["Sapporo Beer Museum", "Shiroi Koibito Park Chocolate Factory"] },
    virtualTourId: "tour-fushimi-inari",
    isHiddenGem: false
  },

  // --- CHINA (Shanghai, Xi'an, Guilin, Zhangjiajie, Chengdu, Hangzhou) ---
  {
    id: "shanghai",
    name: "Shanghai (The Bund & Futuristic Skylines)",
    country: "China",
    countryCode: "CN",
    regionId: "east-china",
    regionName: "East China",
    category: "City",
    coordinates: [31.2304, 121.4737],
    tagline: "The Pearl of the Orient on the Huangpu River",
    description: "A breathtaking contrast between colonial neoclassical architecture along The Bund and the sci-fi supertall towers of Pudong, classical Ming Dynasty Yu Garden, and French Concession lanes.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To cruise the Huangpu River beneath illuminated skyscrapers, sample steaming soup dumplings (Xiaolongbao), and wander tree-shaded shikumen alleys.",
    bestTime: "March to May & September to November",
    crowdPrediction: { level: "High", statusColor: "text-rose-400", score: 85, factors: "Busy metropolitan hub" },
    estimatedBudget: { budget: "$40 - $75 / day", moderate: "$90 - $180 / day", luxury: "$250 - $600 / day", currency: "CNY / USD" },
    journeyScore: { total: 97, weather: 90, heritage: 94, culture: 98, accessibility: 100, budget: 90 },
    transportation: { nearestAirport: "Pudong (PVG) 35km / Hongqiao (SHA) 13km", nearestRailway: "Shanghai Hongqiao High-Speed Rail Hub", localTransit: "Shanghai Metro (world's longest network), Maglev train (431 km/h)", tips: "Ride the Shanghai Maglev from Pudong Airport to Longyang Road in 7 minutes." },
    localGuide: {
      nearbyHotels: [
        { name: "Peace Hotel (Fairmont)", priceCategory: "Art Deco Legend", distance: "The Bund", rating: 4.8, facilities: ["1929 jazz age icon", "Historic Old Jazz Band", "Huangpu river terrace"], samplePrice: "¥2,800/night" }
      ],
      nearbyRestaurants: [
        { name: "Nanxiang Steamed Bun Restaurant", cuisine: "Shanghainese", priceLevel: "Moderate", popularDishes: ["Traditional Pork Xiaolongbao", "Crab Roe Soup Dumplings"] }
      ],
      mustTryFood: ["Xiaolongbao (Soup Dumplings)", "Shengjianbao (pan-fried pork buns)", "Hairy Crab", "Hongshao Rou (red-braised pork)"]
    },
    transportComparison: [
      { mode: "Shanghai Maglev Train", costRange: "¥50 ($7)", duration: "7 minutes 20 secs", comfort: "431 km/h World Fastest" },
      { mode: "Metro Line 2", costRange: "¥7 ($1)", duration: "60 minutes", comfort: "High" }
    ],
    heritageInfo: { era: "Ming Dynasty & Colonial Treaty Port Era (1559–1930 CE)", historicalEra: "Early Modern Era", architecture: "Classical Jiangnan Garden & Neoclassical Bund Architecture", unesco: false, significance: "Historic global commercial crossroads of the Silk Road maritime routes." },
    weatherByMonth: generate12MonthWeather(20, 25),
    weatherAlerts: { hasAlert: false, condition: "Pleasant", advisory: "Evenings along The Bund can be breezy.", indoorAlternatives: ["Shanghai Museum", "Power Station of Art"] },
    virtualTourId: "tour-great-wall",
    isHiddenGem: false
  },
  {
    id: "xian",
    name: "Xi'an (The Terracotta Army & Silk Road Gateway)",
    country: "China",
    countryCode: "CN",
    regionId: "shaanxi",
    regionName: "Shaanxi",
    category: "Heritage",
    coordinates: [34.3416, 108.9398],
    tagline: "The Ancient Imperial Capital of 13 Dynasties",
    description: "The ancient eastern terminus of the Silk Road, guarded by the 8,000-man Terracotta Army of Qin Shi Huang, a fully intact 14-kilometer Ming city wall, and vibrant Muslim Quarter.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To cycle along the top of the ancient 14km fortified stone city wall and stand face-to-face with the life-sized Terracotta Warriors.",
    bestTime: "April to May & September to October",
    crowdPrediction: { level: "Moderate Crowd", statusColor: "text-amber-400", score: 70, factors: "Busy at the Terracotta Warriors museum" },
    estimatedBudget: { budget: "$30 - $60 / day", moderate: "$70 - $140 / day", luxury: "$180 - $400 / day", currency: "CNY / USD" },
    journeyScore: { total: 97, weather: 90, heritage: 100, culture: 98, accessibility: 94, budget: 94 },
    transportation: { nearestAirport: "Xi'an Xianyang International (XIY) - 40 km", nearestRailway: "Xi'an North High-Speed Railway Station", localTransit: "Xi'an Metro, shared bicycles on city wall", tips: "Rent a bicycle on the ancient South Gate to cycle the entire perimeter." },
    localGuide: {
      nearbyHotels: [
        { name: "Sofitel Legend Peoples Grand Hotel", priceCategory: "Heritage Luxury", distance: "Old City center", rating: 4.8, facilities: ["1953 Russian-influenced state guest palace", "Private gardens"], samplePrice: "¥1,600/night" }
      ],
      nearbyRestaurants: [
        { name: "First Noodle Under the Sun", cuisine: "Shaanxi Noodles", priceLevel: "Budget", popularDishes: ["Biangbiang wide hand-pulled noodles", "Roujiamo Chinese hamburger"] }
      ],
      mustTryFood: ["Biangbiang Hand-Pulled Noodles", "Roujiamo (pork-stuffed flatbread)", "Yangrou Paomo (mutton broth with torn bread)"]
    },
    transportComparison: [
      { mode: "High-Speed Bullet Train from Beijing", costRange: "¥515 ($72)", duration: "4h 15m", comfort: "Very High" },
      { mode: "Domestic Flight", costRange: "¥600 - ¥1,100", duration: "2 hours", comfort: "Very High" }
    ],
    heritageInfo: { era: "Ancient Qin & Tang Dynasties (221 BCE – 907 CE)", historicalEra: "Ancient Era", architecture: "Qin Imperial Underground Necropolis & Ming Stone Fortress", unesco: true, significance: "UNESCO World Heritage site guarding the First Emperor of China." },
    weatherByMonth: generate12MonthWeather(18, 15),
    weatherAlerts: { hasAlert: false, condition: "Sunny & Dry", advisory: "Comfortable continental weather.", indoorAlternatives: ["Shaanxi History Museum", "Terracotta Warriors Museum Pits 1–3"] },
    virtualTourId: "tour-great-wall",
    isHiddenGem: false
  },
  {
    id: "guilin",
    name: "Guilin & Yangshuo (Li River Karst Peaks)",
    country: "China",
    countryCode: "CN",
    regionId: "guangxi",
    regionName: "Guangxi",
    category: "Nature",
    coordinates: [25.2736, 110.2902],
    tagline: "The World's Most Poetic Limestone Karst Landscapes",
    description: "Celebrated in Chinese scrolls as 'the finest scenery under heaven' (桂林山水甲天下), featuring jade-green Li River waters winding past thousands of limestone karst pillars and cormorant fishermen.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To cruise the Li River on a bamboo raft, cycle through the Moon Hill karst countryside, and watch the Impression Sanjie Liu open-air light show.",
    bestTime: "April to October",
    crowdPrediction: { level: "Moderate", statusColor: "text-emerald-400", score: 65, factors: "Pleasant river cruises" },
    estimatedBudget: { budget: "$30 - $55 / day", moderate: "$65 - $130 / day", luxury: "$180 - $380 / day", currency: "CNY / USD" },
    journeyScore: { total: 96, weather: 92, heritage: 90, culture: 95, accessibility: 90, budget: 93 },
    transportation: { nearestAirport: "Guilin Liangjiang International (KWL) - 30 km", nearestRailway: "Yangshuo Station / Guilin Railway Station", localTransit: "Bamboo rafts, e-bikes, river cruisers", tips: "Rent an electric scooter in Yangshuo to explore the Yulong River valley." },
    localGuide: {
      nearbyHotels: [
        { name: "Alila Yangshuo", priceCategory: "Modern Heritage Resort", distance: "Yulong River", rating: 4.8, facilities: ["Converted 1960s sugar mill", "Reflecting pools against karst cliffs"], samplePrice: "¥2,200/night" }
      ],
      nearbyRestaurants: [
        { name: "Chunji Roasted Goose", cuisine: "Guilin Specialty", priceLevel: "Moderate", popularDishes: ["Crispy Roasted Goose with plum sauce", "Beer Fish"] }
      ],
      mustTryFood: ["Guilin Rice Noodles (Mifun)", "Yangshuo Beer Fish", "Stuffed Li River Snails", "Water chestnut cakes"]
    },
    transportComparison: [
      { mode: "Li River Luxury Cruise from Guilin to Yangshuo", costRange: "¥360 ($50)", duration: "4 hours scenic drift", comfort: "Panoramic Boat" },
      { mode: "High-Speed Rail from Guangzhou", costRange: "¥140 ($20)", duration: "2h 15m", comfort: "High" }
    ],
    heritageInfo: { era: "Natural Karst Formations (200 Million Years) & Song Dynasty", historicalEra: "Classical Era", architecture: "Ancient Covered Wind & Rain Wooden Bridges", unesco: true, significance: "South China Karst UNESCO World Heritage site." },
    weatherByMonth: generate12MonthWeather(22, 35),
    weatherAlerts: { hasAlert: false, condition: "Misty Emerald Karst Morning", advisory: "Light rain creates magical ethereal mist over the peaks.", indoorAlternatives: ["Reed Flute Cave Illuminated Cavern"] },
    virtualTourId: "tour-great-wall",
    isHiddenGem: false
  },
  {
    id: "zhangjiajie",
    name: "Zhangjiajie (Avatar Floating Hallelujah Mountains)",
    country: "China",
    countryCode: "CN",
    regionId: "hunan",
    regionName: "Hunan",
    category: "Mountains",
    coordinates: [29.1170, 110.4790],
    tagline: "The Surrealistic Pillars of Wulingyuan",
    description: "Over 3,000 towering quartz-sandstone pillars soaring into sea of clouds, inspiration for the floating Hallelujah Mountains in James Cameron's Avatar, featuring the Bailong Glass Elevator.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To ride the world's tallest outdoor glass elevator (326m) up the cliff face and cross the transparent Grand Canyon Glass Bridge.",
    bestTime: "April to May & September to November",
    crowdPrediction: { level: "Moderate to High", statusColor: "text-amber-400", score: 70, factors: "High at Tianzi Mountain viewpoints" },
    estimatedBudget: { budget: "$35 - $65 / day", moderate: "$75 - $150 / day", luxury: "$200 - $450 / day", currency: "CNY / USD" },
    journeyScore: { total: 97, weather: 90, heritage: 88, culture: 92, accessibility: 92, budget: 92 },
    transportation: { nearestAirport: "Zhangjiajie Hehua Airport (DYG) - 10 km", nearestRailway: "Zhangjiajie West High-Speed Rail", localTransit: "Eco-shuttle park buses, cable cars, cliff elevators", tips: "The park ticket is valid for 4 consecutive days." },
    localGuide: {
      nearbyHotels: [
        { name: "Homeward Mountain Resort", priceCategory: "Boutique Mountain", distance: "Wulingyuan gate", rating: 4.8, facilities: ["Cliff views", "Infinity pool over forest"], samplePrice: "¥1,100/night" }
      ],
      nearbyRestaurants: [
        { name: "Wulong Shanzhai", cuisine: "Tujia Minority Cuisine", priceLevel: "Moderate", popularDishes: ["Sanxiaguo spicy hotpot", "Smoked cured pork belly with bamboo shoots"] }
      ],
      mustTryFood: ["Tujia Sanxiaguo (three-delicacy dry pot)", "Cured Xiangxi Bacon", "Wild mushroom soup"]
    },
    transportComparison: [
      { mode: "High-Speed Rail from Changsha", costRange: "¥160 ($23)", duration: "2 hours", comfort: "High" },
      { mode: "Bailong Glass Cliff Elevator", costRange: "¥65", duration: "88 seconds ascent", comfort: "Thrilling" }
    ],
    heritageInfo: { era: "Geological Sandstone Pillars (300 Million Years)", historicalEra: "Ancient Era", architecture: "Modern Suspended Glass Engineering & Tujia Stilt Houses", unesco: true, significance: "UNESCO World Natural Heritage site and Global Geopark." },
    weatherByMonth: generate12MonthWeather(18, 30),
    weatherAlerts: { hasAlert: false, condition: "Cloud Sea Over Peaks", advisory: "Early mornings after rain create the famous 'floating mountain' sea of clouds.", indoorAlternatives: ["Yellow Dragon Cave (Huanglong) Underground Palace"] },
    virtualTourId: "tour-great-wall",
    isHiddenGem: false
  },

  // --- THAILAND (Bangkok, Phuket, Ayutthaya, Krabi) ---
  {
    id: "bangkok",
    name: "Bangkok (Grand Palace & Chao Phraya River)",
    country: "Thailand",
    countryCode: "TH",
    regionId: "central-thailand",
    regionName: "Central Thailand",
    category: "Culture",
    coordinates: [13.7563, 100.5018],
    tagline: "City of Angels: Gilded Wats & Floating Markets",
    description: "Thailand's electrifying capital: the shimmering golden chedis of the Grand Palace and Wat Phra Kaew (Emerald Buddha), porcelain spires of Wat Arun, and Chao Phraya river express boats.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To marvel at the Reclining Buddha at Wat Pho, cruise the canals on a longtail boat, and eat Michelin street food on Yaowarat road.",
    bestTime: "November to February (Cool Season)",
    crowdPrediction: { level: "High", statusColor: "text-rose-400", score: 82, factors: "Busy capital" },
    estimatedBudget: { budget: "$30 - $55 / day", moderate: "$70 - $130 / day", luxury: "$200 - $500 / day", currency: "THB / USD" },
    journeyScore: { total: 98, weather: 90, heritage: 97, culture: 99, accessibility: 98, budget: 95 },
    transportation: { nearestAirport: "Suvarnabhumi (BKK) 30km / Don Mueang (DMK) 24km", nearestRailway: "Krung Thep Aphiwat Central Terminal", localTransit: "BTS Skytrain, MRT Subway, Chao Phraya Express River Ferry, Tuk-tuks", tips: "Use the Chao Phraya Tourist Boat (Blue Flag) for hop-on-hop-off temple transit." },
    localGuide: {
      nearbyHotels: [
        { name: "Mandarin Oriental Bangkok", priceCategory: "Legendary Historic Luxury", distance: "Chao Phraya Riverfront", rating: 4.9, facilities: ["1876 historic authors' wing", "Private river shuttle"], samplePrice: "฿22,000/night" },
        { name: "Riva Arun Bangkok", priceCategory: "Boutique Riverfront", distance: "Opposite Wat Arun", rating: 4.6, facilities: ["Direct rooftop view of Wat Arun spires"], samplePrice: "฿5,200/night" }
      ],
      nearbyRestaurants: [
        { name: "Thip Samai", cuisine: "Authentic Street Specialty", priceLevel: "Budget", popularDishes: ["Superb Pad Thai wrapped in thin egg omelet with fresh prawns"] },
        { name: "Jay Fai", cuisine: "Michelin Star Street Food", priceLevel: "Premium (฿1,400)", popularDishes: ["Famous Crab Meat Omelet", "Drunken Seafood Noodles"] }
      ],
      mustTryFood: ["Authentic Pad Thai", "Tom Yum Goong (spicy lemongrass shrimp)", "Mango Sticky Rice", "Crispy Pork Belly at Yaowarat"]
    },
    transportComparison: [
      { mode: "Airport Rail Link from BKK to City", costRange: "฿45 ($1.30)", duration: "26 minutes", comfort: "High" },
      { mode: "Chao Phraya Express River Boat", costRange: "฿16 - ฿30", duration: "15 minutes per pier", comfort: "Scenic Breeze" }
    ],
    heritageInfo: { era: "Rattanakosin Period (1782 CE – Present)", historicalEra: "Early Modern Era", architecture: "Traditional Thai Royal Buddhist Gilded Architecture", unesco: false, significance: "Spiritual and political seat of the Chakri Dynasty." },
    weatherByMonth: generate12MonthWeather(29, 20, [11, 0, 1]),
    weatherAlerts: { hasAlert: false, condition: "Warm Tropical Sun", advisory: "Dress respectfully with knees and shoulders covered for temple entry.", indoorAlternatives: ["Bangkok National Museum", "Jim Thompson House"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "phuket",
    name: "Phuket & Phi Phi Islands",
    country: "Thailand",
    countryCode: "TH",
    regionId: "southern-thailand",
    regionName: "Southern Thailand",
    category: "Beach",
    coordinates: [7.8804, 98.3923],
    tagline: "The Pearl of the Andaman Sea",
    description: "Thailand's largest island, boasting white sandy coves (Kata, Nai Harn), colorful Sino-Portuguese heritage shophouses in Old Phuket Town, and day trips to Phi Phi Islands.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To snorkel in crystal-clear turquoise waters of Maya Bay, enjoy cliffside sunset cocktails at Promthep Cape, and explore Phuket Old Town street murals.",
    bestTime: "November to April (Dry Sunny Season)",
    crowdPrediction: { level: "High in Peak Season", statusColor: "text-amber-400", score: 76, factors: "Busy during European winter" },
    estimatedBudget: { budget: "$35 - $65 / day", moderate: "$80 - $160 / day", luxury: "$250 - $650 / day", currency: "THB / USD" },
    journeyScore: { total: 95, weather: 94, heritage: 88, culture: 92, accessibility: 94, budget: 90 },
    transportation: { nearestAirport: "Phuket International Airport (HKT)", nearestRailway: "Surat Thani (transfer via bus)", localTransit: "Smart Bus, Songthaews, rental scooters, speedboats", tips: "Phuket Smart Bus connects the airport to western beaches for only ฿100." },
    localGuide: {
      nearbyHotels: [
        { name: "The Shore at Katathani", priceCategory: "Luxury Pool Villa", distance: "Kata Noi Beach", rating: 4.9, facilities: ["Private infinity pool villas", "Beachfront dining"], samplePrice: "฿24,000/night" },
        { name: "The Memory at On On Hotel", priceCategory: "Historic Heritage", distance: "Old Phuket Town", rating: 4.5, facilities: ["Oldest hotel in Phuket (1927)", "Sino-Portuguese courtyards"], samplePrice: "฿2,200/night" }
      ],
      nearbyRestaurants: [
        { name: "Raya Restaurant", cuisine: "Peranakan & Southern Thai", priceLevel: "Moderate", popularDishes: ["Crab Meat Curry with Rice Vermicelli", "Moo Hong (braised pork belly)"] }
      ],
      mustTryFood: ["Phuket Crab Meat Yellow Curry", "Moo Hong (caramelized braised pork)", "Roti with Massaman Curry", "O-Aew shaved ice dessert"]
    },
    transportComparison: [
      { mode: "Speedboat to Phi Phi Islands", costRange: "฿1,200 - ฿1,800", duration: "50 minutes", comfort: "Fast Nautical" },
      { mode: "Phuket Smart Bus from Airport", costRange: "฿100", duration: "1h 15m", comfort: "Air-Conditioned" }
    ],
    heritageInfo: { era: "Sino-Portuguese Tin Mining Era (19th Century)", historicalEra: "Early Modern Era", architecture: "Sino-Portuguese Colonial Arcade Architecture", unesco: false, significance: "UNESCO City of Gastronomy with vibrant Peranakan trading culture." },
    weatherByMonth: generate12MonthWeather(28, 25, [11, 0, 1, 2, 3]),
    weatherAlerts: { hasAlert: false, condition: "Sunny Tropical Trade Winds", advisory: "Ideal marine conditions for diving and island hopping.", indoorAlternatives: ["Phuket Thai Hua Museum in Old Town"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  },
  {
    id: "ayutthaya",
    name: "Ayutthaya (UNESCO Ancient Kingdom Ruins)",
    country: "Thailand",
    countryCode: "TH",
    regionId: "central-thailand",
    regionName: "Central Thailand",
    category: "Heritage",
    coordinates: [14.3532, 100.5684],
    tagline: "The Resplendent Former Capital of Siam",
    description: "An island city bounded by three rivers, home to the atmospheric red-brick ruins of royal monasteries, the iconic Buddha head entwined in banyan tree roots at Wat Mahathat, and Wat Chaiwatthanaram.",
    heroMedia: { type: "image", url: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75" },
    whyVisit: "To cycle through towering weathered prangs and chedis and take a sunset river cruise watching temples illuminated in gold.",
    bestTime: "November to February",
    crowdPrediction: { level: "Moderate", statusColor: "text-emerald-400", score: 58, factors: "Comfortable day-trip flow" },
    estimatedBudget: { budget: "$25 - $45 / day", moderate: "$55 - $100 / day", luxury: "$150 - $300 / day", currency: "THB / USD" },
    journeyScore: { total: 96, weather: 90, heritage: 99, culture: 97, accessibility: 95, budget: 95 },
    transportation: { nearestAirport: "Don Mueang Airport (DMK) - 55 km", nearestRailway: "Ayutthaya Railway Station (connected to Bangkok)", localTransit: "Bicycle hire, tuk-tuks, longtail boats", tips: "Rent a bicycle right across from the train station for ฿50/day." },
    localGuide: {
      nearbyHotels: [
        { name: "Sala Ayutthaya", priceCategory: "Design Boutique", distance: "Opposite Wat Phutthaisawan", rating: 4.7, facilities: ["Riverfront view of ancient stupas", "Red-brick minimalist design"], samplePrice: "฿5,800/night" }
      ],
      nearbyRestaurants: [
        { name: "Ruan Thai Kung Pao", cuisine: "Giant River Prawns", priceLevel: "Moderate to High", popularDishes: ["Charcoal-grilled Giant Freshwater Prawns with spicy lime dip"] }
      ],
      mustTryFood: ["Charcoal-Grilled Giant River Prawns", "Roti Sai Mai (cotton candy crepe rolls)", "Ayutthaya Boat Noodles"]
    },
    transportComparison: [
      { mode: "Scenic Third-Class Train from Bangkok", costRange: "฿15 ($0.45)", duration: "1h 20m", comfort: "Authentic Open-Window" },
      { mode: "Air-Conditioned Express Train", costRange: "฿245 ($7)", duration: "50 minutes", comfort: "High" }
    ],
    heritageInfo: { era: "Classical Ayutthaya Kingdom (1350–1767 CE)", historicalEra: "Classical & Medieval Era", architecture: "Classical Siamese Khmer-influenced Prang Architecture", unesco: true, significance: "UNESCO World Heritage ancient capital destroyed in 1767." },
    weatherByMonth: generate12MonthWeather(28, 18),
    weatherAlerts: { hasAlert: false, condition: "Warm and Breezy", advisory: "Wear slip-on footwear and carry sun protection for outdoor temple grounds.", indoorAlternatives: ["Chao Sam Phraya National Museum (Gold Treasure Hall)"] },
    virtualTourId: "tour-meenakshi",
    isHiddenGem: false
  }
];

// Merge uniquely
const existingIds = new Set(destinationsData.map(d => d.id));
const combinedDestinations = [...destinationsData];

newDestinations.forEach(d => {
  if (!existingIds.has(d.id)) {
    combinedDestinations.push(d);
    existingIds.add(d.id);
  }
});

console.log(`Original destinations count: ${destinationsData.length}`);
console.log(`Expanded destinations count: ${combinedDestinations.length}`);

// Write updated file content
const output = `// ASIA EXPLORA - Scalable Master Tourism Dataset
// Auto-generated production dataset containing all 48 Asian countries, regions, destinations, heritage, virtual tours, and climate intelligence.

export const countriesData = ${JSON.stringify(countriesData, null, 2)};

export const regionsData = ${JSON.stringify(regionsData, null, 2)};

export const destinationsData = ${JSON.stringify(combinedDestinations, null, 2)};

export const heritageSitesData = ${JSON.stringify(heritageSitesData, null, 2)};

export const virtualToursData = ${JSON.stringify(virtualToursData, null, 2)};

export const historicalErasData = ${JSON.stringify(historicalErasData, null, 2)};

export const monthlyRecommendations = ${JSON.stringify(monthlyRecommendations, null, 2)};

export const gamificationBadges = ${JSON.stringify(gamificationBadges, null, 2)};
`;

fs.writeFileSync(SEED_PATH, output, 'utf-8');
console.log("Successfully expanded seedData.js with comprehensive major destinations!");
