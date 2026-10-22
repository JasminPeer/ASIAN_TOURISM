// Master Script: Populate All 48 Asian Countries with 4-5 Rich Destinations & Heritage Eras
const fs = require('fs');
const path = require('path');

const clientSeedPath = path.join(__dirname, '../client/src/data/seedData.js');
const serverSeedPath = path.join(__dirname, '../server/data/seedData.js');

const { 
  countriesData, 
  regionsData, 
  destinationsData: existingDestinations, 
  heritageSitesData: existingHeritage,
  virtualToursData 
} = require(clientSeedPath);

// Unique country photos map
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

// Update all country objects
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
    if (idx >= 4 && idx <= 8) { // Summer / Monsoon
      temp = isDesert ? baseTemp + 14 : isTropical ? baseTemp + 3 : baseTemp + 8;
      rainProb = isDesert ? 5 : isTropical ? 65 : 45;
    } else { // Winter
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

// Destination catalogs for all countries that currently have 0 or < 4 destinations
const rawDestMap = {
  // PAKISTAN
  "pakistan": [
    {
      id: "badshahi-lahore",
      name: "Badshahi Mosque & Lahore Fort (UNESCO Citadel)",
      category: "Heritage & Imperial",
      coordinates: [31.5882, 74.3095],
      tagline: "One of the grandest red sandstone Mughal imperial mosques on Earth",
      description: "Commissioned by Emperor Aurangzeb in 1671, the Badshahi Mosque features red sandstone carved facades, white marble onion domes, and an immense courtyard holding 100,000 worshippers opposite the Sheesh Mahal of Lahore Fort.",
      photo: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Walk across the vast Mughal courtyard at sunset and explore the mirror palace of Sheesh Mahal.",
      bestTime: "October to March",
      budget: "$20 - $65 / day",
      historicalEra: "Early Modern Era",
      era: "Early Modern Era (Mughal Empire, 1671 CE)",
      places: [
        { name: "Sheesh Mahal (Palace of Mirrors)", cat: "Imperial Palace", coords: [31.5895, 74.3140], time: "1.5 hrs", desc: "Pavilion inlaid with millions of convex glass and mirror tiles creating a starry sky effect." },
        { name: "Huzuri Bagh Marble Pavilion", cat: "Garden Pavilion", coords: [31.5880, 74.3110], time: "1 hr", desc: "White marble baradari built by Maharaja Ranjit Singh in 1818 between the fort and the mosque." }
      ]
    },
    {
      id: "hunza-valley",
      name: "Hunza Valley & Rakaposhi Peak",
      category: "Nature & Mountains",
      coordinates: [36.3167, 74.6500],
      tagline: "Turquoise alpine rivers, terraced apricot orchards, and 7,788m snowbound spires",
      description: "Framed by Rakaposhi, Ultar Sar, and Ladyfinger Peak, Hunza Valley along the Karakoram Highway is renowned for longevity, ancient Baltit and Altit stone forts, and Attabad Lake.",
      photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Boat on the vibrant turquoise waters of Attabad Lake and watch the golden sunrise over Rakaposhi.",
      bestTime: "May to October",
      budget: "$25 - $75 / day",
      historicalEra: "Medieval Era",
      era: "Medieval Era (Mir of Hunza Dynasties)",
      places: [
        { name: "Baltit Fort (700-Year Citadel)", cat: "Ancient Fortress", coords: [36.3258, 74.6708], time: "2 hrs", desc: "Tibetan-influenced stone and timber citadel overlooking the valley terraces." },
        { name: "Attabad Turquoise Lake", cat: "Alpine Lake", coords: [36.3389, 74.8694], time: "2 hrs", desc: "Vibrant emerald-blue lake formed in 2010 surrounded by sheer granite precipices." }
      ]
    },
    {
      id: "mohenjo-daro",
      name: "Mohenjo-daro (Mound of the Dead)",
      category: "Archaeological & Ancient",
      coordinates: [27.3292, 68.1389],
      tagline: "One of the world's earliest major urban centers from 2500 BCE",
      description: "Mohenjo-daro was the preeminent metropolis of the Indus Valley Civilization, featuring grid urban planning, covered terracotta sewage systems, and the Great Bath.",
      photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Step into 4,500-year-old brick avenues, see the Great Bath, and marvel at the world's first planned sanitation.",
      bestTime: "November to February",
      budget: "$25 - $70 / day",
      historicalEra: "Ancient Era",
      era: "Ancient Era (Bronze Age Indus Civilization, 2500 BCE)",
      places: [
        { name: "The Great Bath", cat: "Ancient Pool", coords: [27.3295, 68.1385], time: "1.5 hrs", desc: "Watertight bitumen-lined brick public bath used for religious purification rites." },
        { name: "The Buddhist Stupa Mound", cat: "Kushan Monument", coords: [27.3300, 68.1390], time: "1 hr", desc: "Kushan-era stupa built atop the ancient Bronze Age citadel ruins in the 2nd century CE." }
      ]
    },
    {
      id: "taxila-gandhara",
      name: "Taxila Ancient Buddhist University & Dharmarajika",
      category: "Heritage & Spiritual",
      coordinates: [33.7461, 72.8258],
      tagline: "Cradle of Greco-Buddhist art and premier intellectual hub of the ancient world",
      description: "Located at the crossroads of the Silk Road, Taxila was an ancient centre of Vedic and Buddhist learning visited by Alexander the Great, featuring Greek-influenced stone stupas and monasteries.",
      photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Discover Greek and Persian hybrid Buddhist statues and walk through the stone ruins of Jaulian monastery.",
      bestTime: "October to April",
      budget: "$22 - $60 / day",
      historicalEra: "Ancient Era",
      era: "Ancient Era (Gandhara Civilization, 6th Century BCE)",
      places: [
        { name: "Dharmarajika Stupa", cat: "Ancient Stupa", coords: [33.7500, 72.8333], time: "2 hrs", desc: "Great circular stupa established by Emperor Ashoka to enshrine bone relics of the Buddha." },
        { name: "Jaulian Monastery & Stucco Reliefs", cat: "Monastery", coords: [33.7667, 72.8667], time: "1.5 hrs", desc: "Hilltop monastery with intact stone stupas depicting seated Buddhas with Greek drapery." }
      ]
    }
  ],

  // BANGLADESH
  "bangladesh": [
    {
      id: "sundarbans-bengal",
      name: "Sundarbans National Mangrove Tiger Sanctuary",
      category: "Nature & Wildlife",
      coordinates: [21.9497, 89.1833],
      tagline: "World's largest contiguous tidal mangrove forest and refuge of the Royal Bengal Tiger",
      description: "Spanning the Ganges-Brahmaputra delta into the Bay of Bengal, the Sundarbans supports 400 Royal Bengal tigers, saltwater crocodiles, spotted deer, and endangered Irrawaddy river dolphins.",
      photo: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Cruise silently through tidal mangrove channels on wooden houseboats and spot swimming tigers.",
      bestTime: "November to February",
      budget: "$35 - $95 / day",
      historicalEra: "Modern Heritage",
      era: "UNESCO Natural Biosphere (1997)",
      places: [
        { name: "Kotka Wildlife Sanctuary & Beach", cat: "Forest Trail", coords: [21.8500, 89.7833], time: "3 hrs", desc: "Watchtower vantage overlooking grazing spotted deer herds and muddy tiger tracks." },
        { name: "Hiron Point Watchtower", cat: "Lookout Tower", coords: [21.7833, 89.4667], time: "2 hrs", desc: "Riverside boardwalk offering glimpses of monitor lizards and rare kingfishers." }
      ]
    },
    {
      id: "ahsan-manzil-dhaka",
      name: "Ahsan Manzil (Pink Palace) & Old Dhaka",
      category: "Heritage & Colonial",
      coordinates: [23.7086, 90.4060],
      tagline: "Opulent Indo-Saracenic riverfront palace of the Nawabs of Dhaka along the Buriganga",
      description: "Completed in 1872 on the banks of the Buriganga River, Ahsan Manzil features an immense octagonal dome, grand triple-arched porticos, and lavish ballrooms representing Nawab aristocracy.",
      photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Explore the pink palace galleries and take a traditional wooden rowing sampan across the bustling Buriganga.",
      bestTime: "November to March",
      budget: "$20 - $60 / day",
      historicalEra: "Early Modern Era",
      era: "Early Modern Era (Nawab Period, 1872 CE)",
      places: [
        { name: "Lalbagh Fort (Fort Aurangabad)", cat: "Mughal Fort", coords: [23.7188, 90.3881], time: "2 hrs", desc: "Uncompleted 17th-century Mughal fort complex with the tomb of Pari Bibi." },
        { name: "Tara Masjid (Star Mosque)", cat: "Historic Mosque", coords: [23.7156, 90.4022], time: "1 hr", desc: "19th-century mosque decorated with chinitikri mosaic china tiles depicting blue stars." }
      ]
    },
    {
      id: "srimangal-tea",
      name: "Srimangal (Tea Capital of Bangladesh & Lawachara)",
      category: "Nature & Highlands",
      coordinates: [24.3065, 91.7296],
      tagline: "Rolling emerald tea garden hills, Seven-Layer Tea, and endangered Hoolock Gibbon rainforest",
      description: "Surrounded by over 40 sprawling tea estates, Srimangal is the tea capital of Bangladesh, featuring Lawachara National Park where wild gibbons swing across dense semi-evergreen canopies.",
      photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Sip legendary 7-layer tea at Nilkantha Tea Cabin and trek through the lush rainforest to spot rare primates.",
      bestTime: "October to March",
      budget: "$22 - $65 / day",
      historicalEra: "Modern Heritage",
      era: "Living Tea Agro-Ecosystem",
      places: [
        { name: "Lawachara National Park Gibbon Trail", cat: "Rainforest", coords: [24.3283, 91.7850], time: "3 hrs", desc: "Protected rainforest sheltering Western Hoolock Gibbons, barking deer, and pythons." },
        { name: "Madhabpur Lake Lotus Sanctuary", cat: "Hill Lake", coords: [24.2333, 91.8167], time: "2 hrs", desc: "Lake framed by tea hill slopes covered in thousands of blooming blue water lilies." }
      ]
    },
    {
      id: "sixty-dome-mosque",
      name: "Sixty Dome Mosque (Shait Gumbad Bagerhat)",
      category: "Heritage & Medieval",
      coordinates: [22.6744, 89.7417],
      tagline: "UNESCO medieval brick mosque with 77 domes and 60 stone columns from 1459 CE",
      description: "Founded by Turkish general Khan Jahan Ali in the 15th century, this Tughlaq-influenced brick mosque features 81 total domes, thick tapered fortress walls, and terracotta embellishments.",
      photo: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Step into the cool shadow of 60 slender granite columns and examine terracotta floral rosettes.",
      bestTime: "October to March",
      budget: "$20 - $55 / day",
      historicalEra: "Medieval Era",
      era: "Medieval Era (Bengal Sultanate, 1459 CE)",
      places: [
        { name: "Khan Jahan Ali Dargah & Crocodile Pond", cat: "Mausoleum", coords: [22.6583, 89.7833], time: "1.5 hrs", desc: "Shrine of the warrior-saint featuring a sacred tank home to ancient marsh crocodiles." }
      ]
    }
  ],

  // AFGHANISTAN
  "afghanistan": [
    {
      id: "band-e-amir",
      name: "Band-e Amir Turquoise National Lakes",
      category: "Nature & Geological",
      coordinates: [34.8389, 67.2222],
      tagline: "Six intense cobalt-blue travertine lakes trapped between 3,000m Hindu Kush canyons",
      description: "Afghanistan's first national park features six deep turquoise lakes created by natural travertine dams deposited by calcium-rich mineral springs high in the Hindu Kush mountains.",
      photo: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Marvel at the unreal contrast between sheer pink limestone desert cliffs and glowing neon-blue waters.",
      bestTime: "June to September",
      budget: "$30 - $80 / day",
      historicalEra: "Modern Heritage",
      era: "First National Park of Afghanistan (2009)",
      places: [
        { name: "Band-e Panir & Travertine Dam Wall", cat: "Natural Dam", coords: [34.8400, 67.2200], time: "2 hrs", desc: "Natural white travertine calcium wall over which waterfalls cascade between lake basins." }
      ]
    },
    {
      id: "mazar-blue-mosque",
      name: "Blue Mosque of Mazar-i-Sharif (Rawze-e-Sharif)",
      category: "Heritage & Spiritual",
      coordinates: [36.7089, 67.1108],
      tagline: "Stunning turquoise and cobalt mosaic shrine with thousands of white peace pigeons",
      description: "Adorned with intricate glazed Persian ceramic tiles, the Blue Mosque is believed by many Afghans to be the burial place of Ali ibn Abi Talib, drawing thousands of pilgrims for Nowruz.",
      photo: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Walk the tiled courtyards among pure white doves said to turn white upon entering the sacred perimeter.",
      bestTime: "March to May / September to November",
      budget: "$25 - $70 / day",
      historicalEra: "Medieval Era",
      era: "Medieval Era (Timurid Renovation, 1481 CE)",
      places: [
        { name: "Central Timurid Glazed Sanctuary", cat: "Shrine", coords: [36.7090, 67.1110], time: "2 hrs", desc: "Majestic dome clad in turquoise arabesque ceramic tiles renewed every century." }
      ]
    },
    {
      id: "herat-citadel",
      name: "Herat Citadel (Qala Ikhtyaruddin)",
      category: "Heritage & Ancient",
      coordinates: [34.3467, 62.1903],
      tagline: "Massive mudbrick fortress founded by Alexander the Great in 330 BCE",
      description: "Resting on an elevated mound overlooking Herat, the citadel was established by Alexander the Great and rebuilt by the Kartid and Timurid dynasties with 18 circular defensive towers.",
      photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Explore the ramparts with panoramic views over Herat's minarets and visit the National Museum of Herat inside.",
      bestTime: "April to May / October to November",
      budget: "$25 - $65 / day",
      historicalEra: "Ancient Era",
      era: "Ancient Era (Hellenistic Foundation, 330 BCE)",
      places: [
        { name: "Upper Citadel & Timurid Tile Tower", cat: "Defensive Tower", coords: [34.3470, 62.1900], time: "1.5 hrs", desc: "Defensive tower retaining 15th-century Persian blue calligraphy and floral tilework." }
      ]
    },
    {
      id: "minaret-of-jam",
      name: "Minaret of Jam (UNESCO Mountain Monument)",
      category: "Heritage & Medieval",
      coordinates: [34.5142, 64.5161],
      tagline: "65-meter 12th-century fired-brick minaret rising from a remote mountain canyon",
      description: "Surrounded by 2,400m mountains along the Hari River, the Minaret of Jam was built in the 1190s by the Ghurid Empire, featuring kufic brick calligraphy and turquoise glazed tile inlays.",
      photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "A breathtaking encounter with a hidden architectural jewel preserved in an untouched canyon.",
      bestTime: "June to September",
      budget: "$35 - $90 / day",
      historicalEra: "Medieval Era",
      era: "Medieval Era (Ghurid Dynasty, 1194 CE)",
      places: [
        { name: "Hari River Confluence Trail", cat: "River Gorge", coords: [34.5140, 64.5160], time: "2 hrs", desc: "Narrow gorge where the Jam and Hari rivers meet beneath the towering minaret." }
      ]
    }
  ],

  // UNITED ARAB EMIRATES
  "uae": [
    {
      id: "burj-khalifa-dubai",
      name: "Burj Khalifa & Downtown Dubai Marina",
      category: "Modern & Luxury",
      coordinates: [25.1972, 55.2744],
      tagline: "The world's tallest tower (828m) and futuristic dancing fountain lake",
      description: "Soaring 828 meters over the Arabian Gulf desert, Burj Khalifa is a triumph of modern engineering. The complex includes Dubai Mall, Dubai Opera, and the choreographed Dubai Fountain.",
      photo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Stand at the Level 148 Sky Lounge for views extending across the Arabian Gulf to Iran.",
      bestTime: "November to March",
      budget: "$90 - $350 / day",
      historicalEra: "Modern Heritage",
      era: "Modern Architectural Marvel (2010)",
      places: [
        { name: "At The Top Sky Observation Deck", cat: "Skyline View", coords: [25.1972, 55.2744], time: "2 hrs", desc: "Observation lounge perched at 555 meters with interactive high-speed digital elevators." },
        { name: "The Dubai Fountain Boardwalk", cat: "Water Choreography", coords: [25.1965, 55.2780], time: "1 hr", desc: "Choreographed water jets shooting 150 meters into the air illuminated by 6,600 lights." }
      ]
    },
    {
      id: "sheikh-zayed-mosque",
      name: "Sheikh Zayed Grand Mosque Abu Dhabi",
      category: "Heritage & Spiritual",
      coordinates: [24.4128, 54.4750],
      tagline: "82 Macedonian white marble domes, 1,096 columns, and the world's largest hand-knotted carpet",
      description: "One of the world's largest and most magnificent mosques, featuring immaculate white marble courts inlaid with floral mother-of-pearl, 24-carat gold chandeliers, and reflective pools.",
      photo: "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Walk barefoot on the world's largest Iranian wool carpet and photograph the sunset reflection in the pools.",
      bestTime: "November to March",
      budget: "$80 - $280 / day",
      historicalEra: "Modern Heritage",
      era: "Modern Islamic Landmark (2007)",
      places: [
        { name: "Central Marble Sahan Courtyard", cat: "Marble Court", coords: [24.4130, 54.4755], time: "1 hr", desc: "17,000 square meter courtyard inlaid with semi-precious lapis, amethyst, and jasper flora." },
        { name: "Main Prayer Hall & Faustig Chandeliers", cat: "Prayer Hall", coords: [24.4125, 54.4748], time: "1.5 hrs", desc: "Houses 12-tonne Swarovski crystal chandeliers and hand-knotted 5,627 sq meter carpet." }
      ]
    },
    {
      id: "louvre-abu-dhabi",
      name: "Louvre Abu Dhabi & Saadiyat Cultural District",
      category: "Art & Architecture",
      coordinates: [24.5336, 54.3983],
      tagline: "Jean Nouvel's floating dome creating an enchanting 'Rain of Light' over the ocean",
      description: "Designed by Pritzker Prize winner Jean Nouvel, Louvre Abu Dhabi features a 180-meter geometric dome composed of 7,850 aluminum stars creating dappled sunlight patterns over sea-level galleries.",
      photo: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Kayak beneath the floating geometric dome and admire cross-civilizational masterpieces.",
      bestTime: "November to April",
      budget: "$70 - $220 / day",
      historicalEra: "Modern Heritage",
      era: "Universal Museum (2017)",
      places: [
        { name: "Rain of Light Ocean Plaza", cat: "Modern Architecture", coords: [24.5338, 54.3985], time: "1.5 hrs", desc: "Sunlit open-air plaza where seawater gently washes against white gallery pavilions." }
      ]
    },
    {
      id: "al-ain-oasis",
      name: "Al Ain Oasis & Jebel Hafeet (UNESCO)",
      category: "Nature & Heritage",
      coordinates: [24.2167, 55.7667],
      tagline: "147,000 date palms fed by 3,000-year-old Falaj irrigation systems",
      description: "A UNESCO World Heritage cultural site, Al Ain Oasis has provided desert sustenance for millennia through ancient gravity-fed subterranean aqueducts, framed by the 1,249m limestone ridge of Jebel Hafeet.",
      photo: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Cycle along tranquil shaded canals under 147,000 date palms and drive the hairpin turns of Jebel Hafeet.",
      bestTime: "November to March",
      budget: "$50 - $160 / day",
      historicalEra: "Ancient Era",
      era: "Ancient Era (3000 BCE Falaj Aqueducts)",
      places: [
        { name: "Al Ain National Oasis Pathways", cat: "Oasis Canal", coords: [24.2180, 55.7680], time: "2 hrs", desc: "Shaded stone footpaths running alongside active communal water division channels." },
        { name: "Jebel Hafeet Summit Peak", cat: "Desert Ridge", coords: [24.0567, 55.7783], time: "1.5 hrs", desc: "Overlook vantage across the empty quarter sands containing 5,000-year-old beehive tombs." }
      ]
    }
  ],

  // SAUDI ARABIA
  "saudi-arabia": [
    {
      id: "alula-hegra",
      name: "AlUla Hegra (Mada'in Salih UNESCO Tombs)",
      category: "Heritage & Ancient",
      coordinates: [26.8000, 37.9500],
      tagline: "Over 110 monumental Nabataean rock-cut tombs sculpted into golden desert monoliths",
      description: "The southern capital of the Nabataean Kingdom, Hegra features more than 110 monumental tombs carved directly into sandstone massifs dating back to the 1st century BCE, including the iconic Qasr al-Farid.",
      photo: "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Stand before the 4-story monolithic facade of Qasr al-Farid and explore the incense route desert canyon of AlUla.",
      bestTime: "October to April",
      budget: "$85 - $280 / day",
      historicalEra: "Ancient Era",
      era: "Ancient Era (Nabataean Kingdom, 1st Century BCE)",
      places: [
        { name: "Qasr al-Farid (The Lonely Castle)", cat: "Rock Tomb", coords: [26.7900, 37.9530], time: "1.5 hrs", desc: "Monolithic sandstone tomb carved from top to bottom standing solitary in golden sand dunes." },
        { name: "Jabal Ithlib Sacred Diwan", cat: "Assembly Hall", coords: [26.8120, 37.9600], time: "1 hr", desc: "Natural canyon corridor leading to a rock-carved royal banquet chamber for religious feasts." }
      ]
    },
    {
      id: "al-balad-jeddah",
      name: "Historic Al-Balad (Old Jeddah UNESCO District)",
      category: "Heritage & Maritime",
      coordinates: [21.4858, 39.1867],
      tagline: "7th-century Red Sea port with coral stone towers and intricately carved wooden Rawasheen",
      description: "The gateway for millions of pilgrims traveling to Mecca for centuries, Al-Balad features 500-year-old coral-limestone tower houses fitted with ornate teakwood lattice balconies called Rawasheen.",
      photo: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Wander atmospheric lamp-lit alleys scented with oud and cardamom and visit the historic Naseef House.",
      bestTime: "November to March",
      budget: "$55 - $190 / day",
      historicalEra: "Early Modern Era",
      era: "Early Modern Era (Red Sea Coastal Heritage)",
      places: [
        { name: "Naseef House (Beit Naseef)", cat: "Coral Mansion", coords: [21.4870, 39.1875], time: "1.5 hrs", desc: "106-room mansion where King Abdulaziz stayed in 1925, featuring wide stairs for pack camels." }
      ]
    },
    {
      id: "edge-of-the-world-riyadh",
      name: "Edge of the World (Jebel Fihrayn)",
      category: "Nature & Geological",
      coordinates: [24.9472, 45.9897],
      tagline: "Dramatic 300-meter sheer cliff drops overlooking ancient dried seabed horizons",
      description: "Part of the 1,000-kilometer Tuwaiq Escarpment near Riyadh, the Edge of the World provides breathtaking unobstructed vistas over ancient seabed plains where fossils and marine corals are embedded in the rock.",
      photo: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Peer over the dizzying vertical abyss at sunset and trek along ancient camel caravan tracks.",
      bestTime: "November to March",
      budget: "$40 - $140 / day",
      historicalEra: "Modern Heritage",
      era: "Jurassic Geological Wonder",
      places: [
        { name: "Tuwaiq Escarpment Rim Trail", cat: "Cliff Path", coords: [24.9480, 45.9900], time: "2.5 hrs", desc: "High-ridge walking trail with views spanning 30 kilometers into the empty desert floor." }
      ]
    },
    {
      id: "diriyah-at-turaif",
      name: "At-Turaif District in Diriyah (Birthplace of the Kingdom)",
      category: "Heritage & Imperial",
      coordinates: [24.7333, 46.5750],
      tagline: "UNESCO mudbrick citadel and the first capital of the Saudi Dynasty in Wadi Hanifa",
      description: "Founded in the 15th century, At-Turaif is a prime example of Najdi mudbrick architecture, featuring Salwa Palace, courtyards, and bathhouses fortified along the fertile palm grove of Wadi Hanifa.",
      photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Explore illuminated mudbrick palace ruins, dine in Bujairi Terrace, and learn the history of early Arabia.",
      bestTime: "October to April",
      budget: "$60 - $210 / day",
      historicalEra: "Early Modern Era",
      era: "Early Modern Era (First Saudi State, 1744 CE)",
      places: [
        { name: "Salwa Palace (Palace of Solace)", cat: "Royal Mudbrick Palace", coords: [24.7340, 46.5755], time: "2 hrs", desc: "Largest multi-story structure in Diriyah from where early imams ruled Central Arabia." }
      ]
    }
  ],

  // UZBEKISTAN
  "uzbekistan": [
    {
      id: "registan-samarkand",
      name: "Registan Square & Shah-i-Zinda (Samarkand)",
      category: "Heritage & Silk Road",
      coordinates: [39.6547, 66.9758],
      tagline: "The crown jewel of the Silk Road: three monumental majolica madrasahs from the Timurid Empire",
      description: "Registan was the public square of ancient Samarkand, framed by three colossal Islamic schools (Ulugh Beg, Sher-Dor, and Tilya-Kori) covered in azure, turquoise, and gold leaf ceramic tilework.",
      photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Stand at center stage of the illuminated Registan at night and walk through the glowing turquoise tombs of Shah-i-Zinda.",
      bestTime: "April to June / September to November",
      budget: "$30 - $95 / day",
      historicalEra: "Medieval Era",
      era: "Medieval Era (Timurid Renaissance, 1420 CE)",
      places: [
        { name: "Tilya-Kori Madrasah (Gilded Mosque)", cat: "Golden Mosque", coords: [39.6552, 66.9760], time: "1.5 hrs", desc: "Famed for its optical illusion ceiling covered in kilos of beaten gold leaf arabesques." },
        { name: "Shah-i-Zinda Necropolis", cat: "Avenue of Mausoleums", coords: [39.6644, 66.9878], time: "2 hrs", desc: "Stunning avenue of 14th-century turquoise ceramic tombs honoring cousins of the Prophet." }
      ]
    },
    {
      id: "bukhara-old-city",
      name: "Historic Centre of Bukhara (Po-i-Kalyan & The Ark)",
      category: "Heritage & Ancient",
      coordinates: [39.7747, 64.4172],
      tagline: "A living museum with 140 architectural monuments and the 48m Kalyan Minaret spared by Genghis Khan",
      description: "For centuries, Bukhara was a premier commercial and spiritual hub on the Silk Road with over 350 mosques. The 48-meter Kalyan Minaret was so impressive that Genghis Khan ordered it spared from destruction in 1220.",
      photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Sip spiced green tea beside the Lyabi-Hauz pool, shop under domed trading bazaars, and explore the Ark Citadel.",
      bestTime: "April to May / September to November",
      budget: "$28 - $85 / day",
      historicalEra: "Classical Era",
      era: "Classical & Medieval Era (Karakhanid & Samanid, 1127 CE)",
      places: [
        { name: "Kalyan Minaret & Mosque", cat: "Minaret", coords: [39.7758, 64.4150], time: "1.5 hrs", desc: "45-meter baked brick tower decorated with 14 concentric bands of geometric motifs." },
        { name: "The Ark of Bukhara", cat: "Royal Citadel", coords: [39.7775, 64.4108], time: "2 hrs", desc: "5th-century fortress city within a city that housed the Emirs of Bukhara." }
      ]
    },
    {
      id: "khiva-itchan-kala",
      name: "Khiva Itchan Kala (Walled Silk Road Oasis)",
      category: "Heritage & Medieval",
      coordinates: [41.3783, 60.3600],
      tagline: "Completely intact mudbrick medieval desert city enclosed by 10-meter crenellated ramparts",
      description: "Itchan Kala is the preserved inner fortress of Khiva, containing over 50 historic monuments and 250 old houses within intact 10-meter clay brick walls, crowned by the fat turquoise minaret of Kalta Minor.",
      photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Climb the Islam Khodja Minaret for 360° views across clay rooftops into the Karakum Desert sands.",
      bestTime: "April to May / September to October",
      budget: "$25 - $75 / day",
      historicalEra: "Medieval Era",
      era: "Medieval Era (Khorezm Oasis)",
      places: [
        { name: "Kalta Minor (The Short Minaret)", cat: "Glazed Tower", coords: [41.3775, 60.3589], time: "1 hr", desc: "Iconic 29-meter turquoise-glazed minaret originally intended to reach 70 meters high." },
        { name: "Juma Mosque (218 Carved Pillars)", cat: "Wooden Mosque", coords: [41.3780, 60.3610], time: "1 hr", desc: "10th-century hypostyle prayer hall supported by 218 intricately hand-carved elmwood pillars." }
      ]
    },
    {
      id: "chorsu-tashkent",
      name: "Tashkent Chorsu Bazaar & Metro Palaces",
      category: "City & Culture",
      coordinates: [41.3275, 69.2401],
      tagline: "Vibrant turquoise dome spice market and Soviet-era chandelier underground subway halls",
      description: "Uzbekistan's cosmopolitan capital marries ancient Silk Road trade beneath the blue dome of Chorsu Bazaar with the world's most opulent underground subway stations decorated in marble, granite, and stained glass.",
      photo: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Taste freshly baked hot non bread directly from tandoor ovens and ride the Alisher Navoi subway line.",
      bestTime: "March to June / September to November",
      budget: "$30 - $90 / day",
      historicalEra: "Modern Heritage",
      era: "Modern Heritage (20th Century Silk Road Capital)",
      places: [
        { name: "Chorsu Blue Dome Market", cat: "Traditional Bazaar", coords: [41.3270, 69.2360], time: "2 hrs", desc: "Immense open-air and domed bazaar overflowing with dried fruits, horsemeat sausage, and spices." },
        { name: "Alisher Navoi Metro Station", cat: "Underground Palace", coords: [41.3140, 69.2550], time: "1 hr", desc: "Subway station styled as a turquoise domed Timurid palace with ceramic bas-reliefs." }
      ]
    }
  ]
};

console.log("Ready to generate destinations for all countries.");
