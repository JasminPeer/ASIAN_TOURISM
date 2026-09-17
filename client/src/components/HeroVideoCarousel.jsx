import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Shield, Mountain, Landmark, Trees, Footprints, Building2 } from 'lucide-react';

const carouselCategories = [
  {
    id: "nature",
    name: "Nature",
    tagline: "Volcanic calderas, emerald karsts & rainforests",
    location: "Ha Long Bay & Mount Fuji",
    icon: Trees,
    color: "from-emerald-500 to-teal-700",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-limestone-mountains-in-a-lake-42888-large.mp4",
    poster: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    filterParam: "Nature"
  },
  {
    id: "heritage",
    name: "Heritage",
    tagline: "Sacred Dravidian gopurams & Khmer stone wonders",
    location: "Madurai Meenakshi & Angkor Wat",
    icon: Landmark,
    color: "from-amber-500 to-orange-700",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-ancient-stone-temple-ruins-surrounded-by-trees-42931-large.mp4",
    poster: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    filterParam: "Heritage"
  },
  {
    id: "adventure",
    name: "Adventure",
    tagline: "High Himalayan passes, scuba atolls & dunes",
    location: "Nepal Everest & Maldives Reefs",
    icon: Mountain,
    color: "from-sky-500 to-blue-700",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-himalayan-mountains-under-a-clear-blue-sky-42921-large.mp4",
    poster: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    filterParam: "Adventure"
  },
  {
    id: "culture",
    name: "Culture",
    tagline: "Living traditions, tea ceremonies & sacred ghats",
    location: "Kyoto & Varanasi Ganges",
    icon: Footprints,
    color: "from-rose-500 to-purple-700",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-traditional-japanese-gate-in-a-forest-42878-large.mp4",
    poster: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    filterParam: "Culture"
  },
  {
    id: "cities",
    name: "Cities",
    tagline: "Hyper-futuristic skylines & lantern night markets",
    location: "Tokyo, Singapore & Dubai",
    icon: Building2,
    color: "from-cyan-500 to-indigo-700",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-gardens-by-the-bay-in-singapore-42940-large.mp4",
    poster: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    filterParam: "City"
  }
];

export const HeroVideoCarousel = () => {
  const [activeCategory, setActiveCategory] = useState(carouselCategories[0]);

  return (
    <section className="relative py-16 bg-[#030c1b] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-ocean-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Cinematic Categories</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
              Explore Asia By Experience
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-400 max-w-md">
            Hover over each category to preview living travel atmospheres captured across Asia.
          </p>
        </div>

        {/* 5-Category Cinematic Video Carousel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {carouselCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat)}
                className="group relative h-96 sm:h-[420px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-500 shadow-glass"
                whileHover={{ y: -6 }}
              >
                {/* Background Video with Auto-play on hover / continuous */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={cat.poster}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.9]"
                >
                  <source src={cat.videoUrl} type="video/mp4" />
                </video>

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030c1b] via-[#030c1b]/30 to-transparent group-hover:from-[#030c1b]/95 transition-all duration-500" />

                {/* Category Indicator Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="w-10 h-10 rounded-2xl glass-panel flex items-center justify-center text-white border border-white/15 group-hover:border-white/40 shadow-sm transition-colors">
                    <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Card Content & Reveal on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                  <span className="text-[11px] font-bold text-ocean-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>{cat.location}</span>
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white mb-2 group-hover:text-ocean-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    {cat.tagline}
                  </p>

                  {/* Explore CTA Button */}
                  <Link
                    to={`/explore/${cat.id}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold transition-all duration-300 group-hover:shadow-glow-blue"
                  >
                    <span>Explore {cat.name}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
