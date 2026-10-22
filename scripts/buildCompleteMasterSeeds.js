// Master Seed Builder for ASIA EXPLORA
// Covers all 48 Asian Countries (at least 4-5 destinations each)
// Covers all 5 Historical Eras in heritageSitesData

const fs = require('fs');
const path = require('path');

const clientSeedPath = path.join(__dirname, '../client/src/data/seedData.js');
const serverSeedPath = path.join(__dirname, '../server/data/seedData.js');

const { 
  countriesData, 
  regionsData, 
  destinationsData: existingDestinations, 
  heritageSitesData: existingHeritage = [],
  virtualToursData 
} = require(clientSeedPath);

// Unique country photos
const countryPhotos = {
  "india": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
  "sri-lanka": "https://images.unsplash.com/photo-1588598136853-a66986fc035a?auto=format&fit=crop&w=1200&q=75",
  "nepal": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
  "bhutan": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=75",
  "maldives": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=75",
  "pakistan": "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=75",
  "bangladesh": "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=1200&q=75",
  "afghanistan": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=75",
  "japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=75",
  "china": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75",
  "south-korea": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=75",
  "north-korea": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=75",
  "mongolia": "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=75",
  "thailand": "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
  "vietnam": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=75",
  "indonesia": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=75",
  "cambodia": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
  "singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=75",
  "malaysia": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=75",
  "philippines": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=75",
  "laos": "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=1200&q=75",
  "myanmar": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75",
  "brunei": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=75",
  "timor-leste": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
  "uae": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=75",
  "saudi-arabia": "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=1200&q=75",
  "turkey": "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=75",
  "jordan": "https://images.unsplash.com/photo-1579606032834-de00b1a0e5a6?auto=format&fit=crop&w=1200&q=75",
  "oman": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=75",
  "qatar": "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=75",
  "kuwait": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=75",
  "bahrain": "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=75",
  "lebanon": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=75",
  "iran": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=75",
  "iraq": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=75",
  "armenia": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=75",
  "azerbaijan": "https://images.unsplash.com/photo-1572455044327-7348c1be7267?auto=format&fit=crop&w=1200&q=75",
  "georgia": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=75",
  "uzbekistan": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=75",
  "kazakhstan": "https://images.unsplash.com/photo-1558588942-930faae5a389?auto=format&fit=crop&w=1200&q=75",
  "kyrgyzstan": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=75",
  "tajikistan": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
  "turkmenistan": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=75",
  "russia": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=75",
  "syria": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=75",
  "yemen": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=75",
  "israel": "https://images.unsplash.com/photo-1544830206-8147d3c0fb29?auto=format&fit=crop&w=1200&q=75",
  "palestine": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=75"
};

const updatedCountries = countriesData.map(c => {
  const photo = countryPhotos[c.id] || c.heroMedia?.poster || c.heroMedia?.url;
  return {
    ...c,
    heroMedia: {
      type: "image",
      url: photo,
      poster: photo
    }
  };
});

// Helper for weather
const create12MonthWeather = (baseTemp = 26, isDesert = false, isTropical = false) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month, idx) => {
    let temp = baseTemp;
    let rainProb = 20;
    if (idx >= 4 && idx <= 8) {
      temp = isDesert ? baseTemp + 13 : isTropical ? baseTemp + 3 : baseTemp + 8;
      rainProb = isDesert ? 5 : isTropical ? 65 : 45;
    } else {
      temp = isDesert ? baseTemp - 8 : isTropical ? baseTemp - 2 : baseTemp - 6;
      rainProb = isDesert ? 15 : isTropical ? 25 : 15;
    }
    const isRecommended = idx <= 3 || idx >= 9;
    return {
      month,
      temp: Math.round(temp),
      rainProb,
      humidity: isDesert ? 35 : isTropical ? 78 : 60,
      crowd: isRecommended ? "Peak Crowd 🔴" : "Low Crowd 🟢",
      weatherScore: isRecommended ? 94 : 76,
      recommended: isRecommended
    };
  });
};

// Comprehensive destination catalog for nations
const masterCountryDestinations = {
  // PAKISTAN
  "pakistan": [
    { name: "Badshahi Mosque & Lahore Fort (UNESCO Citadel)", cat: "Heritage & Imperial", coords: [31.5882, 74.3095], era: "Early Modern Era (Mughal, 1671 CE)", unesco: true, tagline: "One of the grandest red sandstone Mughal imperial mosques on Earth" },
    { name: "Hunza Valley & Rakaposhi Peak (Karakoram)", cat: "Nature & Mountains", coords: [36.3167, 74.6500], era: "Medieval Era", unesco: false, tagline: "Turquoise alpine rivers, terraced apricot orchards, and 7,788m snowbound spires" },
    { name: "Mohenjo-daro (Mound of the Dead)", cat: "Archaeological", coords: [27.3292, 68.1389], era: "Ancient Era (Bronze Age Indus, 2500 BCE)", unesco: true, tagline: "One of the world's earliest major urban centers with grid planning and the Great Bath" },
    { name: "Taxila Ancient Buddhist University & Stupas", cat: "Heritage & Spiritual", coords: [33.7461, 72.8258], era: "Ancient Era (Gandhara, 6th Century BCE)", unesco: true, tagline: "Cradle of Greco-Buddhist art and premier intellectual hub of the ancient Silk Road" },
    { name: "Fairy Meadows & Nanga Parbat Base Camp", cat: "Nature & Trekking", coords: [35.3833, 74.5833], era: "Modern Heritage", unesco: false, tagline: "Lush alpine grassland facing the monumental 8,126m ice wall of the Killer Mountain" }
  ],
  // BANGLADESH
  "bangladesh": [
    { name: "Sundarbans National Mangrove Tiger Sanctuary", cat: "Nature & Wildlife", coords: [21.9497, 89.1833], era: "Modern Heritage", unesco: true, tagline: "World's largest contiguous tidal mangrove forest and refuge of the Royal Bengal Tiger" },
    { name: "Ahsan Manzil (Pink Palace) & Lalbagh Fort", cat: "Heritage & Colonial", coords: [23.7086, 90.4060], era: "Early Modern Era (Nawab Period, 1872 CE)", unesco: false, tagline: "Opulent Indo-Saracenic riverfront palace of the Nawabs along the bustling Buriganga" },
    { name: "Srimangal (Tea Capital & Lawachara Forest)", cat: "Nature & Highlands", coords: [24.3065, 91.7296], era: "Modern Heritage", unesco: false, tagline: "Rolling emerald tea garden hills, Seven-Layer Tea, and endangered Hoolock Gibbon rainforest" },
    { name: "Sixty Dome Mosque (Shait Gumbad Bagerhat)", cat: "Heritage & Medieval", coords: [22.6744, 89.7417], era: "Medieval Era (Bengal Sultanate, 1459 CE)", unesco: true, tagline: "UNESCO medieval brick mosque with 77 domes and 60 slender granite columns" },
    { name: "Cox's Bazar (World's Longest Natural Sea Beach)", cat: "Islands & Beaches", coords: [21.4272, 92.0058], era: "Modern Heritage", unesco: false, tagline: "Unbroken 120-kilometer golden sand beach along the warm waves of the Bay of Bengal" }
  ],
  // AFGHANISTAN
  "afghanistan": [
    { name: "Band-e Amir Turquoise National Lakes", cat: "Nature & Geological", coords: [34.8389, 67.2222], era: "Modern Heritage", unesco: false, tagline: "Six intense cobalt-blue travertine lakes trapped between 3,000m Hindu Kush canyons" },
    { name: "Blue Mosque of Mazar-i-Sharif (Rawze-e-Sharif)", cat: "Heritage & Spiritual", coords: [36.7089, 67.1108], era: "Medieval Era (Timurid, 1481 CE)", unesco: false, tagline: "Stunning turquoise and cobalt mosaic shrine with thousands of white peace pigeons" },
    { name: "Herat Citadel (Qala Ikhtyaruddin)", cat: "Heritage & Ancient", coords: [34.3467, 62.1903], era: "Ancient Era (Hellenistic, 330 BCE)", unesco: false, tagline: "Massive mudbrick fortress founded by Alexander the Great with 18 defensive towers" },
    { name: "Minaret of Jam (UNESCO Mountain Monument)", cat: "Heritage & Medieval", coords: [34.5142, 64.5161], era: "Medieval Era (Ghurid, 1194 CE)", unesco: true, tagline: "65-meter 12th-century fired-brick minaret rising from a remote mountain canyon" },
    { name: "Bamiyan Valley Cultural Landscape", cat: "Archaeological", coords: [34.8319, 67.8267], era: "Classical Era (Gandhara, 6th Century CE)", unesco: true, tagline: "Historic sandstone cliff sanctuaries and monastic caves carved along the Silk Road" }
  ],
  // UNITED ARAB EMIRATES
  "uae": [
    { name: "Burj Khalifa & Downtown Dubai Marina", cat: "Modern & Luxury", coords: [25.1972, 55.2744], era: "Modern Heritage", unesco: false, tagline: "The world's tallest tower (828m) and futuristic dancing fountain lake" },
    { name: "Sheikh Zayed Grand Mosque Abu Dhabi", cat: "Heritage & Spiritual", coords: [24.4128, 54.4750], era: "Modern Heritage", unesco: false, tagline: "82 Macedonian white marble domes, 1,096 columns, and hand-loomed Persian carpets" },
    { name: "Louvre Abu Dhabi (Saadiyat Cultural District)", cat: "Art & Architecture", coords: [24.5336, 54.3983], era: "Modern Heritage", unesco: false, tagline: "Jean Nouvel's floating dome creating an enchanting 'Rain of Light' over the ocean" },
    { name: "Al Ain Oasis & Jebel Hafeet (UNESCO)", cat: "Nature & Heritage", coords: [24.2167, 55.7667], era: "Ancient Era (3000 BCE Falaj)", unesco: true, tagline: "147,000 date palms fed by 3,000-year-old Falaj irrigation systems beneath desert peaks" },
    { name: "Hatta Mountains & Turquoise Dam Reservoir", cat: "Nature & Highlands", coords: [24.7833, 56.1167], era: "Modern Heritage", unesco: false, tagline: "Rugged Hajar mountain peaks, heritage watchtowers, and emerald water kayaking" }
  ],
  // SAUDI ARABIA
  "saudi-arabia": [
    { name: "AlUla Hegra (Mada'in Salih UNESCO Tombs)", cat: "Heritage & Ancient", coords: [26.8000, 37.9500], era: "Ancient Era (Nabataean, 1st Century BCE)", unesco: true, tagline: "Over 110 monumental Nabataean rock-cut tombs sculpted into golden desert monoliths" },
    { name: "Historic Al-Balad (Old Jeddah UNESCO District)", cat: "Heritage & Maritime", coords: [21.4858, 39.1867], era: "Early Modern Era", unesco: true, tagline: "7th-century Red Sea port with coral stone towers and carved wooden Rawasheen balconies" },
    { name: "Edge of the World (Jebel Fihrayn Escarpment)", cat: "Nature & Geological", coords: [24.9472, 45.9897], era: "Modern Heritage", unesco: false, tagline: "Dramatic 300-meter sheer cliff drops overlooking ancient dried seabed horizons" },
    { name: "Diriyah At-Turaif (Birthplace of the Kingdom)", cat: "Heritage & Imperial", coords: [24.7333, 46.5750], era: "Early Modern Era (1744 CE)", unesco: true, tagline: "UNESCO mudbrick citadel and the first capital of the Saudi Dynasty in Wadi Hanifa" },
    { name: "Farasan Islands Red Sea Marine Sanctuary", cat: "Islands & Marine", coords: [16.7000, 42.1167], era: "Modern Heritage", unesco: false, tagline: "Pristine coral archipelago with white sandy beaches, dugongs, and osprey colonies" }
  ],
  // UZBEKISTAN
  "uzbekistan": [
    { name: "Registan Square & Shah-i-Zinda Samarkand", cat: "Heritage & Silk Road", coords: [39.6547, 66.9758], era: "Medieval Era (Timurid, 1420 CE)", unesco: true, virtualTourId: "tour-registan", tagline: "The crown jewel of the Silk Road: three monumental majolica madrasahs from the Timurids" },
    { name: "Historic Centre of Bukhara (Po-i-Kalyan & The Ark)", cat: "Heritage & Ancient", coords: [39.7747, 64.4172], era: "Classical Era (1127 CE)", unesco: true, tagline: "Living museum with 140 architectural monuments and the 48m Kalyan Minaret" },
    { name: "Khiva Itchan Kala (Walled Silk Road Oasis)", cat: "Heritage & Medieval", coords: [41.3783, 60.3600], era: "Medieval Era", unesco: true, tagline: "Completely intact mudbrick medieval desert city enclosed by 10-meter ramparts" },
    { name: "Chorsu Bazaar & Tashkent Metro Palaces", cat: "City & Culture", coords: [41.3275, 69.2401], era: "Modern Heritage", unesco: false, tagline: "Vibrant turquoise dome spice market and Soviet-era chandelier underground subway halls" },
    { name: "Shahrisabz Ak-Saray White Palace Ruins", cat: "Heritage & Imperial", coords: [39.0500, 66.8333], era: "Medieval Era (Timur's Birthplace, 1380 CE)", unesco: true, tagline: "Colossal 65-meter tiled gatehouse ruins of Timur's monumental summer palace" }
  ],
  // SRI LANKA (Additional)
  "sri-lanka": [
    { name: "Temple of the Sacred Tooth Relic (Kandy)", cat: "Heritage & Spiritual", coords: [7.2936, 80.6413], era: "Early Modern Era (1595 CE)", unesco: true, tagline: "Venerated royal palace temple enshrining the left canine tooth relic of Gautama Buddha" },
    { name: "Ella Nine Arch Bridge & Demodara Valley", cat: "Nature & Scenic Rail", coords: [6.8739, 81.0456], era: "Early Modern Era (1921 CE)", unesco: false, tagline: "Colonial stone viaduct surrounded by mist-shrouded emerald tea hills and cloud forests" },
    { name: "Yala National Park Leopard & Elephant Reserve", cat: "Nature & Wildlife", coords: [6.3683, 81.5233], era: "Modern Heritage", unesco: false, tagline: "Highest recorded leopard density on Earth alongside Asian elephants, sloth bears, and sea lagoons" }
  ],
  // NEPAL (Additional)
  "nepal": [
    { name: "Kathmandu Durbar Square & Swayambhunath", cat: "Heritage & Spiritual", coords: [27.7042, 85.3067], era: "Medieval Era (Malla Dynasty)", unesco: true, tagline: "Ancient Newari tiered pagodas, Living Goddess Kumari Ghar, and all-seeing Buddha eyes" },
    { name: "Pokhara Phewa Lake & World Peace Pagoda", cat: "Nature & Lakes", coords: [28.2096, 83.9856], era: "Modern Heritage", unesco: false, tagline: "Tranquil mountain lake reflecting the snowbound fishtail summit of Mount Machapuchare" },
    { name: "Chitwan National Park Rhino Safari", cat: "Nature & Wildlife", coords: [27.5342, 84.4533], era: "Modern Heritage", unesco: true, tagline: "Subtropical jungle haven for greater one-horned rhinos, Bengal tigers, and gharial crocodiles" },
    { name: "Bhaktapur Ancient Kingdom (City of Devotees)", cat: "Heritage & Medieval", coords: [27.6711, 85.4286], era: "Medieval Era (12th Century)", unesco: true, tagline: "Preserved red brick medieval kingdom featuring the 55-Window Palace and Nyatapola Temple" }
  ],
  // BHUTAN (Additional)
  "bhutan": [
    { name: "Punakha Dzong (Palace of Great Happiness)", cat: "Heritage & Dzong", coords: [27.5819, 89.8631], era: "Early Modern Era (1637 CE)", unesco: false, tagline: "Majestic fortress monastery standing at the confluence of the Pho Chhu and Mo Chhu rivers" },
    { name: "Thimphu Buddha Dordenma Colossus", cat: "Modern & Spiritual", coords: [27.4439, 89.6375], era: "Modern Heritage (2015 CE)", unesco: false, tagline: "51.5-meter bronze statue of Shakyamuni Buddha containing 125,000 smaller gilded Buddhas" },
    { name: "Phobjikha Valley Black-Necked Crane Reserve", cat: "Nature & Glacial", coords: [27.4667, 90.1833], era: "Modern Heritage", unesco: false, tagline: "Broad U-shaped glacial valley where endangered Tibetan black-necked cranes winter" },
    { name: "Bumthang Sacred Valleys & Kurjey Lhakhang", cat: "Spiritual & Valleys", coords: [27.5500, 90.7333], era: "Classical Era (8th Century CE)", unesco: false, tagline: "Spiritual heartland of Bhutan where Guru Rinpoche meditated, leaving his body print in rock" }
  ],
  // MALDIVES (Additional)
  "maldives": [
    { name: "Male City Grand Friday Mosque & Old Coral Mosque", cat: "Heritage & Spiritual", coords: [4.1755, 73.5131], era: "Early Modern Era (1658 CE)", unesco: false, tagline: "Intricately carved interlocking coral-stone walls with Arabic lacquer calligraphy and golden dome" },
    { name: "South Ari Atoll Whale Shark Marine Protected Area", cat: "Islands & Marine", coords: [3.5333, 72.8500], era: "Modern Heritage", unesco: false, tagline: "Year-round aggregation site where gentle giant whale sharks cruise crystalline coral reefs" },
    { name: "Vaadhoo Island Sea of Stars (Bioluminescent Beach)", cat: "Nature & Phenomenon", coords: [4.1167, 73.3833], era: "Modern Heritage", unesco: false, tagline: "Bioluminescent dinoflagellate phytoplankton illuminating breaking night waves with neon-blue starlight" },
    { name: "Addu Atoll British Coral Naval Base & Gan Island", cat: "Islands & History", coords: [-0.6333, 73.1500], era: "Modern Heritage", unesco: false, tagline: "Southernmost Maldives atoll with causeways linking four islands and WW2 coral shipwrecks" }
  ],
  // VIETNAM (Additional)
  "vietnam": [
    { name: "Hoi An Ancient Lantern Town (UNESCO)", cat: "Heritage & Merchant", coords: [15.8801, 108.3380], era: "Early Modern Era (15th – 19th Century)", unesco: true, tagline: "Preserved Southeast Asian trading port with yellow French shophouses, Japanese Bridge, and silk lanterns" },
    { name: "Phong Nha-Ke Bang Son Doong Cave Network", cat: "Nature & Geological", coords: [17.5333, 106.1500], era: "Modern Heritage", unesco: true, tagline: "World's largest cave passage by volume, with subterranean jungles, clouds, and 70m stalagmites" },
    { name: "Sa Pa Terraced Rice Highlands & Mount Fansipan", cat: "Nature & Highlands", coords: [22.3364, 103.8438], era: "Modern Heritage", unesco: false, tagline: "Cascading rice terraces carved by Hmong hill tribes beneath Indochina's highest summit (3,143m)" },
    { name: "Imperial City of Hue (Citadel & Perfume River)", cat: "Heritage & Imperial", coords: [16.4697, 107.5794], era: "Early Modern Era (Nguyen Dynasty, 1802 CE)", unesco: true, tagline: "Walled palace citadel with the Purple Forbidden City and royal dragon tombs of the Nguyen emperors" }
  ],
  // INDONESIA (Additional)
  "indonesia": [
    { name: "Bali Pura Ulun Danu Bratan & Ubud Monkey Forest", cat: "Heritage & Islands", coords: [-8.2750, 115.1667], era: "Early Modern Era (1633 CE)", unesco: false, tagline: "Iconic water temple appearing to float on Lake Bratan surrounded by volcanic mist and holy banyans" },
    { name: "Komodo Island & Pink Beach National Park", cat: "Nature & Wildlife", coords: [-8.5500, 119.4833], era: "Modern Heritage", unesco: true, tagline: "Habitat of the world's largest living lizard (Komodo Dragon) and rare red organ-pipe coral pink beaches" },
    { name: "Prambanan Hindu Temple Complex (Trimurti)", cat: "Heritage & Classical", coords: [-7.7520, 110.4914], era: "Classical Era (850 CE)", unesco: true, tagline: "47-meter soaring stone spires dedicated to Shiva, Brahma, and Vishnu decorated with Ramayana reliefs" },
    { name: "Raja Ampat Coral Archipelago (Misool & Wayag)", cat: "Islands & Marine", coords: [-0.5000, 130.5000], era: "Modern Heritage", unesco: false, tagline: "The global epicenter of marine biodiversity with mushroom-shaped karst islets and 1,500 fish species" }
  ],
  // CAMBODIA (Additional)
  "cambodia": [
    { name: "Bayon Temple (Smiling Stone Faces of Angkor)", cat: "Heritage & Classical", coords: [13.4414, 103.8587], era: "Classical Era (Khmer, 1190 CE)", unesco: true, tagline: "King Jayavarman VII's state temple featuring 216 giant smiling stone faces of Avalokiteshvara" },
    { name: "Ta Prohm (Tomb Raider Jungle Temple)", cat: "Heritage & Jungle", coords: [13.4347, 103.8892], era: "Classical Era (1186 CE)", unesco: true, tagline: "Atmospheric sandstone sanctuary swallowed by the muscular roots of giant silk-cotton trees" },
    { name: "Phnom Penh Royal Palace & Silver Pagoda", cat: "Heritage & Royal", coords: [11.5625, 104.9317], era: "Early Modern Era (1866 CE)", unesco: false, tagline: "Khmer royal compound with the Temple of the Emerald Buddha paved with 5,329 solid silver tiles" },
    { name: "Koh Rong Island Turquoise Coral Bays", cat: "Islands & Beaches", coords: [10.7167, 103.2333], era: "Modern Heritage", unesco: false, tagline: "28 white sand beaches, dense jungle interiors, and glowing phosphorescent night waters" }
  ],
  // THAILAND (Additional)
  "thailand": [
    { name: "Ayutthaya Kingdom & Wat Mahathat", cat: "Heritage & Medieval", coords: [14.3583, 100.5750], era: "Medieval Era (1374 CE)", unesco: true, tagline: "Historic island kingdom with red brick prangs and the famous sandstone Buddha head entwined in banyan roots" },
    { name: "Railay Beach & Krabi Limestone Karsts", cat: "Islands & Adventure", coords: [8.0117, 98.8378], era: "Modern Heritage", unesco: false, tagline: "Secluded peninsula accessible only by boat, framed by 200m vertical sea cliffs and Phra Nang Cave" }
  ],
  // TURKEY
  "turkey": [
    { name: "Hagia Sophia & Blue Mosque Sultanahmet", cat: "Heritage & Spiritual", coords: [41.0086, 28.9802], era: "Classical Era (Byzantine, 537 CE)", unesco: true, tagline: "1,500-year-old architectural triumph of Byzantine dome engineering and Ottoman minarets" },
    { name: "Cappadocia Fairy Chimneys & Goreme Valley", cat: "Nature & Geological", coords: [38.6431, 34.8289], era: "Classical Era", unesco: true, tagline: "Hundreds of sunrise hot air balloons rising above volcanic tuff cave dwellings" },
    { name: "Ephesus Ancient Greco-Roman City & Celsus Library", cat: "Archaeological", coords: [37.9408, 27.3414], era: "Ancient Era (Roman Empire, 100 CE)", unesco: true, tagline: "Monumental marble avenues, terrace houses, and the towering facade of the Library of Celsus" },
    { name: "Pamukkale Travertine Thermal Terraces & Hierapolis", cat: "Nature & Thermal", coords: [37.9250, 29.1208], era: "Ancient Era", unesco: true, tagline: "Snow-white petrified carbonate mineral cascades with warm turquoise thermal mineral pools" },
    { name: "Sumela Monastery (Black Sea Cliff Hermitage)", cat: "Heritage & Mountain", coords: [40.6900, 39.6583], era: "Medieval Era", unesco: false, tagline: "Greek Orthodox monastery clinging to a sheer cliff 1,200 meters above the Altindere Valley" }
  ],
  // JORDAN
  "jordan": [
    { name: "Petra Al-Khazneh Rose Treasury & Monastery", cat: "Heritage & Ancient", coords: [30.3285, 35.4444], era: "Ancient Era (Nabataean, 1st Century BCE)", unesco: true, virtualTourId: "tour-petra", tagline: "World Wonder carved into rose-red sandstone cliffs through the narrow gorge of the Siq" },
    { name: "Wadi Rum (Valley of the Moon & Bedouin Desert)", cat: "Nature & Desert", coords: [29.5736, 35.4194], era: "Ancient Era", unesco: true, tagline: "Martian landscape of granite monoliths, red dunes, and ancient Thamudic petroglyphs" },
    { name: "Dead Sea Lowest Elevation on Earth & Salt Formations", cat: "Nature & Wellness", coords: [31.5590, 35.4732], era: "Modern Heritage", unesco: false, tagline: "Float effortlessly on hyper-saline turquoise water 430 meters below global sea level" },
    { name: "Jerash Roman Decapolis Oval Forum", cat: "Archaeological", coords: [32.2806, 35.8917], era: "Ancient Era (Roman, 1st Century CE)", unesco: false, tagline: "One of the best preserved Roman provincial cities in the world with 56 Ionic colonnades" },
    { name: "Mount Nebo & Madaba Mosaic Map", cat: "Heritage & Spiritual", coords: [31.7675, 35.7253], era: "Classical Era (Byzantine, 6th Century CE)", unesco: false, tagline: "Vantage point of Moses over the Jordan Valley and 6th-century mosaic map of the Holy Land" }
  ],
  // OMAN
  "oman": [
    { name: "Sultan Qaboos Grand Mosque Muscat", cat: "Heritage & Spiritual", coords: [23.5839, 58.3886], era: "Modern Heritage", unesco: false, tagline: "Gleaming Indian sandstone mosque holding a 21-tonne hand-loomed Persian carpet and Swarovski chandelier" },
    { name: "Wahiba Sands (Sharqiya Golden Dunes)", cat: "Nature & Desert", coords: [22.5000, 58.7500], era: "Modern Heritage", unesco: false, tagline: "Rolling copper-orange desert dunes stretching 180 kilometers south to the Arabian Sea" },
    { name: "Nizwa Fort & Traditional Friday Goat Market", cat: "Heritage & Forts", coords: [22.9333, 57.5333], era: "Early Modern Era (Yaruba Dynasty, 1668 CE)", unesco: false, tagline: "Massive circular stone tower with cannon battlements guarding the ancient oasis capital" },
    { name: "Wadi Shab Emerald Canyon & Hidden Cave Waterfall", cat: "Nature & Adventure", coords: [22.8400, 59.2450], era: "Modern Heritage", unesco: false, tagline: "Hike through narrow limestone gorges and swim through a keyhole into a subterranean waterfall" },
    { name: "Jebel Akhdar (The Green Mountain Terraced Orchards)", cat: "Nature & Highlands", coords: [23.0667, 57.6667], era: "Modern Heritage", unesco: false, tagline: "2,000-meter limestone plateau famous for Damask rose water distilling and pomegranate terraces" }
  ],
  // QATAR
  "qatar": [
    { name: "Museum of Islamic Art Doha Corniche", cat: "Art & Architecture", coords: [25.2954, 51.5392], era: "Modern Heritage", unesco: false, tagline: "I.M. Pei's geometric cubist masterpiece housing 1,400 years of Islamic ceramic and manuscript treasures" },
    { name: "Souq Waqif Heritage Market & Falcon Hospital", cat: "Heritage & Culture", coords: [25.2867, 51.5333], era: "Early Modern Era", unesco: false, tagline: "Labyrinth of mud-rendered shophouses trading in saffron, frankincense, Arabic perfumes, and hunting falcons" },
    { name: "Khor Al Adaid (The Inland Sea)", cat: "Nature & Desert", coords: [24.6400, 51.3500], era: "Modern Heritage", unesco: true, tagline: "One of the few places on Earth where towering desert sand dunes plunge directly into turquoise seawater" },
    { name: "Katara Cultural Village & Greek Amphitheatre", cat: "Culture & Modern", coords: [25.3589, 51.5256], era: "Modern Heritage", unesco: false, tagline: "Waterfront cultural beacon featuring marble amphitheaters, Persian tile mosques, and art galleries" }
  ],
  // KUWAIT
  "kuwait": [
    { name: "Kuwait Towers & Arabian Gulf Promenade", cat: "Modern & Skyline", coords: [29.3897, 48.0033], era: "Modern Heritage", unesco: false, tagline: "Three iconic slender reinforced concrete needle towers clad with 55,000 enameled steel discs" },
    { name: "The Grand Mosque of Kuwait", cat: "Heritage & Spiritual", coords: [29.3789, 47.9753], era: "Modern Heritage", unesco: false, tagline: "Spanning 45,000 square meters with an Andalusian patterned dome and French stained glass" },
    { name: "Souk Al-Mubarakiya Historic Spice Market", cat: "Heritage & Bazaar", coords: [29.3778, 47.9739], era: "Early Modern Era (120 Years)", unesco: false, tagline: "Traditional market preserving pre-oil Kuwait with dates, dried limes, Persian carpets, and seafood" },
    { name: "Failaka Island Ancient Dilmun & Hellenistic Ruins", cat: "Archaeological", coords: [29.4333, 48.3333], era: "Ancient Era (Dilmun & Greek, 2000 BCE)", unesco: false, tagline: "Offshore island archaeological site preserving Bronze Age Dilmun seals and Alexander the Great's Ikaros garrison" }
  ],
  // BAHRAIN
  "bahrain": [
    { name: "Qal'at al-Bahrain (Ancient Dilmun Fort)", cat: "Archaeological", coords: [26.2339, 50.5206], era: "Ancient Era (Dilmun Civilization, 2300 BCE)", unesco: true, tagline: "UNESCO coastal artificial tell mound occupied continuously for 4,500 years crowned with a Portuguese sea fort" },
    { name: "Al Fateh Grand Mosque Manama", cat: "Heritage & Spiritual", coords: [26.2189, 50.5981], era: "Modern Heritage", unesco: false, tagline: "One of the world's largest fiberglass domes holding the National Library of Bahrain" },
    { name: "Tree of Life (Shajarat-al-Hayah Desert Wonder)", cat: "Nature & Mystery", coords: [25.9942, 50.5831], era: "Early Modern Era (400+ Years)", unesco: false, tagline: "400-year-old solitary green mesquite tree thriving atop a desolate sandhill with no known water source" },
    { name: "Bab Al Bahrain & Historic Pearling Path", cat: "Heritage & Maritime", coords: [26.2361, 50.5750], era: "Early Modern Era (UNESCO Pearling Trail)", unesco: true, tagline: "Gateway to the Manama Souq and memorial to Bahrain's millenia-old natural pearl diving heritage" }
  ],
  // LEBANON
  "lebanon": [
    { name: "Baalbek Roman Temple of Bacchus & Jupiter", cat: "Archaeological", coords: [34.0070, 36.2040], era: "Ancient Era (Roman Empire, 150 CE)", unesco: true, tagline: "The most colossal and best preserved Roman temple complex ever constructed, with 20m monolithic granite columns" },
    { name: "Jeita Grotto (Subterranean Limestone Caverns)", cat: "Nature & Geological", coords: [33.9436, 35.6419], era: "Modern Heritage", unesco: false, tagline: "9-kilometer network of two crystallized limestone caves featuring the world's largest known stalactite (8.2m)" },
    { name: "Byblos (Jbeil Ancient Phoenician Port)", cat: "Heritage & Maritime", coords: [34.1228, 35.6481], era: "Ancient Era (Phoenician, 5000 BCE)", unesco: true, tagline: "Oldest continuously inhabited city on Earth and birthplace of the linear Phoenician alphabet" },
    { name: "Cedars of God (Horsh Arz el-Rab Bcharre)", cat: "Nature & Forest", coords: [34.2436, 36.0483], era: "Ancient Era", unesco: true, tagline: "Ancient protected grove of sacred biblical cedar trees mentioned in the Epic of Gilgamesh" },
    { name: "Pigeon Rocks (Raouche) & Beirut Corniche", cat: "Coastal & City", coords: [33.8900, 35.4719], era: "Modern Heritage", unesco: false, tagline: "Natural 60-meter limestone sea arch sentinels rising from the Mediterranean at sunset" }
  ],
  // IRAN
  "iran": [
    { name: "Nasir al-Mulk (The Pink Mosque Shiraz)", cat: "Heritage & Spiritual", coords: [29.6083, 52.5539], era: "Early Modern Era (Qajar Era, 1888 CE)", unesco: false, tagline: "Stunning morning kaleidoscope of colored stained glass casting prismatic rainbows over Persian carpets" },
    { name: "Persepolis Ceremonial Capital of Achaemenid Empire", cat: "Archaeological", coords: [29.9358, 52.8914], era: "Ancient Era (Achaemenid Persian, 518 BCE)", unesco: true, tagline: "Colossal ceremonial terrace founded by Darius the Great featuring the Gate of All Nations and Apadana reliefs" },
    { name: "Naqsh-e Jahan Square & Shah Mosque Isfahan", cat: "Heritage & Imperial", coords: [32.6575, 51.6775], era: "Early Modern Era (Safavid Golden Age, 1629 CE)", unesco: true, tagline: "One of the largest public squares on Earth, surrounded by turquoise tiled mosques and the Grand Bazaar" },
    { name: "Yazd Historic Adobe Desert City & Windcatchers", cat: "Heritage & Desert", coords: [31.8974, 54.3675], era: "Medieval Era", unesco: true, tagline: "Preserved earthen clay desert city with ancient Badgir wind towers, subterranean Qanats, and Zoroastrian Fire Temples" },
    { name: "Golestan Palace Tehran (Qajar Royal Dynasty)", cat: "Palace & Art", coords: [35.6797, 51.4203], era: "Early Modern Era (18th Century)", unesco: true, tagline: "Lavish royal palace complex famous for the Marble Throne and Mirror Hall blending Persian and European art" }
  ],
  // IRAQ
  "iraq": [
    { name: "Ziggurat of Ur (Mesopotamian Sumerian Temple)", cat: "Archaeological", coords: [30.9628, 46.1031], era: "Ancient Era (Neo-Sumerian, 2100 BCE)", unesco: true, tagline: "Colossal stepped mudbrick pyramid built by King Ur-Nammu dedicated to the moon god Nanna" },
    { name: "Ancient Babylon & Ishtar Gate Processional Way", cat: "Archaeological", coords: [32.5422, 44.4211], era: "Ancient Era (Babylonian Empire, 575 BCE)", unesco: true, tagline: "Capital of King Nebuchadnezzar II featuring the blue glazed brick Ishtar Gate and site of the Hanging Gardens" },
    { name: "Erbil Citadel (Continuous 6,000-Year Settlement)", cat: "Heritage & Citadel", coords: [36.1911, 44.0092], era: "Ancient Era (6000 BCE)", unesco: true, tagline: "Ovoid fortified settlement resting on a 32-meter prehistoric tell overlooking the Kurdistan plains" },
    { name: "Great Mosque of Samarra Spiral Minaret (Malwiya)", cat: "Heritage & Medieval", coords: [34.2064, 43.8744], era: "Medieval Era (Abbasid Caliphate, 851 CE)", unesco: true, tagline: "Iconic 52-meter ascending spiral cone minaret constructed from baked brick by Caliph Al-Mutawakkil" },
    { name: "The Ahwar of Southern Iraq (Mesopotamian Marshes)", cat: "Nature & Culture", coords: [31.0000, 47.0000], era: "Ancient Era (Marsh Arab Culture)", unesco: true, tagline: "Sprawling wetland delta where indigenous Ma'dan Marsh Arabs live in arched reed houses called Mudhifs" }
  ],
  // ARMENIA
  "armenia": [
    { name: "Khor Virap Monastery & Mount Ararat", cat: "Heritage & Spiritual", coords: [39.8783, 44.5761], era: "Classical Era (642 CE)", unesco: false, tagline: "Iconic monastery framed by the snowbound dual peaks of biblical Mount Ararat" },
    { name: "Geghard Cave Monastery & Upper Azat Valley", cat: "Heritage & Rock-Cut", coords: [40.1406, 44.8186], era: "Classical Era (4th – 13th Century)", unesco: true, tagline: "UNESCO rock-cut medieval monastery carved directly into the sheer basalt cliffs of the gorge" },
    { name: "Lake Sevan High Alpine Jewel & Sevanavank", cat: "Nature & Lakes", coords: [40.5636, 44.9753], era: "Medieval Era", unesco: false, tagline: "One of the largest high-altitude freshwater lakes in the world at 1,900 meters elevation" },
    { name: "Tatev Monastery & Wings of Tatev Aerial Tramway", cat: "Heritage & Mountain", coords: [39.3792, 46.2503], era: "Medieval Era (9th Century)", unesco: false, tagline: "9th-century fortress monastery perched over the Vorotan Gorge reached by the world's longest reversible cable car (5.7km)" },
    { name: "Garni Greco-Roman Sun Temple", cat: "Archaeological", coords: [40.1122, 44.7297], era: "Ancient Era (1st Century CE)", unesco: false, tagline: "The only standing Greco-Roman colonnaded temple in Armenia and the former Soviet Union" }
  ],
  // AZERBAIJAN
  "azerbaijan": [
    { name: "Flame Towers & Baku Seaside Boulevard", cat: "Modern & Skyline", coords: [40.3597, 49.8258], era: "Modern Heritage", unesco: false, tagline: "Trio of curved glass flame-shaped skyscrapers illuminated as giant flickering LED torches over the Caspian Sea" },
    { name: "Gobustan Rock Art & Mud Volcanoes", cat: "Archaeological & Nature", coords: [40.1167, 49.3833], era: "Ancient Era (Prehistoric, 40,000 BCE)", unesco: true, tagline: "Over 6,000 petroglyphs and home to nearly half of all bubbling mud volcanoes on Earth" },
    { name: "Sheki Khan Palace (Shebeke Stained Glass)", cat: "Heritage & Imperial", coords: [41.2044, 47.1978], era: "Early Modern Era (1797 CE)", unesco: true, tagline: "Summer palace built without a single nail or drop of glue using intricate Shebeke wooden mosaic stained glass" },
    { name: "Ateshgah Fire Temple of Baku & Yanar Dag", cat: "Spiritual & Natural Fire", coords: [40.4156, 50.0089], era: "Early Modern Era", unesco: false, tagline: "Pentagonal castle courtyard where Zoroastrian and Hindu pilgrims worshipped natural underground gas flames" },
    { name: "Old City (Icherisheher) & Maiden Tower", cat: "Heritage & Medieval", coords: [40.3661, 49.8372], era: "Medieval Era (12th Century)", unesco: true, tagline: "Walled medieval heart of Baku with the 15th-century Palace of the Shirvanshahs and mysterious cylindrical Maiden Tower" }
  ],
  // GEORGIA
  "georgia": [
    { name: "Gergeti Trinity Church Mount Kazbegi", cat: "Heritage & Mountain", coords: [42.6625, 44.6150], era: "Medieval Era (14th Century)", unesco: false, tagline: "14th-century stone church isolated at 2,170m beneath the 5,047m snowbound volcano of Mount Kazbek" },
    { name: "Old Tbilisi Sulfur Baths & Narikala Fortress", cat: "Heritage & City", coords: [41.6881, 44.8089], era: "Medieval Era", unesco: false, tagline: "Brick dome natural sulfur bathhouses and cliffside pastel wooden balconies overlooked by Narikala Fortress" },
    { name: "Uplistsikhe Ancient Rock-Cut Silk Road Town", cat: "Archaeological", coords: [41.9672, 44.2094], era: "Ancient Era (Early Iron Age, 1000 BCE)", unesco: false, tagline: "Sprawling prehistoric rock-cut settlement with pagan altars, pharmacy, and wine presses carved into sandstone" },
    { name: "Svaneti Defensive Towers (Mestia & Ushguli)", cat: "Heritage & Mountain", coords: [43.0442, 42.7294], era: "Medieval Era (9th – 12th Century)", unesco: true, tagline: "Europe's highest continuously inhabited mountain villages defended by hundreds of medieval stone watchtowers" },
    { name: "Sighnaghi City of Love & Kakheti Wine Cradle", cat: "Heritage & Wine", coords: [41.6167, 45.9167], era: "Early Modern Era (18th Century)", unesco: false, tagline: "Walled royal town overlooking the Alazani Valley where wine has been fermented in clay Qvevri for 8,000 years" }
  ],
  // KAZAKHSTAN
  "kazakhstan": [
    { name: "Charyn Canyon (Valley of Castles)", cat: "Nature & Geological", coords: [43.3500, 79.0833], era: "Modern Heritage", unesco: false, tagline: "Kazakhstan's grand red sandstone canyon stretching 154 kilometers carved by the rushing Charyn River" },
    { name: "Kaindy Lake (Sunken Birch Forest & Kolsai)", cat: "Nature & Lakes", coords: [42.9833, 78.4667], era: "Modern Heritage", unesco: false, tagline: "Ghostly submerged spruce trunks preserved in turquoise mountain waters created by a 1911 earthquake" },
    { name: "Medeu High-Altitude Rink & Shymbulak Ski Resort", cat: "Nature & Sports", coords: [43.1583, 77.0583], era: "Modern Heritage", unesco: false, tagline: "World's highest outdoor Olympic speed skating rink located at 1,691m in the Tian Shan mountains" },
    { name: "Baiterek Monument & Astana Futurist Capital", cat: "Modern & Architecture", coords: [51.1283, 71.4306], era: "Modern Heritage", unesco: false, tagline: "Norman Foster designed pyramid of peace and 105-meter golden globe tower symbolizing the mythical tree of life" },
    { name: "Mausoleum of Khoja Ahmed Yasawi Turkistan", cat: "Heritage & Medieval", coords: [43.2975, 68.2708], era: "Medieval Era (Timurid, 1389 CE)", unesco: true, tagline: "Monumental tiled Sufi mausoleum commissioned by Timur, boasting the largest brick dome in Central Asia" }
  ],
  // KYRGYZSTAN
  "kyrgyzstan": [
    { name: "Issyk-Kul Lake (Warm Alpine Pearl of Central Asia)", cat: "Nature & Lakes", coords: [42.4500, 77.2500], era: "Modern Heritage", unesco: false, tagline: "Second-largest alpine lake in the world, flanked by the snow-capped Tian Shan mountains and never freezes" },
    { name: "Ala Archa National Park Glacier Canyon", cat: "Nature & Trekking", coords: [42.5667, 74.4833], era: "Modern Heritage", unesco: false, tagline: "Spectacular alpine gorge with 50 mountain peaks and tumbling glaciers just 40km from Bishkek" },
    { name: "Song-Kul High Mountain Pasture & Nomad Yurts", cat: "Culture & Nomadic", coords: [41.8333, 75.1500], era: "Modern Heritage", unesco: false, tagline: "Alpine lake at 3,016m where Kyrgyz semi-nomads graze herds of horses and live in felt yurt encampments" },
    { name: "Tash Rabat Ancient Silk Road Stone Caravanserai", cat: "Heritage & Silk Road", coords: [41.0889, 75.2917], era: "Medieval Era (15th Century)", unesco: false, tagline: "Fortified 31-room stone inn tucked into a canyon at 3,200m that sheltered merchant caravans on the road to China" },
    { name: "Sulaiman-Too Sacred Mountain Osh", cat: "Spiritual & Ancient", coords: [40.5292, 72.7847], era: "Ancient Era", unesco: true, tagline: "Sacred five-peaked mountain venerated for millennia by Silk Road travelers overlooking the Fergana Valley" }
  ],
  // TAJIKISTAN
  "tajikistan": [
    { name: "Pamir Highway (M41 Roof of the World Road Trip)", cat: "Adventure & Highlands", coords: [38.5000, 73.0000], era: "Modern Heritage", unesco: false, tagline: "Second-highest international highway in the world passing through Ak-Baital Pass at 4,655m" },
    { name: "Iskanderkul Alpine Lake of Alexander the Great", cat: "Nature & Lakes", coords: [39.0750, 68.3667], era: "Ancient Era", unesco: false, tagline: "Triangular turquoise glacial lake in the Fann Mountains named after Alexander the Great" },
    { name: "Fann Mountains & Seven Lakes (Haft Kul)", cat: "Nature & Trekking", coords: [39.2000, 67.7500], era: "Modern Heritage", unesco: false, tagline: "Chain of seven cascading alpine lakes that change color from indigo to emerald as sunlight shifts" },
    { name: "Wakhan Corridor & Yamchun Silk Road Fortress", cat: "Heritage & Border", coords: [36.9500, 72.3000], era: "Ancient Era (Kushan Empire, 3rd Century BCE)", unesco: false, tagline: "Stone fortress towers guarding the Hindu Kush border with hot springs and views into Afghanistan" },
    { name: "Khujand Ancient Citadel & Panjshanbe Bazaar", cat: "Heritage & Silk Road", coords: [40.2833, 69.6167], era: "Ancient Era (Alexandria Eschate, 329 BCE)", unesco: false, tagline: "Founded by Alexander the Great along the Syr Darya River, home to one of Central Asia's liveliest neoclassical bazaars" }
  ],
  // TURKMENISTAN
  "turkmenistan": [
    { name: "Darvaza Gas Crater (The Door to Hell)", cat: "Nature & Phenomenon", coords: [40.2522, 58.4397], era: "Modern Heritage", unesco: false, tagline: "70-meter wide burning natural gas crater glowing fiercely in the center of the Karakum Desert since 1971" },
    { name: "Ashgabat White Marble Capital of World Records", cat: "Modern & Architecture", coords: [37.9500, 58.3833], era: "Modern Heritage", unesco: false, tagline: "Guinness Record city boasting the world's highest density of white Italian marble-clad buildings and golden statues" },
    { name: "Ancient Merv (UNESCO Silk Road Metropolis)", cat: "Archaeological", coords: [37.6667, 62.1833], era: "Ancient & Medieval Era (12th Century CE)", unesco: true, tagline: "Once one of the largest cities in the world before Mongol conquest, featuring the Mausoleum of Sultan Sanjar" },
    { name: "Kunya-Urgench Khwarazmian Ancient Minarets", cat: "Heritage & Medieval", coords: [42.3000, 59.1500], era: "Medieval Era (11th – 16th Century)", unesco: true, tagline: "Preserved 60-meter Kutlug Timur minaret and turquoise-domed mausoleums of the Khwarazmian Empire" }
  ],
  // RUSSIA (SIBERIA & FAR EAST)
  "russia": [
    { name: "Lake Baikal Blue Ice & Olkhon Island", cat: "Nature & Lakes", coords: [53.1972, 107.3389], era: "Modern Heritage", unesco: true, tagline: "Deepest (1,642m) and oldest lake on Earth, famous for mirror-clear meter-thick winter turquoise ice" },
    { name: "Kamchatka Volcanoes & Valley of Geysers", cat: "Nature & Volcanic", coords: [55.9778, 160.5861], era: "Modern Heritage", unesco: true, tagline: "Over 300 volcanoes including active snow-capped stratovolcanoes and boiling hydrothermal geyser basins" },
    { name: "Altai Golden Mountains & Mount Belukha", cat: "Nature & Mountains", coords: [49.8000, 86.5833], era: "Modern Heritage", unesco: true, tagline: "Sacred 4,506m twin-peaked mountain considered the cosmic axis and mythological Shambhala of Eurasia" },
    { name: "Lena Pillars Natural Stone Colonnade (Yakutia)", cat: "Nature & Geological", coords: [61.1167, 127.5833], era: "Modern Heritage", unesco: true, tagline: "Colossal 150-meter vertical limestone rock pillars lining the banks of the Lena River in frozen Eastern Siberia" },
    { name: "Vladivostok Golden Horn Bay Pacific Gateway", cat: "Coastal & Maritime", coords: [43.1155, 131.8855], era: "Modern Heritage", unesco: false, tagline: "Terminal station of the Trans-Siberian Railway and iconic Golden Horn cable-stayed suspension bridge" }
  ],
  // SYRIA
  "syria": [
    { name: "Ancient Palmyra Queen Zenobia Roman Colonades", cat: "Archaeological", coords: [34.5500, 38.2667], era: "Ancient Era (1st – 2nd Century CE)", unesco: true, tagline: "Oasis city of monumental Roman colonnades, the Temple of Bel, and the ancient desert kingdom of Queen Zenobia" },
    { name: "Umayyad Mosque & Old Damascus Citadel", cat: "Heritage & Spiritual", coords: [33.5119, 36.3067], era: "Medieval Era (Umayyad Caliphate, 715 CE)", unesco: true, tagline: "One of the oldest and largest mosques in the world featuring gold mosaic Byzantine landscapes and the tomb of Saladin" },
    { name: "Krak des Chevaliers Crusader Castle Fortress", cat: "Heritage & Medieval", coords: [34.7567, 36.2944], era: "Medieval Era (12th Century CE)", unesco: true, tagline: "The archetypal concentric medieval Crusader fortress perched high on a 650m limestone spur in the Homs Gap" },
    { name: "Ancient City of Aleppo & Citadel", cat: "Heritage & Citadel", coords: [36.1992, 37.1628], era: "Medieval Era", unesco: true, tagline: "Vast 13th-century limestone palace fortress standing on a natural hill rising over ancient Silk Road covered souqs" },
    { name: "Bosra Roman Theatre Black Basalt Amphitheatre", cat: "Archaeological", coords: [32.5186, 36.4817], era: "Ancient Era (2nd Century CE)", unesco: true, tagline: "Magnificently preserved 15,000-seat Roman amphitheater built entirely from local black volcanic basalt stone" }
  ],
  // YEMEN
  "yemen": [
    { name: "Shibam (Manhattan of the Desert 500-Year Mud Skyscrapers)", cat: "Heritage & Architecture", coords: [15.9261, 48.6272], era: "Early Modern Era (16th Century)", unesco: true, tagline: "World's oldest vertical high-rise city consisting of 500 multi-story mudbrick tower houses up to 11 floors high" },
    { name: "Socotra Island Dragon's Blood Tree Alien Biosphere", cat: "Nature & Islands", coords: [12.4634, 53.8237], era: "Modern Heritage", unesco: true, tagline: "Isolated island where 37% of plant species exist nowhere else on Earth, famous for umbrella-shaped Dragon's Blood trees" },
    { name: "Old Walled City of Sana'a Gingerbread Architecture", cat: "Heritage & Architecture", coords: [15.3547, 44.2158], era: "Medieval Era", unesco: true, tagline: "Inhabited for over 2,500 years, featuring distinctive multi-story rammed earth houses adorned with white gypsum arabesques" },
    { name: "Dar al-Hajar (Rock Palace of Wadi Dhahr)", cat: "Heritage & Palace", coords: [15.4417, 44.1306], era: "Early Modern Era (1930s)", unesco: false, tagline: "Iconic Yemeni royal summer retreat built dramatically atop a natural freestanding rock pinnacle" },
    { name: "Kawkaban Mountain Fortress & Thula", cat: "Heritage & Forts", coords: [15.5000, 43.9000], era: "Medieval Era", unesco: false, tagline: "Fortress town perched on sheer vertical cliff tops 2,800m high with ancient stone cisterns and paved tracks" }
  ],
  // ISRAEL
  "israel": [
    { name: "Old City of Jerusalem (Western Wall & Mount Zion)", cat: "Heritage & Spiritual", coords: [31.7767, 35.2345], era: "Ancient Era", unesco: true, tagline: "Millennia of sacred history encompassing the Western Wall, Church of the Holy Sepulchre, and Dome of the Rock" },
    { name: "Tel Aviv White City Bauhaus & Mediterranean Coast", cat: "Modern & Architecture", coords: [32.0853, 34.7818], era: "Modern Heritage (UNESCO Bauhaus)", unesco: true, tagline: "World's largest concentration of 1930s modernist Bauhaus architecture alongside Mediterranean sandy beaches" },
    { name: "Masada Dead Sea Cliff Fortress & Herodian Palace", cat: "Archaeological", coords: [31.3153, 35.3539], era: "Ancient Era (Herodian, 30 BCE)", unesco: true, tagline: "Ancient King Herod's palace citadel perched atop an isolated rock plateau overlooking the Dead Sea" },
    { name: "Bahai Gardens & Golden Dome Mount Carmel Haifa", cat: "Heritage & Gardens", coords: [32.8139, 34.9872], era: "Modern Heritage", unesco: true, tagline: "Nineteen terraced gardens cascading down the slope of Mount Carmel toward the Mediterranean Sea" },
    { name: "Sea of Galilee & Ancient Capernaum", cat: "Heritage & Lakes", coords: [32.8256, 35.5317], era: "Ancient Era", unesco: false, tagline: "Freshwater biblical lake encircled by hot springs, eucalyptus trees, and basalt Roman synagogue ruins" }
  ],
  // PALESTINE
  "palestine": [
    { name: "Church of the Nativity & Manger Square Bethlehem", cat: "Heritage & Spiritual", coords: [31.7044, 35.2075], era: "Classical Era (Byzantine, 565 CE)", unesco: true, tagline: "One of the oldest continuously operating Christian churches built over the grotto where Jesus was born" },
    { name: "Old City of Hebron (Al-Khalil) & Ibrahimi Mosque", cat: "Heritage & Spiritual", coords: [31.5247, 35.1108], era: "Ancient & Medieval Era", unesco: true, tagline: "Herodian limestone masonry compound enshrining the Tombs of the Patriarchs (Abraham, Sarah, Isaac)" },
    { name: "Jericho Ancient Oasis & Mount of Temptation", cat: "Archaeological", coords: [31.8667, 35.4500], era: "Ancient Era (10,000 BCE)", unesco: false, tagline: "Recognized as the oldest continually inhabited city on Earth, with Greek Orthodox monastery clinging to cliffs" },
    { name: "Nablus Old City & Khan al-Tujjar Spice Souq", cat: "Heritage & Culture", coords: [32.2211, 35.2608], era: "Medieval Era", unesco: false, tagline: "Famous for traditional olive oil soap factories, historic Turkish baths, and mouthwatering hot Knafeh pastry" }
  ]
};

// Generate standardized destinations for all items in masterCountryDestinations
let generatedDestinations = [];

Object.entries(masterCountryDestinations).forEach(([cId, items]) => {
  const countryObj = updatedCountries.find(c => c.id === cId);
  if (!countryObj) return;

  items.forEach((item, idx) => {
    generatedDestinations.push({
      id: `${cId}-${idx + 1}`,
      name: item.name,
      country: countryObj.name,
      countryCode: countryObj.code,
      countryId: countryObj.id,
      regionId: `${countryObj.id}-region`,
      regionName: countryObj.name,
      category: item.cat,
      coordinates: item.coords,
      tagline: item.tagline,
      description: `${item.name} is a renowned sanctuary in ${countryObj.name} celebrated for its architectural beauty, deep history, and natural grandeur.`,
      heroMedia: {
        type: "image",
        url: countryPhotos[countryObj.id] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75"
      },
      gallery: [
        countryPhotos[countryObj.id] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=75"
      ],
      whyVisit: `To witness the timeless heritage, stunning architecture, and local traditions of ${item.name}.`,
      bestTime: "October to March",
      crowdPrediction: {
        level: "Moderate & Pleasant",
        statusColor: "text-emerald-400",
        score: 42,
        factors: "Seasonal travelers and cultural preservation visitors"
      },
      estimatedBudget: {
        budget: "$35 - $80 / day",
        moderate: "$90 - $180 / day",
        luxury: "$250 - $650 / day",
        currency: countryObj.currency || "USD"
      },
      journeyScore: {
        total: 94 + (idx % 5),
        weather: 92,
        heritage: 96,
        culture: 94,
        accessibility: 90,
        budget: 88
      },
      transportation: {
        nearestAirport: `${countryObj.capital} International Airport (${countryObj.code})`,
        localTransit: "Metro, express rail, air-conditioned coaches, and guided river cruises",
        tips: "Book entry tickets in advance during morning golden hour for optimal photography."
      },
      placesInside: [
        {
          id: `${cId}-${idx+1}-p1`,
          name: "Main Sacred Sanctuary & Inner Courtyard",
          category: "Historical Core",
          coordinates: [item.coords[0] + 0.001, item.coords[1] + 0.001],
          description: "The principal sacred complex featuring hand-carved pillars and ceremonial courtyards.",
          timeToSpend: "1.5 hours",
          photo: countryPhotos[countryObj.id],
          tips: "Photography permitted without flash. Respect sacred boundaries."
        },
        {
          id: `${cId}-${idx+1}-p2`,
          name: "Scenic Panoramic Lookout Point",
          category: "Lookout Viewpoint",
          coordinates: [item.coords[0] - 0.001, item.coords[1] + 0.002],
          description: "Elevated vantage point offering 360-degree vistas of the landscape and surrounding monuments.",
          timeToSpend: "1 hour",
          photo: countryPhotos[countryObj.id],
          tips: "Best enjoyed during sunrise or late afternoon golden hour."
        }
      ],
      localGuide: {
        transitOptions: `Short 25-minute taxi or regional express transit from ${countryObj.capital}.`,
        nearbyHotels: [
          {
            name: `${item.name.split(' ')[0]} Heritage Grand Hotel`,
            priceCategory: "Boutique Heritage",
            distance: "0.8 km from center",
            rating: 4.8,
            facilities: ["Courtyard Dining", "Airport Shuttle", "Rooftop Terrace"],
            samplePrice: "$85/night"
          },
          {
            name: "The Silk Road Residency",
            priceCategory: "Modern Comfort",
            distance: "1.5 km",
            rating: 4.7,
            facilities: ["Free Wi-Fi", "Continental Breakfast", "Guided Tours"],
            samplePrice: "$55/night"
          }
        ],
        nearbyRestaurants: [
          {
            name: "Saffron & Spice Pavilions",
            cuisine: "Authentic Regional Cuisine",
            priceLevel: "Moderate",
            popularDishes: ["Traditional Spiced Rice", "Grilled Local Skewers", "Cardamom Tea"]
          }
        ],
        mustTryFood: ["Generational Regional Breads", "Claypot Stews", "Fresh Seasonal Sweets"]
      },
      transportComparison: [
        { mode: "High-Speed Rail / Express Train", costRange: "$15 - $35", duration: "1.5 hrs", comfort: "Very High" },
        { mode: "Chauffeured Private Taxi / Ride", costRange: "$30 - $65", duration: "1.2 hrs", comfort: "Ultimate Private" },
        { mode: "Air-Conditioned Public Coach", costRange: "$5 - $12", duration: "2.5 hrs", comfort: "Moderate" }
      ],
      heritageInfo: {
        era: item.era,
        historicalEra: item.era.includes('Ancient') ? 'Ancient Era' : 
                       item.era.includes('Classical') ? 'Classical Era' :
                       item.era.includes('Medieval') ? 'Medieval Era' :
                       item.era.includes('Early Modern') ? 'Early Modern Era' : 'Modern Heritage',
        architecture: "Monolithic Stone & Classical Dynastic Masonry",
        unesco: item.unesco !== false,
        significance: `${item.name} is a designated heritage treasure representing pivotal civilizational achievements in ${countryObj.name}.`
      },
      weatherByMonth: create12MonthWeather(26, ['uae','saudi-arabia','qatar','kuwait','bahrain','oman','jordan','iraq','iran'].includes(cId), false),
      weatherAlerts: {
        hasAlert: false,
        condition: "Clear Sky & Gentle Breeze",
        advisory: "Ideal outdoor walking visibility.",
        indoorAlternatives: ["National Museum & Royal Art Gallery"]
      },
      festivals: [
        {
          name: `Annual Cultural Festival of ${item.name.split(' ')[0]}`,
          timing: "November / March",
          desc: "Traditional lantern parades, cultural folk dances, and sacred ceremonies."
        }
      ],
      virtualTourId: item.virtualTourId || null,
      isHiddenGem: idx >= 3
    });
  });
});

console.log("Generated destinations count from master catalogue:", generatedDestinations.length);

// Also load the previously generated curated additions (Myanmar, South Korea, etc.)
const { curatedAdditions: firstBatch } = require('./enrichCompleteDatabase');
firstBatch.forEach((item, idx) => {
  const countryObj = updatedCountries.find(c => c.id === item.countryId);
  if (!countryObj) return;

  generatedDestinations.push({
    id: item.id,
    name: item.name,
    country: countryObj.name,
    countryCode: countryObj.code,
    countryId: countryObj.id,
    regionId: `${countryObj.id}-region`,
    regionName: countryObj.name,
    category: item.category,
    coordinates: item.coordinates,
    tagline: item.tagline,
    description: item.tagline,
    heroMedia: {
      type: "image",
      url: item.photo,
      poster: item.photo
    },
    gallery: [item.photo, "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=75"],
    whyVisit: item.tagline,
    bestTime: "October to March",
    crowdPrediction: {
      level: "Moderate & Serene",
      statusColor: "text-emerald-400",
      score: 40,
      factors: "Cultural heritage zone preservation"
    },
    estimatedBudget: {
      budget: "$30 - $70 / day",
      moderate: "$80 - $160 / day",
      luxury: "$220 - $550 / day",
      currency: countryObj.currency || "USD"
    },
    journeyScore: { total: 95, weather: 92, heritage: 97, culture: 96, accessibility: 88, budget: 90 },
    transportation: {
      nearestAirport: `${countryObj.capital} Airport (${countryObj.code})`,
      localTransit: "Rail, taxi, buses",
      tips: "Morning hours recommended."
    },
    placesInside: item.places.map((p, pIdx) => ({
      id: `${item.id}-p${pIdx + 1}`,
      name: p.name,
      category: p.cat,
      coordinates: p.coords,
      description: p.desc,
      timeToSpend: p.time,
      photo: item.photo,
      tips: "Respect cultural traditions."
    })),
    localGuide: {
      transitOptions: "Local transport available.",
      nearbyHotels: [{ name: `${item.name.split(' ')[0]} Heritage Retreat`, priceCategory: "Boutique", distance: "1 km", rating: 4.8, facilities: ["Breakfast", "Wi-Fi"], samplePrice: "$75/night" }],
      nearbyRestaurants: [{ name: "Local Traditional Eatery", cuisine: "Authentic Regional", priceLevel: "Moderate", popularDishes: ["Claypot Rice", "Regional Soup"] }],
      mustTryFood: ["Traditional Curries", "Fresh Artisan Breads"]
    },
    transportComparison: [
      { mode: "Express Train", costRange: "$10 - $25", duration: "1.5 hrs", comfort: "High" },
      { mode: "Taxi", costRange: "$25 - $50", duration: "1 hr", comfort: "Private" }
    ],
    heritageInfo: {
      era: item.era,
      historicalEra: item.historicalEra,
      architecture: "Classical Heritage Masonry",
      unesco: item.unesco,
      significance: item.tagline
    },
    weatherByMonth: create12MonthWeather(26, false, true),
    weatherAlerts: { hasAlert: false, condition: "Pleasant", advisory: "Great visibility.", indoorAlternatives: ["Museum"] },
    festivals: [{ name: "Traditional Festival", timing: "Spring", desc: "Local cultural celebrations." }],
    virtualTourId: item.virtualTourId || null,
    isHiddenGem: false
  });
});

console.log("Combined total generated destinations:", generatedDestinations.length);

// Merge with existing destinations, avoiding duplicates by id
const allDestinationsMap = new Map();
existingDestinations.forEach(d => allDestinationsMap.set(d.id, d));
generatedDestinations.forEach(d => allDestinationsMap.set(d.id, d));
const finalDestinations = Array.from(allDestinationsMap.values());

console.log("Total unique destinations in final dataset:", finalDestinations.length);

// Build rich Heritage Sites across all 5 Historical Eras (~50 world heritage sites)
const comprehensiveHeritageSites = [
  // ANCIENT ERA (BCE – 500 CE)
  {
    id: "ancient-mohenjo-daro",
    name: "Mohenjo-daro & Harappan Metropolises",
    country: "Pakistan",
    era: "Ancient Era",
    timeline: "2500 BCE – 1700 BCE",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    significance: "One of the earliest and most sophisticated planned Bronze Age urban settlements in human history.",
    architecture: "Kiln-fired terracotta bricks, grid urban layout, covered drains, and the Great Bath.",
    unesco: true
  },
  {
    id: "ancient-petra",
    name: "Petra Al-Khazneh (The Rose City)",
    country: "Jordan",
    era: "Ancient Era",
    timeline: "312 BCE – 106 CE",
    image: "https://images.unsplash.com/photo-1579606032834-de00b1a0e5a6?auto=format&fit=crop&w=1200&q=75",
    significance: "Hellenistic rock-cut tomb facades sculpted by the Nabataeans directly into rose-red desert canyon walls.",
    architecture: "Corinthian sandstone rock-cut architecture.",
    unesco: true
  },
  {
    id: "ancient-persepolis",
    name: "Persepolis (Takht-e Jamshid)",
    country: "Iran",
    era: "Ancient Era",
    timeline: "518 BCE – 330 BCE",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=75",
    significance: "Ceremonial capital of Darius the Great and the Achaemenid Empire.",
    architecture: "Apadana monumental palace terrace and Gate of All Nations with winged lamassu.",
    unesco: true
  },
  {
    id: "ancient-ziggurat-ur",
    name: "Great Ziggurat of Ur",
    country: "Iraq",
    era: "Ancient Era",
    timeline: "2100 BCE",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=75",
    significance: "Massive Sumerian stepped pyramid dedicated to the moon god Nanna.",
    architecture: "Mudbrick core with baked brick exterior set in bitumen mortar.",
    unesco: true
  },
  {
    id: "ancient-sigiriya",
    name: "Sigiriya Lion Rock Sky Fortress",
    country: "Sri Lanka",
    era: "Ancient Era",
    timeline: "477 CE – 495 CE",
    image: "https://images.unsplash.com/photo-1588598136853-a66986fc035a?auto=format&fit=crop&w=1200&q=75",
    significance: "King Kashyapa's royal citadel crowning a sheer 200m volcanic rock plug.",
    architecture: "Monolithic carved lion paws, mirror wall, and hydraulic water gardens.",
    unesco: true
  },
  {
    id: "ancient-taxila",
    name: "Taxila Ancient Buddhist Academy",
    country: "Pakistan",
    era: "Ancient Era",
    timeline: "600 BCE – 500 CE",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    significance: "Silk Road crossroads of Greco-Buddhist art and premier intellectual hub.",
    architecture: "Ashokan stone stupas and Hellenistic Greek drapery reliefs.",
    unesco: true
  },

  // CLASSICAL ERA (500 CE – 1200 CE)
  {
    id: "classical-angkor-wat",
    name: "Angkor Wat & Bayon Temples",
    country: "Cambodia",
    era: "Classical Era",
    timeline: "1113 CE – 1150 CE",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    significance: "The world's largest religious monument, symbolizing Mount Meru.",
    architecture: "Sandstone concentric galleries, lotus towers, and moat.",
    unesco: true
  },
  {
    id: "classical-borobudur",
    name: "Borobudur Mahayana Temple",
    country: "Indonesia",
    era: "Classical Era",
    timeline: "778 CE – 850 CE",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    significance: "World's largest Buddhist temple with 72 perforated stupas.",
    architecture: "2 million volcanic andesite stone blocks on a stepped pyramid.",
    unesco: true
  },
  {
    id: "classical-bagan",
    name: "Bagan Plain of Pagodas",
    country: "Myanmar",
    era: "Classical Era",
    timeline: "849 CE – 1287 CE",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75",
    significance: "Capital of the Pagan Kingdom with over 2,200 surviving brick temples.",
    architecture: "Mon-style vaulted brick halls and gilded bell-shaped stupas.",
    unesco: true
  },
  {
    id: "classical-brihadeeswarar",
    name: "Brihadeeswarar Temple Thanjavur",
    country: "India",
    era: "Classical Era",
    timeline: "1010 CE",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75",
    significance: "Rajaraja Chola I's supreme Dravidian granite temple.",
    architecture: "Vimana tower capped with an 80-tonne monolithic granite cupola.",
    unesco: true
  },
  {
    id: "classical-hagia-sophia",
    name: "Hagia Sophia (Holy Wisdom of Constantinople)",
    country: "Türkiye",
    era: "Classical Era",
    timeline: "537 CE",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=75",
    significance: "Supreme Byzantine cathedral crowned with a floating pendentive dome.",
    architecture: "Pendentive dome, gold mosaic angels, and marble revetments.",
    unesco: true
  },
  {
    id: "classical-prambanan",
    name: "Prambanan Hindu Sanctuaries",
    country: "Indonesia",
    era: "Classical Era",
    timeline: "850 CE",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=75",
    significance: "Tallest Hindu temple compound in Indonesia dedicated to the Trimurti.",
    architecture: "47-meter towering spire decorated with Ramayana stone reliefs.",
    unesco: true
  },

  // MEDIEVAL ERA (1200 CE – 1600 CE)
  {
    id: "medieval-registan",
    name: "Registan Square Samarkand",
    country: "Uzbekistan",
    era: "Medieval Era",
    timeline: "1417 CE – 1660 CE",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=75",
    significance: "The centerpiece of the Timurid Renaissance on the Silk Road.",
    architecture: "Colossal pishtaq portals with azure majolica and gold arabesques.",
    unesco: true
  },
  {
    id: "medieval-forbidden-city",
    name: "Forbidden City Imperial Palace Beijing",
    country: "China",
    era: "Medieval Era",
    timeline: "1406 CE – 1420 CE",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75",
    significance: "Seat of Ming and Qing emperors comprising 980 buildings.",
    architecture: "Yellow glazed ceramic roofs and lacquered Phoebe zhennan timber columns.",
    unesco: true
  },
  {
    id: "medieval-qutub-minar",
    name: "Qutub Minar Victory Tower Delhi",
    country: "India",
    era: "Medieval Era",
    timeline: "1192 CE – 1220 CE",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    significance: "Tallest brick minaret in the world (72.5m) of the Delhi Sultanate.",
    architecture: "Fluted red sandstone with Kufic calligraphy and stalactite corbels.",
    unesco: true
  },
  {
    id: "medieval-kinkaku-ji",
    name: "Kinkaku-ji (The Golden Pavilion Kyoto)",
    country: "Japan",
    era: "Medieval Era",
    timeline: "1397 CE",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=75",
    significance: "Ashikaga shogunate Zen villa coated in pure gold leaf over Mirror Pond.",
    architecture: "Muromachi Zen, Shinden, and Bukke style synthesis.",
    unesco: true
  },
  {
    id: "medieval-ayutthaya",
    name: "Ayutthaya Kingdom & Wat Chaiwatthanaram",
    country: "Thailand",
    era: "Medieval Era",
    timeline: "1350 CE – 1767 CE",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
    significance: "Cosmopolitan island capital of Siam with hundreds of red brick prangs.",
    architecture: "Khmer-influenced prangs and terracotta Buddha statues.",
    unesco: true
  },

  // EARLY MODERN ERA (1600 CE – 1900 CE)
  {
    id: "early-taj-mahal",
    name: "The Taj Mahal & Agra Fort",
    country: "India",
    era: "Early Modern Era",
    timeline: "1632 CE – 1653 CE",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=75",
    significance: "Shah Jahan's white marble mausoleum for Mumtaz Mahal.",
    architecture: "Pietra dura gem inlays into Makrana white marble with Charbagh.",
    unesco: true
  },
  {
    id: "early-gyeongbokgung",
    name: "Gyeongbokgung Palace & Gyeonghoeru Pavilion",
    country: "South Korea",
    era: "Early Modern Era",
    timeline: "1395 CE (Rebuilt 1867 CE)",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=75",
    significance: "Principal palace of the Joseon Dynasty framed by Mount Bugak.",
    architecture: "Two-tiered wooden halls and granite island banquet pavilions.",
    unesco: false
  },
  {
    id: "early-naqsh-e-jahan",
    name: "Naqsh-e Jahan & Shah Mosque Isfahan",
    country: "Iran",
    era: "Early Modern Era",
    timeline: "1598 CE – 1629 CE",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=75",
    significance: "Shah Abbas I's monumental Safavid capital with acoustic turquoise dome.",
    architecture: "Seven-color polychrome haft-rangi tiles and soaring minarets.",
    unesco: true
  },
  {
    id: "early-nikko-toshogu",
    name: "Nikko Toshogu Shrine (Edo Shogunate)",
    country: "Japan",
    era: "Early Modern Era",
    timeline: "1617 CE – 1636 CE",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=75",
    significance: "Mausoleum of Tokugawa Ieyasu, founder of the Edo Shogunate.",
    architecture: "Gilded Yomeimon Gate with 500 wood carvings of dragons and sages.",
    unesco: true
  },
  {
    id: "early-shibam",
    name: "Shibam (Manhattan of the Desert)",
    country: "Yemen",
    era: "Early Modern Era",
    timeline: "1530s CE",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=75",
    significance: "World's oldest vertical high-rise mudbrick settlement.",
    architecture: "Sun-dried earthen bricks and lime wash gypsum balconies.",
    unesco: true
  },

  // MODERN HERITAGE (1900 CE – Present)
  {
    id: "modern-marina-bay",
    name: "Gardens by the Bay & Supertree Grove",
    country: "Singapore",
    era: "Modern Heritage",
    timeline: "2012 CE",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=75",
    significance: "World-leading vertical sustainable garden with solar Supertrees and cloud mountain.",
    architecture: "Steel structural cores clad in over 160,000 living epiphyte plants.",
    unesco: false
  },
  {
    id: "modern-burj-khalifa",
    name: "Burj Khalifa Needle Spire",
    country: "United Arab Emirates",
    era: "Modern Heritage",
    timeline: "2010 CE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=75",
    significance: "The world's tallest architectural structure (828 meters).",
    architecture: "Y-shaped buttressed core with tiered spiraling setbacks.",
    unesco: false
  },
  {
    id: "modern-sheikh-zayed",
    name: "Sheikh Zayed Grand Mosque Abu Dhabi",
    country: "United Arab Emirates",
    era: "Modern Heritage",
    timeline: "2007 CE",
    image: "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=1200&q=75",
    significance: "Modern Islamic architecture monument uniting global artisans.",
    architecture: "82 white marble domes, 1,096 columns, and mother-of-pearl inlays.",
    unesco: false
  },
  {
    id: "modern-hiroshima",
    name: "Hiroshima Peace Memorial (Genbaku Dome)",
    country: "Japan",
    era: "Modern Heritage",
    timeline: "1945 CE (Memorial 1955)",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=75",
    significance: "The only structure left standing near the atomic bomb hypocenter, symbol of world peace.",
    architecture: "Skeletal steel dome and ruined brickwork preserved exactly as it fell.",
    unesco: true
  },
  {
    id: "modern-louvre-ad",
    name: "Louvre Abu Dhabi Floating Dome",
    country: "United Arab Emirates",
    era: "Modern Heritage",
    timeline: "2017 CE",
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=75",
    significance: "Universal museum sheltered by a geometric dome creating a 'Rain of Light'.",
    architecture: "180-meter dome engineered from 7,850 aluminum stars.",
    unesco: false
  }
];

// Combine heritage sites
const heritageMap = new Map();
existingHeritage.forEach(h => heritageMap.set(h.id, h));
comprehensiveHeritageSites.forEach(h => heritageMap.set(h.id, h));
const finalHeritage = Array.from(heritageMap.values());

console.log("Total heritage sites in final dataset:", finalHeritage.length);

// Extract historicalErasData, monthlyRecommendations, and gamificationBadges from previous commit
const { execSync } = require('child_process');
const prevSeed = execSync('git show HEAD:client/src/data/seedData.js', { maxBuffer: 10 * 1024 * 1024 }).toString();

const extractExport = (source, varName) => {
  const regex = new RegExp(`export const ${varName} = ([\\s\\S]*?);\\n\\n(export const|$)`);
  const match = source.match(regex);
  if (match) return match[1].trim();
  return "[]";
};

const historicalErasStr = extractExport(prevSeed, 'historicalErasData');
const monthlyRecommendationsStr = extractExport(prevSeed, 'monthlyRecommendations');
const gamificationBadgesStr = extractExport(prevSeed, 'gamificationBadges');

// Generate final seed file contents
const outputContent = `// ASIA EXPLORA - Comprehensive Production Tourism Master Dataset
// Full Coverage: 48 Asian Countries, 200+ Destinations, 5 Historical Eras, 360 Virtual Tours

export const countriesData = ${JSON.stringify(updatedCountries, null, 2)};

export const regionsData = ${JSON.stringify(regionsData, null, 2)};

export const destinationsData = ${JSON.stringify(finalDestinations, null, 2)};

export const heritageSitesData = ${JSON.stringify(finalHeritage, null, 2)};

export const virtualToursData = ${JSON.stringify(virtualToursData, null, 2)};

export const historicalErasData = ${historicalErasStr};

export const monthlyRecommendations = ${monthlyRecommendationsStr};

export const gamificationBadges = ${gamificationBadgesStr};
`;

fs.writeFileSync(clientSeedPath, outputContent, 'utf8');
console.log("Successfully wrote client seedData.js!");

// Also write server seed file with module.exports format for Node server
const serverContent = `// ASIA EXPLORA - Server Master Dataset
const countriesData = ${JSON.stringify(updatedCountries, null, 2)};
const regionsData = ${JSON.stringify(regionsData, null, 2)};
const destinationsData = ${JSON.stringify(finalDestinations, null, 2)};
const heritageSitesData = ${JSON.stringify(finalHeritage, null, 2)};
const virtualToursData = ${JSON.stringify(virtualToursData, null, 2)};
const historicalErasData = ${historicalErasStr};
const monthlyRecommendations = ${monthlyRecommendationsStr};
const gamificationBadges = ${gamificationBadgesStr};

module.exports = {
  countriesData,
  regionsData,
  destinationsData,
  heritageSitesData,
  virtualToursData,
  historicalErasData,
  monthlyRecommendations,
  gamificationBadges
};
`;

fs.writeFileSync(serverSeedPath, serverContent, 'utf8');
console.log("Successfully wrote server seedData.js!");
