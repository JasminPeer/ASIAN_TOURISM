// Master Data Enrichment for ASIA EXPLORA
// Generates full 4-5 destinations for all 48 Asian countries + Historical Era Heritage sites

const fs = require('fs');
const path = require('path');

const clientSeedPath = path.join(__dirname, '../client/src/data/seedData.js');
const serverSeedPath = path.join(__dirname, '../server/data/seedData.js');

// Load existing client seed
const { 
  countriesData: rawCountries, 
  regionsData: rawRegions, 
  heritageSitesData: rawHeritage,
  virtualToursData: rawTours 
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
const updatedCountries = rawCountries.map(c => {
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

// Destination blueprint definitions for countries
const destinationBlueprints = {
  // Myanmar
  "myanmar": [
    {
      id: "bagan-plain",
      name: "Bagan Archaeological Zone (Plain of 2,200 Temples)",
      category: "Heritage & Spiritual",
      coordinates: [21.1717, 94.8679],
      tagline: "Over 2,200 terracotta and gold spires rising from the misty dry plains of the Irrawaddy",
      description: "Between the 9th and 13th centuries, the Pagan Kingdom erected more than 10,000 Buddhist temples on the plains of Central Myanmar. Today, over 2,200 monumental brick pagodas and stupas remain standing.",
      photo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Witness sunrise hot air balloons drifting above thousands of golden stupas and explore gilded inner Buddha chambers.",
      bestTime: "November to February",
      budget: "$25 - $75 / day",
      historicalEra: "Classical Era",
      era: "Classical Era (9th – 13th Century CE)",
      unesco: true,
      places: [
        { name: "Ananda Temple (King Kyansittha)", cat: "Ancient Temple", coords: [21.1708, 94.8677], time: "2 hrs", desc: "Mon-style architectural masterpiece housing four 9.5-meter standing Buddhas coated in pure gold leaf." },
        { name: "Dhammayangyi Temple (The Giant Brick Citadel)", cat: "Imperial Monument", coords: [21.1622, 94.8728], time: "1.5 hrs", desc: "The most massive temple in Bagan, built with interlocking mortarless brickwork by King Narathu." },
        { name: "Shwesandaw Pagoda (Sunset Stupa)", cat: "Spiritual Stupa", coords: [21.1642, 94.8654], time: "1 hr", desc: "Five-tiered bell pagoda enshrining sacred hair relics of the Gautama Buddha." }
      ]
    },
    {
      id: "inle-lake",
      name: "Inle Lake Floating Sanctuaries & Stilt Villages",
      category: "Nature & Culture",
      coordinates: [20.5847, 96.9037],
      tagline: "Serene highland lake with leg-rowing fishermen and floating organic tomato gardens",
      description: "Nestled in the Shan Hills at 880 meters elevation, Inle Lake is famous for its unique leg-rowing Intha fishermen, stilt-village monasteries, and hand-woven lotus silk workshops.",
      photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Glide along mirror-still waters past floating hydroponic farms and watch the leg-rowing boatmen navigate wooden skiffs.",
      bestTime: "October to March",
      budget: "$30 - $85 / day",
      historicalEra: "Medieval Era",
      era: "Medieval Era (Shan Kingdoms)",
      unesco: false,
      places: [
        { name: "Phaung Daw Oo Pagoda", cat: "Monastery", coords: [20.5283, 96.9022], time: "1 hr", desc: "Principal shrine housing five sacred Buddha statues encrusted in inches of gold leaf." },
        { name: "Nga Phe Chaung (Jumping Cat Monastery)", cat: "Wooden Temple", coords: [20.5750, 96.9167], time: "1 hr", desc: "Historic teakwood monastery resting on 650 stilts built in the 1850s." },
        { name: "Floating Tomato & Cucumber Gardens", cat: "Agro Wonder", coords: [20.5600, 96.9000], time: "2 hrs", desc: "Man-made islands formed from weed and silt anchored to the lakebed with bamboo poles." }
      ]
    },
    {
      id: "shwedagon-pagoda",
      name: "Shwedagon Pagoda (The Great Dagon Reliquary)",
      category: "Heritage & Spiritual",
      coordinates: [16.7983, 96.1497],
      tagline: "99-meter golden stupa adorned with 5,448 diamonds and 2,317 rubies",
      description: "Dominating the Yangon skyline, Shwedagon Pagoda is the most sacred Buddhist pagoda in Myanmar, believed to contain relics of the four previous Buddhas of the present kalpa.",
      photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Join chanting monks and pilgrims circling the 2,500-year-old golden stupa during candlelit twilight prayers.",
      bestTime: "November to February",
      budget: "$30 - $90 / day",
      historicalEra: "Ancient Era",
      era: "Ancient Era (Mon Civilizations)",
      unesco: false,
      places: [
        { name: "Central Diamond Crown & Hti", cat: "Spiritual Apex", coords: [16.7985, 96.1499], time: "1 hr", desc: "Crowned with a 76-carat diamond and hundreds of golden bells chiming in the breeze." },
        { name: "Planetary Post Shrines", cat: "Astrological Shrines", coords: [16.7981, 96.1495], time: "1.5 hrs", desc: "Eight astrological posts where pilgrims pour water over the Buddha corresponding to their weekday of birth." }
      ]
    },
    {
      id: "mandalay-hill",
      name: "Mandalay Royal Palace & U Bein Teak Bridge",
      category: "Heritage & Imperial",
      coordinates: [21.9750, 96.0833],
      tagline: "The last royal capital of the Burmese monarchy and the world's longest teak bridge",
      description: "Mandalay embodies the pinnacle of Burmese classical court culture, royal stone carving, and woodcraft, culminating in the 1.2-kilometer U Bein Bridge across Taungthaman Lake.",
      photo: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Walk across the ancient teakwood pillars of U Bein Bridge at sunset and see Buddhist novices study at Mahagandhayon Monastery.",
      bestTime: "October to March",
      budget: "$28 - $80 / day",
      historicalEra: "Early Modern Era",
      era: "Early Modern Era (Konbaung Dynasty, 1857 CE)",
      unesco: false,
      places: [
        { name: "U Bein Bridge", cat: "Historical Bridge", coords: [21.8913, 96.0583], time: "2 hrs", desc: "Constructed in 1851 with 1,086 teakwood pillars salvaged from the former palace in Inwa." },
        { name: "Kuthodaw Pagoda (World's Largest Book)", cat: "Stone Monument", coords: [22.0042, 96.1158], time: "1.5 hrs", desc: "729 marble slabs inscribed with the entire Theravada Buddhist canon inside white stupa shrines." }
      ]
    },
    {
      id: "ngapali-beach",
      name: "Ngapali Beach & Bay of Bengal Palm Shore",
      category: "Islands & Beaches",
      coordinates: [18.3750, 94.3333],
      tagline: "Unspoiled 7-kilometer crescent of turquoise ocean and fresh Andaman lobster shacks",
      description: "Myanmar's premier coastal sanctuary features white sandy beaches lined with coconut palms, crystal-clear Bay of Bengal waters, and traditional fishing boats departing at sunset.",
      photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Relax on crowd-free pristine sands, feast on freshly caught grilled barracuda, and cycle through seaside fishing hamlets.",
      bestTime: "October to April",
      budget: "$40 - $140 / day",
      historicalEra: "Modern Heritage",
      era: "Living Coastal Ecosystem",
      unesco: false,
      places: [
        { name: "Pearl Island Coral Reef", cat: "Marine Sanctuary", coords: [18.3600, 94.3200], time: "3 hrs", desc: "Secluded offshore islet offering vibrant snorkeling among soft corals and clownfish." },
        { name: "Jadet Taw Fishermen Village", cat: "Fishing Village", coords: [18.3450, 94.3400], time: "2 hrs", desc: "Traditional fishing settlement where thousands of silver sardines are dried under the coastal sun." }
      ]
    }
  ],

  // South Korea
  "south-korea": [
    {
      id: "seoul-gyeongbokgung",
      name: "Gyeongbokgung Palace & Bukchon Hanok Village",
      category: "Heritage & Modern",
      coordinates: [37.5796, 126.9770],
      tagline: "Joseon Dynasty grand throne hall framed by Mount Bugak and traditional wooden Hanoks",
      description: "Built in 1395 as the principal palace of the Joseon Dynasty, Gyeongbokgung represents classical Korean court architecture, with the iconic Gyeonghoeru Pavilion resting on granite pillars over a lotus pond.",
      photo: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Witness the royal changing of the guard ceremony in vibrant traditional hanbok attire and wander preserved alleys of Bukchon.",
      bestTime: "April to May / September to November",
      budget: "$60 - $180 / day",
      historicalEra: "Early Modern Era",
      era: "Early Modern Era (Joseon Dynasty, 1395 CE)",
      unesco: false,
      places: [
        { name: "Geunjeongjeon (Imperial Throne Hall)", cat: "Royal Palace", coords: [37.5785, 126.9770], time: "1.5 hrs", desc: "Two-tiered wooden hall where Joseon kings held morning courts and foreign embassies." },
        { name: "Gyeonghoeru Royal Banquet Pavilion", cat: "Water Pavilion", coords: [37.5798, 126.9760], time: "1 hr", desc: "Monumental open-sided pavilion surrounded by a tranquil lotus pond." },
        { name: "Bukchon Hanok Alleys", cat: "Traditional Village", coords: [37.5828, 126.9836], time: "2 hrs", desc: "Residential quarter featuring hundreds of historic tile-roofed Joseon homes." }
      ]
    },
    {
      id: "jeju-island",
      name: "Jeju Island (Hallasan Volcanic Crater & Manjanggul)",
      category: "Nature & Islands",
      coordinates: [33.3617, 126.5292],
      tagline: "UNESCO World Natural Heritage volcanic shield with giant lava tubes and female Haenyeo divers",
      description: "Born from ancient basalt eruptions, Jeju Island features South Korea's highest peak (Mount Hallasan), dramatic sunrise tuff cones at Seongsan Ilchulbong, and the legendary Haenyeo free-diving women.",
      photo: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Hike the wooden trail around the crater rim of Hallasan and taste fresh sea urchin harvested by elderly Haenyeo divers.",
      bestTime: "March to June / September to November",
      budget: "$55 - $160 / day",
      historicalEra: "Modern Heritage",
      era: "UNESCO World Natural Heritage (2007)",
      unesco: true,
      places: [
        { name: "Seongsan Ilchulbong (Sunrise Peak)", cat: "Volcanic Cone", coords: [33.4580, 126.9426], time: "2 hrs", desc: "Crown-shaped volcanic tuff cone rising directly from the coastal waves." },
        { name: "Manjanggul Lava Tube Cave", cat: "Geological Wonder", coords: [33.5283, 126.7717], time: "1.5 hrs", desc: "7-kilometer multi-level basalt lava tunnel with the world's tallest stone lava column (7.6m)." }
      ]
    },
    {
      id: "busan-gamcheon",
      name: "Busan Coastal Metropolis & Gamcheon Culture Village",
      category: "City & Coastal",
      coordinates: [35.1796, 129.0756],
      tagline: "Pastel-colored hillside art terraces, Haeundae beach skyline, and Jagalchi seafood market",
      description: "South Korea's maritime capital blends futuristic coastal skyscrapers with the historic Gamcheon Culture Village—steep terraced slopes painted in vibrant pastels dubbed the 'Santorini of Korea.'",
      photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Explore street-art labyrinths in Gamcheon, visit Haedong Yonggungsa temple on the ocean rocks, and eat live octopus at Jagalchi.",
      bestTime: "April to October",
      budget: "$50 - $150 / day",
      historicalEra: "Modern Heritage",
      era: "Modern Maritime Heritage",
      unesco: false,
      places: [
        { name: "Haedong Yonggungsa Ocean Temple", cat: "Cliff Temple", coords: [35.1883, 129.2233], time: "2 hrs", desc: "Rare Korean seaside Buddhist temple built in 1376 on jagged coastal rocks." },
        { name: "Gamcheon Art Alleys", cat: "Cultural Village", coords: [35.0975, 129.0106], time: "2.5 hrs", desc: "Steep terraced alleys adorned with colorful murals, craft cafes, and Little Prince photo statues." }
      ]
    },
    {
      id: "gyeongju-historic",
      name: "Gyeongju Ancient Silla Capital (Museum Without Walls)",
      category: "Heritage & Archaeological",
      coordinates: [35.8562, 129.2247],
      tagline: "Royal grassy tumuli tombs, Bulguksa Temple, and 7th-century Cheomseongdae Observatory",
      description: "For nearly 1,000 years, Gyeongju was the capital of the ancient Silla Kingdom. Grassy royal burial mounds rise throughout the city center alongside Bulguksa Temple and Seokguram Grotto.",
      photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Inspect the stone astronomy tower Cheomseongdae and marvel at Bulguksa's granite terraces and pagodas.",
      bestTime: "April to May (Cherry Blossoms) / October (Golden Foliage)",
      budget: "$45 - $130 / day",
      historicalEra: "Classical Era",
      era: "Classical Era (Silla Kingdom, 57 BCE – 935 CE)",
      unesco: true,
      places: [
        { name: "Bulguksa Temple Complex", cat: "UNESCO Temple", coords: [35.7897, 129.3320], time: "2 hrs", desc: "Masterpiece of Buddhist golden age architecture featuring Dabotap and Seokgatap granite pagodas." },
        { name: "Cheomseongdae Stone Observatory", cat: "Ancient Science", coords: [35.8347, 129.2190], time: "1 hr", desc: "Oldest surviving astronomical observatory in East Asia, built from 362 granite stones." }
      ]
    },
    {
      id: "dmz-korea",
      name: "DMZ (Korean Demilitarized Zone & JSA Panmunjom)",
      category: "Historical & Modern",
      coordinates: [37.9558, 126.6711],
      tagline: "The world's most heavily guarded border and living testament to Cold War history",
      description: "Stretching 250 kilometers across the 38th parallel, the DMZ separates North and South Korea. Visitors can inspect the Third Infiltration Tunnel, Dora Observatory, and Dorasan Peace Train Station.",
      photo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=75",
      whyVisit: "Look across the border into North Korean propaganda villages and walk through the Third Tunnel dug deep into solid bedrock.",
      bestTime: "Year-Round",
      budget: "$50 - $110 / day",
      historicalEra: "Modern Heritage",
      era: "Modern Heritage (Armistice 1953)",
      unesco: false,
      places: [
        { name: "The Third Infiltration Tunnel", cat: "Military Defense", coords: [37.9172, 126.6994], time: "1.5 hrs", desc: "1.6-kilometer tunnel discovered in 1978 capable of moving 30,000 soldiers per hour beneath the border." },
        { name: "Dora Observatory", cat: "Border Viewpoint", coords: [37.9011, 126.7058], time: "1 hr", desc: "High-magnification binoculars looking into North Korea's Kaesong Industrial Complex and Kijong-dong." }
      ]
    }
  ]
};

console.log("Blueprints prepared for major countries.");
