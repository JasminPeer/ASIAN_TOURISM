// Full Enrichment Script for ASIA EXPLORA
// Ensures all 48 Asian countries have >= 4-5 destinations and all 5 Eras have rich monuments

const fs = require('fs');
const path = require('path');

const clientSeedPath = path.join(__dirname, '../client/src/data/seedData.js');
const serverSeedPath = path.join(__dirname, '../server/data/seedData.js');

const { 
  countriesData, 
  regionsData, 
  destinationsData: existingDestinations, 
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

// Update countriesData with unique heroMedia
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

// Helper to generate 12-month weather
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

// Curated destinations for nations requiring them
const curatedAdditions = [
  // MYANMAR (5)
  {
    id: "bagan-plain", countryId: "myanmar", name: "Bagan Plain of 2,200 Ancient Temples", category: "Heritage & Spiritual", coordinates: [21.1717, 94.8679],
    tagline: "Over 2,200 terracotta and gold spires rising from misty dry plains", photo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75",
    era: "Classical Era (9th – 13th Century CE)", historicalEra: "Classical Era", unesco: true, virtualTourId: "tour-bagan",
    places: [{ name: "Ananda Phaya Temple", cat: "Ancient Temple", coords: [21.1708, 94.8677], time: "2 hrs", desc: "Four 9.5-meter gilded Buddhas." }, { name: "Dhammayangyi Brick Citadel", cat: "Monument", coords: [21.1622, 94.8728], time: "1.5 hrs", desc: "Largest brick temple in Bagan." }]
  },
  {
    id: "inle-lake", countryId: "myanmar", name: "Inle Lake Floating Sanctuaries & Stilt Villages", category: "Nature & Culture", coordinates: [20.5847, 96.9037],
    tagline: "Serene highland lake with leg-rowing fishermen and floating organic tomato gardens", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Medieval Era (Shan Kingdoms)", historicalEra: "Medieval Era", unesco: false,
    places: [{ name: "Phaung Daw Oo Pagoda", cat: "Monastery", coords: [20.5283, 96.9022], time: "1 hr", desc: "Sacred shrine housing gold-covered Buddhas." }]
  },
  {
    id: "shwedagon-pagoda", countryId: "myanmar", name: "Shwedagon Pagoda (The Great Dagon Reliquary)", category: "Heritage & Spiritual", coordinates: [16.7983, 96.1497],
    tagline: "99-meter golden stupa adorned with 5,448 diamonds and 2,317 rubies", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    era: "Ancient Era (Mon Dynasties)", historicalEra: "Ancient Era", unesco: false,
    places: [{ name: "Diamond Orb Apex", cat: "Sacred Crown", coords: [16.7985, 96.1499], time: "1.5 hrs", desc: "76-carat diamond atop golden spire." }]
  },
  {
    id: "mandalay-palace", countryId: "myanmar", name: "Mandalay Royal Palace & U Bein Bridge", category: "Heritage & Imperial", coordinates: [21.9750, 96.0833],
    tagline: "Last royal capital of the Burmese monarchy and the world's longest teak bridge", photo: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
    era: "Early Modern Era (Konbaung Dynasty, 1857 CE)", historicalEra: "Early Modern Era", unesco: false,
    places: [{ name: "U Bein Bridge", cat: "Historic Bridge", coords: [21.8913, 96.0583], time: "2 hrs", desc: "1,086 teakwood pillars over lake." }]
  },
  {
    id: "ngapali-beach", countryId: "myanmar", name: "Ngapali Beach & Bay of Bengal Palm Coast", category: "Islands & Beaches", coordinates: [18.3750, 94.3333],
    tagline: "Unspoiled 7-kilometer crescent of turquoise ocean and fresh Andaman lobster shacks", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Pearl Island Coral Reef", cat: "Marine Sanctuary", coords: [18.3600, 94.3200], time: "3 hrs", desc: "Clownfish and coral diving." }]
  },

  // SOUTH KOREA (5)
  {
    id: "seoul-gyeongbokgung", countryId: "south-korea", name: "Gyeongbokgung Palace & Bukchon Hanok Village", category: "Heritage & Modern", coordinates: [37.5796, 126.9770],
    tagline: "Joseon Dynasty grand throne hall framed by Mount Bugak and traditional wooden Hanoks", photo: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=75",
    era: "Early Modern Era (Joseon Dynasty, 1395 CE)", historicalEra: "Early Modern Era", unesco: false,
    places: [{ name: "Geunjeongjeon Throne Hall", cat: "Palace", coords: [37.5785, 126.9770], time: "1.5 hrs", desc: "Joseon kings' morning court." }, { name: "Bukchon Hanok Alleys", cat: "Traditional Alleys", coords: [37.5828, 126.9836], time: "2 hrs", desc: "Hundreds of wooden hanok homes." }]
  },
  {
    id: "jeju-island", countryId: "south-korea", name: "Jeju Island (Hallasan Volcanic Crater & Manjanggul)", category: "Nature & Islands", coordinates: [33.3617, 126.5292],
    tagline: "UNESCO World Natural Heritage volcanic shield with giant lava tubes and female Haenyeo divers", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: true,
    places: [{ name: "Seongsan Sunrise Peak", cat: "Volcanic Cone", coords: [33.4580, 126.9426], time: "2 hrs", desc: "Crown-shaped volcanic tuff cone." }]
  },
  {
    id: "busan-gamcheon", countryId: "south-korea", name: "Busan Coastal Metropolis & Gamcheon Culture Village", category: "City & Coastal", coordinates: [35.1796, 129.0756],
    tagline: "Pastel-colored hillside art terraces, Haeundae beach skyline, and Jagalchi seafood market", photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Haedong Yonggungsa Ocean Temple", cat: "Cliff Temple", coords: [35.1883, 129.2233], time: "2 hrs", desc: "Rare seaside Buddhist temple." }]
  },
  {
    id: "gyeongju-silla", countryId: "south-korea", name: "Gyeongju Ancient Silla Capital (Museum Without Walls)", category: "Heritage & Archaeological", coordinates: [35.8562, 129.2247],
    tagline: "Royal grassy tumuli tombs, Bulguksa Temple, and 7th-century Cheomseongdae Observatory", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    era: "Classical Era (Silla Kingdom, 57 BCE – 935 CE)", historicalEra: "Classical Era", unesco: true,
    places: [{ name: "Bulguksa Temple", cat: "UNESCO Temple", coords: [35.7897, 129.3320], time: "2 hrs", desc: "Granite terraces and pagodas." }]
  },
  {
    id: "dmz-panmunjom", countryId: "south-korea", name: "DMZ (Demilitarized Zone & Imjingak Peace Park)", category: "Historical & Modern", coordinates: [37.9558, 126.6711],
    tagline: "The world's most heavily guarded border and living testament to Cold War history", photo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Third Infiltration Tunnel", cat: "Underground Tunnel", coords: [37.9172, 126.6994], time: "1.5 hrs", desc: "1.6km military tunnel." }]
  },

  // NORTH KOREA (4)
  {
    id: "pyongyang-monuments", countryId: "north-korea", name: "Pyongyang Grand Monuments & Juche Tower", category: "Heritage & Modern", coordinates: [39.0392, 125.7625],
    tagline: "Grand socialist monumental architecture along the Taedong River", photo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Tower of the Juche Idea", cat: "Monument", coords: [39.0181, 125.7633], time: "1.5 hrs", desc: "170m granite tower overlooking Pyongyang." }]
  },
  {
    id: "mount-paektu", countryId: "north-korea", name: "Mount Paektu Sacred Volcanic Crater (Heaven Lake)", category: "Nature & Mountains", coordinates: [41.9931, 128.0772],
    tagline: "Mythical volcanic caldera lake at 2,744m on the Sino-Korean border", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Heaven Lake (Lake Chon)", cat: "Crater Lake", coords: [41.9940, 128.0800], time: "2 hrs", desc: "Deepest alpine caldera in East Asia." }]
  },
  {
    id: "kaesong-koryo", countryId: "north-korea", name: "Historic Monuments in Kaesong (UNESCO Koryo Dynasty)", category: "Heritage & Imperial", coordinates: [37.9697, 126.5544],
    tagline: "Ancient capital of the Koryo Dynasty with intact Confucian Academy and royal tombs", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    era: "Medieval Era (Koryo Dynasty, 918 – 1392 CE)", historicalEra: "Medieval Era", unesco: true,
    places: [{ name: "Songgyungwan Academy", cat: "Confucian School", coords: [37.9710, 126.5550], time: "1.5 hrs", desc: "Oldest existing educational institution in Korea." }]
  },
  {
    id: "mount-kumgang", countryId: "north-korea", name: "Mount Kumgang (Diamond Mountains Granite Peaks)", category: "Nature & Mountains", coordinates: [38.6500, 128.1000],
    tagline: "Famous scenic mountain of 12,000 jagged granite peaks and crystal waterfalls", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Classical Era", historicalEra: "Classical Era", unesco: false,
    places: [{ name: "Kuryong Waterfall", cat: "Waterfall", coords: [38.6520, 128.1020], time: "2 hrs", desc: "74-meter cascade into nine jade dragon pools." }]
  },

  // MONGOLIA (4)
  {
    id: "gobi-khongor", countryId: "mongolia", name: "Gobi Desert Khongor Sand Dunes (Singing Dunes)", category: "Nature & Desert", coordinates: [43.7167, 102.2500],
    tagline: "300-meter golden sand dunes that rumble with the desert winds", photo: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Khongoryn Els Singing Ridge", cat: "Dune Crest", coords: [43.7200, 102.2600], time: "2.5 hrs", desc: "Crest rumbles musically when sands shift." }]
  },
  {
    id: "lake-khovsgol", countryId: "mongolia", name: "Lake Khovsgol (The Blue Pearl of Mongolia)", category: "Nature & Lakes", coordinates: [51.1000, 100.5000],
    tagline: "Pristine alpine freshwater lake containing 70% of Mongolia's fresh water", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Taiga Tsaatan Reindeer Camp", cat: "Nomadic Camp", coords: [51.1200, 100.4800], time: "3 hrs", desc: "Encounters with Dukha reindeer herders." }]
  },
  {
    id: "karakorum-erdene-zuu", countryId: "mongolia", name: "Karakorum & Erdene Zuu Monastery (UNESCO Orkhon)", category: "Heritage & Ancient", coordinates: [47.1983, 102.8425],
    tagline: "Capital of the Mongol Empire founded by Genghis Khan in 1220 CE", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Medieval Era (Mongol Empire, 1220 CE)", historicalEra: "Medieval Era", unesco: true,
    places: [{ name: "Erdene Zuu 108 Stupa Wall", cat: "Monastery", coords: [47.2010, 102.8440], time: "2 hrs", desc: "First Buddhist monastery in Mongolia." }]
  },
  {
    id: "terelj-national-park", countryId: "mongolia", name: "Gorkhi-Terelj National Park & Turtle Rock", category: "Nature & Nomads", coordinates: [47.8833, 107.5833],
    tagline: "Granite rock sculptures, larch forests, and Genghis Khan Giant Equestrian Statue", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Genghis Khan Statue Complex (Tsonjin Boldog)", cat: "Statue", coords: [47.8079, 107.5303], time: "1.5 hrs", desc: "40-meter stainless steel equestrian statue." }]
  },

  // SINGAPORE (5)
  {
    id: "gardens-by-the-bay", countryId: "singapore", name: "Gardens by the Bay & Supertree Grove", category: "Modern & Eco", coordinates: [1.2816, 103.8636],
    tagline: "50-meter solar Supertrees, Cloud Forest misty mountain, and Flower Dome", photo: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false, virtualTourId: "tour-marina-bay",
    places: [{ name: "Cloud Forest 35m Indoor Waterfall", cat: "Biodome", coords: [1.2840, 103.8655], time: "2 hrs", desc: "Misty greenhouse reproducing tropical highlands." }]
  },
  {
    id: "chinatown-singapore", countryId: "singapore", name: "Chinatown & Buddha Tooth Relic Temple", category: "Heritage & Spiritual", coordinates: [1.2813, 103.8442],
    tagline: "Tang Dynasty style Buddhist temple housing sacred tooth relic and hawker streets", photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=75",
    era: "Early Modern Era", historicalEra: "Early Modern Era", unesco: false,
    places: [{ name: "Buddha Tooth Sacred Relic Chamber", cat: "Temple", coords: [1.2815, 103.8440], time: "1.5 hrs", desc: "Gold stupa weighing 3.5 tonnes." }]
  },
  {
    id: "sentosa-palawan", countryId: "singapore", name: "Sentosa Island & Southernmost Point of Continental Asia", category: "Islands & Beaches", coordinates: [1.2494, 103.8303],
    tagline: "Tropical island haven with Palawan suspension bridge and Universal Studios", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Palawan Beach Suspension Bridge", cat: "Beach Lookout", coords: [1.2480, 103.8290], time: "1 hr", desc: "Leads to Southernmost Point viewing towers." }]
  },
  {
    id: "singapore-botanic-gardens", countryId: "singapore", name: "Singapore Botanic Gardens (UNESCO Heritage)", category: "Nature & Flora", coordinates: [1.3138, 103.8159],
    tagline: "165-year-old tropical botanical garden housing the National Orchid Garden", photo: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
    era: "Early Modern Era (Colonial Botanical, 1859 CE)", historicalEra: "Early Modern Era", unesco: true,
    places: [{ name: "National Orchid Garden", cat: "Orchid Collection", coords: [1.3150, 103.8165], time: "2 hrs", desc: "Over 1,000 species and 2,000 hybrid orchids." }]
  },
  {
    id: "jewel-changi", countryId: "singapore", name: "Jewel Changi (HSBC Rain Vortex)", category: "Modern & Architecture", coordinates: [1.3602, 103.9898],
    tagline: "World's tallest indoor waterfall cascading 40 meters through a multi-story forest dome", photo: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "HSBC Rain Vortex & Shiseido Forest Valley", cat: "Water Feature", coords: [1.3605, 103.9900], time: "1.5 hrs", desc: "40m waterfall with light and sound shows." }]
  },

  // MALAYSIA (5)
  {
    id: "petronas-towers-kl", countryId: "malaysia", name: "Petronas Twin Towers & Skybridge", category: "Modern & Skyline", coordinates: [3.1578, 101.7123],
    tagline: "452-meter twin skyscrapers inspired by Islamic geometric motifs", photo: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Double-Decker Skybridge (Level 41 & 42)", cat: "Skybridge", coords: [3.1580, 101.7120], time: "1.5 hrs", desc: "Connecting walkway at 170 meters elevation." }]
  },
  {
    id: "batu-caves", countryId: "malaysia", name: "Batu Caves & Murugan Golden Colossus", category: "Spiritual & Nature", coordinates: [3.2379, 101.6840],
    tagline: "42.7m golden statue of Lord Murugan and 272 vibrant rainbow limestone cave steps", photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=75",
    era: "Early Modern Era", historicalEra: "Early Modern Era", unesco: false,
    places: [{ name: "Cathedral Cave (Temple Cave)", cat: "Limestone Cavern", coords: [3.2385, 101.6845], time: "2 hrs", desc: "100-meter-high ceiling cavern with Hindu shrines." }]
  },
  {
    id: "george-town-penang", countryId: "malaysia", name: "George Town Penang (UNESCO Heritage & Street Food)", category: "Heritage & Culinary", coordinates: [5.4164, 100.3327],
    tagline: "Colonial shophouses, clan jetties, and world-famous street food hawker culture", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Early Modern Era (Straits Settlements)", historicalEra: "Early Modern Era", unesco: true,
    places: [{ name: "Khoo Kongsi Clan House", cat: "Clan Temple", coords: [5.4150, 100.3370], time: "1.5 hrs", desc: "Elaborately carved Chinese clan palace." }]
  },
  {
    id: "langkawi-geopark", countryId: "malaysia", name: "Langkawi UNESCO Global Geopark & SkyBridge", category: "Nature & Islands", coordinates: [6.3500, 99.8000],
    tagline: "Curved 125m pedestrian cable-stayed bridge suspended 660m above Machinchang rainforest", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: true,
    places: [{ name: "Langkawi SkyBridge", cat: "Cable Bridge", coords: [6.3860, 99.6620], time: "2 hrs", desc: "Sweeping views of Andaman Sea to Thailand." }]
  },
  {
    id: "mount-kinabalu", countryId: "malaysia", name: "Mount Kinabalu (Borneo UNESCO World Heritage)", category: "Nature & Mountains", coordinates: [6.0750, 116.5583],
    tagline: "4,095-meter granite peak crowned with pitcher plants and cloud forests", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: true,
    places: [{ name: "Low's Peak Summit Trail", cat: "Mountain Peak", coords: [6.0755, 116.5590], time: "4 hrs", desc: "Sunrise across granite plateau above the clouds." }]
  },

  // PHILIPPINES (5)
  {
    id: "el-nido-palawan", countryId: "philippines", name: "El Nido & Bacuit Archipelago (Palawan)", category: "Islands & Beaches", coordinates: [11.1949, 119.4075],
    tagline: "Towering black limestone karst cliffs framing hidden turquoise lagoons", photo: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Big Lagoon Kayak Sanctuary", cat: "Marine Lagoon", coords: [11.1550, 119.3170], time: "2.5 hrs", desc: "Glide through narrow limestone sea corridors." }]
  },
  {
    id: "banaue-rice-terraces", countryId: "philippines", name: "Banaue Rice Terraces (Eighth Wonder of the World)", category: "Heritage & Nature", coordinates: [16.9167, 121.0500],
    tagline: "2,000-year-old stone and mud terraces carved by the indigenous Ifugao people", photo: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=75",
    era: "Ancient Era (Ifugao Civilization, 100 BCE)", historicalEra: "Ancient Era", unesco: true,
    places: [{ name: "Batad Amphitheater Terraces", cat: "Terraces", coords: [16.9333, 121.1333], time: "3 hrs", desc: "Steep colosseum-like emerald staircases." }]
  },
  {
    id: "boracay-white-beach", countryId: "philippines", name: "Boracay White Beach & Willy's Rock", category: "Islands & Beaches", coordinates: [11.9674, 121.9248],
    tagline: "Powdery white silica sand and vibrant Paraw sunset sailing", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Willy's Rock Grotto", cat: "Volcanic Formation", coords: [11.9690, 121.9190], time: "1 hr", desc: "Volcanic rock outcropping with Mother Mary shrine." }]
  },
  {
    id: "chocolate-hills-bohol", countryId: "philippines", name: "Chocolate Hills & Tarsier Sanctuary (Bohol)", category: "Nature & Wildlife", coordinates: [9.8333, 124.1667],
    tagline: "Over 1,260 symmetrical conical grass mounds that turn cocoa brown in the dry season", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Bohol Tarsier Conservation Area", cat: "Wildlife Haven", coords: [9.7333, 124.0333], time: "1.5 hrs", desc: "Encounters with tiny wide-eyed Philippine tarsiers." }]
  },
  {
    id: "intramuros-manila", countryId: "philippines", name: "Intramuros (The Walled City of Manila)", category: "Heritage & Colonial", coordinates: [14.5895, 120.9747],
    tagline: "16th-century Spanish colonial fortified citadel and San Agustin Church", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    era: "Early Modern Era (Spanish Era, 1571 CE)", historicalEra: "Early Modern Era", unesco: true,
    places: [{ name: "San Agustin Church & Museum", cat: "UNESCO Baroque Church", coords: [14.5886, 120.9750], time: "2 hrs", desc: "Oldest stone church in the Philippines." }]
  },

  // LAOS (5)
  {
    id: "luang-prabang-unesco", countryId: "laos", name: "Luang Prabang UNESCO Ancient Royal Capital", category: "Heritage & Spiritual", coordinates: [19.8893, 102.1333],
    tagline: "Morning saffron-robed alms giving, golden Wat Xieng Thong, and night markets", photo: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=1200&q=75",
    era: "Medieval Era (Lan Xang Kingdom, 1353 CE)", historicalEra: "Medieval Era", unesco: true,
    places: [{ name: "Wat Xieng Thong (Temple of the Golden City)", cat: "Royal Temple", coords: [19.8978, 102.1431], time: "2 hrs", desc: "Sweeping multi-tiered roofs and Tree of Life glass mosaic." }]
  },
  {
    id: "kuang-si-falls", countryId: "laos", name: "Kuang Si Turquoise Multi-Tier Falls", category: "Nature & Waterfalls", coordinates: [19.7492, 101.9922],
    tagline: "Spectacular three-tiered cascade spilling into natural turquoise limestone pools", photo: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Tat Kuang Si Rescue Bear Sanctuary", cat: "Animal Sanctuary", coords: [19.7480, 101.9910], time: "1 hr", desc: "Refuge for rescued Asiatic black bears (moon bears)." }]
  },
  {
    id: "plain-of-jars", countryId: "laos", name: "Plain of Jars (Xieng Khouang Megaliths)", category: "Archaeological & Ancient", coordinates: [19.4300, 103.1500],
    tagline: "Thousands of mysterious prehistoric stone jars scattered across the highlands", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Ancient Era (Iron Age Megalithic, 500 BCE)", historicalEra: "Ancient Era", unesco: true,
    places: [{ name: "Site 1 (Thong Hai Hin)", cat: "Megalithic Field", coords: [19.4310, 103.1520], time: "2 hrs", desc: "Over 334 colossal carved stone jars." }]
  },
  {
    id: "vang-vieng-karsts", countryId: "laos", name: "Vang Vieng (Nam Song River & Blue Lagoons)", category: "Nature & Adventure", coordinates: [18.9228, 102.4475],
    tagline: "Majestic limestone karst pinnacles, cave tubing, and hot air ballooning", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Tham Chang Cave Viewpoint", cat: "Cavern", coords: [18.9180, 102.4420], time: "1.5 hrs", desc: "Illuminated stalactites with valley vista." }]
  },
  {
    id: "wat-phou-champasak", countryId: "laos", name: "Wat Phou Khmer Temple Complex (Champasak)", category: "Heritage & Ancient", coordinates: [14.8483, 105.8178],
    tagline: "Pre-Angkorian Khmer sanctuary complex dating back to the 5th century at Mount Phu Kao", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    era: "Ancient Era (Early Khmer Chenla, 5th Century CE)", historicalEra: "Ancient Era", unesco: true,
    places: [{ name: "Upper Sanctuary & Sacred Spring", cat: "Rock Sanctuary", coords: [14.8500, 105.8150], time: "2 hrs", desc: "Sanctuary fed by natural spring water." }]
  },

  // BRUNEI (4)
  {
    id: "sultan-omar-mosque", countryId: "brunei", name: "Sultan Omar Ali Saifuddien Mosque", category: "Heritage & Spiritual", coordinates: [4.8897, 114.9392],
    tagline: "Golden-domed Islamic sanctuary surrounded by an artificial lagoon and 16th-century stone barge", photo: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Ceremonial Stone Barge (Mahligai)", cat: "Water Monument", coords: [4.8890, 114.9395], time: "1 hr", desc: "Replica of Sultan Bolkiah's 16th-century royal barge." }]
  },
  {
    id: "kampong-ayer", countryId: "brunei", name: "Kampong Ayer (Venice of the East)", category: "Heritage & Culture", coordinates: [4.8833, 114.9450],
    tagline: "Historic water settlement of 30,000 people living in wooden houses on stilts over the Brunei River", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Medieval Era (Bruneian Empire)", historicalEra: "Medieval Era", unesco: false,
    places: [{ name: "Kampong Ayer Cultural & Tourism Gallery", cat: "Visitor Gallery", coords: [4.8840, 114.9460], time: "1.5 hrs", desc: "Exhibits on 1,000 years of water village life." }]
  },
  {
    id: "ulu-temburong", countryId: "brunei", name: "Ulu Temburong National Park (The Green Jewel)", category: "Nature & Rainforest", coordinates: [4.4500, 115.2000],
    tagline: "Untouched pristine Bornean rainforest with a 60-meter metal canopy walkway", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Canopy Walkway Towers", cat: "Canopy Walk", coords: [4.4520, 115.2020], time: "2 hrs", desc: "Aluminium towers rising 60m into the treetop canopy." }]
  },
  {
    id: "jame-asr-mosque", countryId: "brunei", name: "Jame' Asr Hassanil Bolkiah Mosque", category: "Modern & Spiritual", coordinates: [4.9011, 114.9228],
    tagline: "Brunei's largest mosque crowned with 29 golden domes commemorating the 29th Sultan", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Grand Prayer Hall & Fountains", cat: "Prayer Hall", coords: [4.9015, 114.9230], time: "1.5 hrs", desc: "Italian marble columns and stained glass." }]
  },

  // TIMOR-LESTE (4)
  {
    id: "atauro-island", countryId: "timor-leste", name: "Atauro Island (Most Biodiverse Waters on Earth)", category: "Islands & Marine", coordinates: [-8.2433, 125.6017],
    tagline: "Recorded highest average reef fish diversity in the world by Conservation International", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Beloi Barrier Reef", cat: "Coral Wall", coords: [-8.2200, 125.6100], time: "3 hrs", desc: "Drop-off coral wall teeming with reef sharks." }]
  },
  {
    id: "cristo-rei-dili", countryId: "timor-leste", name: "Cristo Rei of Dili & Cape Fatucama", category: "Heritage & Coastal", coordinates: [-8.5208, 125.6083],
    tagline: "27-meter bronze statue of Christ atop a peninsula overlooking the turquoise Ombai Strait", photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Cape Fatucama Staircase (595 Steps)", cat: "Scenic Stairway", coords: [-8.5210, 125.6080], time: "1.5 hrs", desc: "Stations of the cross coastal trail." }]
  },
  {
    id: "mount-ramelau", countryId: "timor-leste", name: "Mount Ramelau (Tatamailau Sunrise Summit)", category: "Nature & Mountains", coordinates: [-8.9056, 125.4939],
    tagline: "Highest peak in Timor-Leste (2,986m) crowned with a white statue of the Virgin Mary", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Virgin Mary Summit Altar", cat: "Summit Altar", coords: [-8.9060, 125.4940], time: "3 hrs", desc: "Panoramic sunrise ocean views across both coasts." }]
  },
  {
    id: "jaco-island", countryId: "timor-leste", name: "Jaco Island (Sacred Coral Atoll)", category: "Islands & Beaches", coordinates: [-8.4236, 127.3250],
    tagline: "Uninhabited sacred island with powdery white sands and crystal coral shallows", photo: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=75",
    era: "Modern Heritage", historicalEra: "Modern Heritage", unesco: false,
    places: [{ name: "Nino Konis Santana Marine Reserve", cat: "Marine Sanctuary", coords: [-8.4200, 127.3200], time: "2 hrs", desc: "Untouched coral reefs and sea turtle nests." }]
  }
];

console.log("Loaded core additions:", curatedAdditions.length);

module.exports = { curatedAdditions };
